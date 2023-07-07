import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { validar, handleChange } from "../../lib/FormUtils";
import validator from "../../lib/ValidatorClientes";
import FormClientes from "../../components/clientes/Form";

const Alteracao = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const id = useParams().id;
  if (!id) {
    navigate("/listagem");
  }

  function carregarDados() {
    axios
      .get(`https://cascudo.onrender.com/api/v1/clientes/${id}`)
      .then((resp) => {
        if (resp.status === 200) {
          setInputs(resp.data);
        } else if (resp.status === 404) {
          navigate("/clientes");
        } else {
          console.log(resp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    carregarDados();
  }, [id]);

  function validarLocal(callbackAction) {
    validar(callbackAction, inputs, setErrors, validator);
  }

  function handleChangeLocal(e) {
    handleChange(e, setInputs, inputs);
  }

  function handleSubmit(e) {
    e.preventDefault();
    validarLocal(() => {
      axios
        .put(`https://cascudo.onrender.com/api/v1/clientes/${id}`, inputs)
        .then((resp) => {
          if (resp.status === 200) {
            alert("Cliente alterado com sucesso!");
            navigate("/clientes");
          }
        });
    });
  }

  useEffect(() => {
    validarLocal();
  }, [inputs]);

  return (
    <>
      <h1>Alteração de Cliente</h1>
      <hr />
      <FormClientes
        handleSubmit={handleSubmit}
        handleChange={handleChangeLocal}
        inputs={inputs}
        errors={errors}
      />
    </>
  );
};

export default Alteracao;

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { validar, handleChange } from "../../lib/FormUtils";
import validator from "../../lib/ValidatorMarcas";
import FormMarcas from "../../components/marcas/Form";

const Alteracao = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();

  const id = useParams().id;
  if (!id) {
    navigate("/listagem");
  }

  const carregarFornecedores = () => {
    axios.get("https://localhost:3005/api/v1/fornecedores").then((resp) => {
      setFornecedores(resp.data);
    });
  };

  function carregarDados() {
    axios
      .get(`https://localhost:3005/api/v1/marcas/${id}`)
      .then((resp) => {
        if (resp.status === 200) {
          setInputs(resp.data);
        } else if (resp.status === 404) {
          navigate("/marcas");
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
        .put(`https://cascudo.onrender.com/api/v1/marcas/${id}`, inputs)
        .then((resp) => {
          if (resp.status === 200) {
            alert("Marca alterado com sucesso!");
            navigate("/marcas");
          }
        });
    });
  }

  useEffect(() => {
    carregarFornecedores();
  }, []);

  useEffect(() => {
    validarLocal();
  }, [inputs]);

  return (
    <>
      <h1>Alteração de Marca</h1>
      <hr />
      <FormMarcas
        handleSubmit={handleSubmit}
        handleChange={handleChangeLocal}
        inputs={inputs}
        errors={errors}
        fornecedores={fornecedores}
      />
    </>
  );
};

export default Alteracao;

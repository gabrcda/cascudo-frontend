import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { validar, handleChange } from "../../lib/FormUtils";
import validator from "../../lib/ValidatorCervejas";
import FormCerveja from "../../components/cervejas/Form";

const Alteracao = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [marcas, setMarcas] = useState([]);
  const navigate = useNavigate();

  const id = useParams().id;
  if (!id) {
    navigate("/listagem");
  }

  const carregarMarcas = () => {
    axios.get("https://cascudo.onrender.com/api/v1/marcas").then((resp) => {
      setMarcas(resp.data);
    });
  };

  function carregarDados() {
    axios
      .get(`https://cascudo.onrender.com/api/v1/cervejas/${id}`)
      .then((resp) => {
        if (resp.status === 200) {
          setInputs(resp.data);
        } else if (resp.status === 404) {
          navigate("/cervejas");
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
        .put(`https://cascudo.onrender.com/api/v1/cervejas/${id}`, inputs)
        .then((resp) => {
          if (resp.status === 200) {
            alert("Cerveja alterado com sucesso!");
            navigate("/cervejas");
          }
        });
    });
  }

  useEffect(() => {
    carregarMarcas();
  }, []);

  useEffect(() => {
    validarLocal();
  }, [inputs]);

  return (
    <>
      <h1>Alteração de Cerveja</h1>
      <hr />
      <FormCerveja
        handleSubmit={handleSubmit}
        handleChange={handleChangeLocal}
        inputs={inputs}
        errors={errors}
        marcas={marcas}
      />
    </>
  );
};

export default Alteracao;

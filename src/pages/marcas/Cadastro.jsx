import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from '../../lib/ValidatorMarcas';
import { handleChange, validar } from "../../lib/FormUtils";
import FormMarcas from "../../components/marcas/Form";

const Cadastro = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();
  

  const carregarFornecedores = () => {
    axios.get("https://cascudo.onrender.com/api/v1/fornecedores").then((resp) => {
      setFornecedores(resp.data);
    });
  };

  function validarLocal(callbackAction) {
    validar(callbackAction, inputs, setErrors, validator);
  }

  function handleChangeLocal(e) {
    handleChange(e, setInputs, inputs);
  }

  function handleLogoChange(e) {
    const file = e.target.files[0];
    setInputs((prevInputs) => ({ ...prevInputs, logo: file }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const logoValue = inputs.logo ? inputs.logo : "null";

    const data = { ...inputs, logo: logoValue };

    validarLocal(() => {
      axios
        .post("https://cascudo.onrender.com/api/v1/marcas", data)
        .then((resp) => {
          if (resp.status === 200) {
            alert("Marca inserida com sucesso!");
            navigate("/marcas");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Ocorreu um erro ao cadastrar a marca.");
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
      <h1>Cadastro de Marcas</h1>
      <hr />
      <FormMarcas
        handleSubmit={handleSubmit}
        handleChange={handleChangeLocal}
        handleFotoChange={handleLogoChange}
        inputs={inputs}
        errors={errors}
        fornecedores={fornecedores}
      />
    </>
  );
};

export default Cadastro;

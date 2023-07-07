import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "../../lib/ValidatorFornecedores";
import { handleChange, validar } from "../../lib/FormUtils";
import FormFornecedores from "../../components/fornecedores/Form";

const Cadastro = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
        .post("https://cascudo.onrender.com/api/v1/fornecedores", data)
        .then((resp) => {
          if (resp.status === 200) {
            alert("Fornecedor inserido com sucesso!");
            navigate("/fornecedor");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Ocorreu um erro ao cadastrar o fornecedor.");
        });
    });
  }

  useEffect(() => {
    validarLocal();
  }, [inputs]);

  return (
    <>
      <h1>Cadastro de Fornecedor</h1>
      <hr />
      <FormFornecedores
        handleSubmit={handleSubmit}
        handleChange={handleChangeLocal}
        handleLogoChange={handleLogoChange}
        inputs={inputs}
        errors={errors}
      />
    </>
  );
};

export default Cadastro;

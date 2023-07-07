import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "../../lib/ValidatorClientes";
import { handleChange, validar } from "../../lib/FormUtils";
import FormClientes from "../../components/clientes/Form";

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

  function handleFotoChange(e) {
    const file = e.target.files[0];
    setInputs((prevInputs) => ({ ...prevInputs, foto: file }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fotoValue = inputs.foto ? inputs.foto : "null";

    const data = { ...inputs, foto: fotoValue };

    validarLocal(() => {
      axios
        .post("https://cascudo.onrender.com/api/v1/clientes", data)
        .then((resp) => {
          if (resp.status === 200) {
            alert("Cliente inserido com sucesso!");
            navigate("/clientes");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Ocorreu um erro ao cadastrar o cliente.");
        });
    });
  }

  useEffect(() => {
    validarLocal();
  }, [inputs]);

  return (
    <>
      <h1>Cadastro de Cliente</h1>
      <hr />
      <FormClientes
        handleSubmit={handleSubmit}
        handleChange={handleChangeLocal}
        handleFotoChange={handleFotoChange}
        inputs={inputs}
        errors={errors}
      />
    </>
  );
};

export default Cadastro;

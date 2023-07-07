import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from '../../lib/ValidatorCervejas';
import { handleChange, validar } from "../../lib/FormUtils";
import FormCervejas from "../../components/cervejas/Form";

const Cadastro = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [marcas, setMarcas] = useState([]);
  const navigate = useNavigate();
  

  const carregarMarcas = () => {
    axios.get("https://cascudo.onrender.com/api/v1/marcas").then((resp) => {
      setMarcas(resp.data);
    });
  };

  function validarLocal(callbackAction) {
    validar(callbackAction, inputs, setErrors, validator);
  }

  function handleChangeLocal(e) {
    handleChange(e, setInputs, inputs);
  }

  function handleImagemChange(e) {
    const file = e.target.files[0];
    setInputs((prevInputs) => ({ ...prevInputs, imagem: file }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const imagemValue = inputs.imagem ? inputs.imagem : "null";

    const data = { ...inputs, imagem: imagemValue };

    validarLocal(() => {
      axios
        .post("https://cascudo.onrender.com/api/v1/cervejas", data)
        .then((resp) => {
          if (resp.status === 200) {
            alert("Cerveja inserida com sucesso!");
            navigate("/cervejas");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Ocorreu um erro ao cadastrar a cerveja.");
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
      <h1>Cadastro de Cerveja</h1>
      <hr />
      <FormCervejas
        handleSubmit={handleSubmit}
        handleChange={handleChangeLocal}
        handleFotoChange={handleImagemChange}
        inputs={inputs}
        errors={errors}
        marcas={marcas}
      />
    </>
  );
};

export default Cadastro;

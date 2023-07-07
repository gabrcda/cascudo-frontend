import React from "react";
import FormButtons from "../FormButtons";
import FormInput from "../FormInput";

const FormClientes = ({ handleSubmit, handleChange, handleFotoChange, errors, inputs }) => {
  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <FormInput
        type="text"
        field="nome"
        label="Nome"
        placeholder="Nome do Cliente"
        error={errors?.nome}
        onChange={handleChange}
        value={inputs?.nome}
      />
      <FormInput
        type="text"
        field="cpf"
        label="CPF"
        placeholder="CPF do Cliente"
        error={errors?.cpf}
        onChange={handleChange}
        value={inputs?.cpf}
      />
      <FormInput
        type="date"
        field="dataNascimento"
        label="Data de Nascimento"
        placeholder="AAAA-MM-DD"
        error={errors?.dataNascimento}
        onChange={handleChange}
        value={inputs?.dataNascimento}
      />
      <FormInput
        type="email"
        field="email"
        label="Email"
        placeholder="Email do Cliente"
        error={errors?.email}
        onChange={handleChange}
        value={inputs?.email}
      />
      <FormInput
        type="number"
        field="qtdCascosDevolvidos"
        label="Quantidade de Cascos Devolvidos"
        placeholder="Quantidade de Cascos Devolvidos"
        error={errors?.qtdCascosDevolvidos}
        onChange={handleChange}
        value={inputs?.qtdCascosDevolvidos}
      />
      <div className="mt-3">
        <label htmlFor="foto" className="form-label">
          Foto
        </label>
        <input type="file" id="foto" name="foto" onChange={handleFotoChange} />
      </div>
      <FormButtons cancelTarget="/clientes" />
    </form>
  );
};

export default FormClientes;

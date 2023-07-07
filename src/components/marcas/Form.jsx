import React from "react";
import FormButtons from "../FormButtons";
import FormInput from "../FormInput";

const FormCervejas = ({ handleSubmit, handleChange, handleLogoChange, errors, inputs, fornecedores }) => {
  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <FormInput
        type="text"
        field="nome"
        label="Nome"
        placeholder="Nome da Marca"
        error={errors?.nome}
        onChange={handleChange}
        value={inputs?.nome}
      />
      
      <FormInput
        type="text"
        field="origem"
        label="Origem"
        placeholder="Origem da Marca"
        error={errors?.origem}
        onChange={handleChange}
        value={inputs?.origem}
      />

      <div className="form-floating mt-3">
        <select
          id="fornecedorId"
          name="fornecedorId"
          className={`form-select ${errors?.fornecedorId ? "is-invalid" : ""}`}
          onChange={handleChange}
          value={inputs?.fornecedorId || ""}
        >
          <option value="">Selecione um Fornecedor</option>
          {fornecedores.map((fornecedor) => (
            <option key={fornecedor.id} value={fornecedor.id}>
              {fornecedor.nome}
            </option>
          ))}
        </select>
        <label htmlFor="fornecedorId">Fornecedor</label>
      </div>
      {errors?.fornecedorId && <div className="invalid-feedback">{errors.fornecedorId}</div>}

      <div className="mt-3">
        <label htmlFor="logo" className="form-label">
          Logo
        </label>
        <input type="file" id="logo" name="logo" onChange={handleLogoChange} />
      </div>
      <FormButtons cancelTarget="/cervejas" />
    </form>
  );
};

export default FormCervejas;

import React from "react";
import FormButtons from "../FormButtons";
import FormInput from "../FormInput";

const Form = ({ handleSubmit, handleChange, handleLogoChange, errors, inputs }) => {
  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <FormInput
        type="text"
        field="nome"
        label="Nome"
        placeholder="Nome do Fornecedor"
        error={errors?.nome}
        onChange={handleChange}
        value={inputs?.nome}
      />
      <FormInput
        type="text"
        field="endereco"
        label="Endereço"
        placeholder="Endereço do Fornecedor"
        error={errors?.endereco}
        onChange={handleChange}
        value={inputs?.endereco}
      />
      <FormInput
        type="text"
        field="horaEntrega"
        label="Hora de Entrega"
        placeholder="HH:MM:SS"
        error={errors?.horaEntrega}
        onChange={handleChange}
        value={inputs?.horaEntrega}
      />
      <div className="form-floating mt-3">
        <select
          className={`form-select ${errors?.diaEntrega ? "is-invalid" : "is-valid"}`}
          id="diaEntrega"
          name="diaEntrega"
          onChange={handleChange}
          value={inputs?.diaEntrega || ""}
        >
          <option value="">Selecione o Dia de Entrega</option>
          <option value="segunda">Segunda-feira</option>
          <option value="terça">Terça-feira</option>
          <option value="quarta">Quarta-feira</option>
          <option value="quinta">Quinta-feira</option>
          <option value="sexta">Sexta-feira</option>
          <option value="sábado">Sábado</option>
          <option value="domingo">Domingo</option>
        </select>
        <label htmlFor="diaEntrega">Dia de Entrega</label>
      </div>
      {errors?.diaEntrega && <p className="m-0 small text-danger">{errors.diaEntrega}</p>}
      <div className="mt-3">
        <label htmlFor="logo" className="form-label">
          Logo
        </label>
        <input type="file" id="logo" name="logo" onChange={handleLogoChange} />
      </div>
      <FormButtons cancelTarget="/fornecedores" />
    </form>
  );
};

export default Form;

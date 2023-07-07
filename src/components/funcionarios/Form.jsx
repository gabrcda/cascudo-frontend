import React from "react";
import FormButtons from "../FormButtons";
import FormInput from "../FormInput";

const FormFuncionarios = ({ handleSubmit, handleChange, handleFotoChange, errors, inputs }) => {
  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <FormInput
        type="text"
        field="nome"
        label="Nome"
        placeholder="Nome do Funcionário"
        error={errors?.nome}
        onChange={handleChange}
        value={inputs?.nome}
      />
      <FormInput
        type="text"
        field="codigo"
        label="Código"
        placeholder="Código do Funcionário"
        error={errors?.codigo}
        onChange={handleChange}
        value={inputs?.codigo}
      />
      <FormInput
        type="date"
        field="dataNascimento"
        label="Data de Nascimento"
        error={errors?.dataNascimento}
        onChange={handleChange}
        value={inputs?.dataNascimento}
      />
      <FormInput
        type="password"
        field="senha"
        label="Senha"
        placeholder="Senha do Funcionário"
        error={errors?.senha}
        onChange={handleChange}
        value={inputs?.senha}
      />

      <div className="form-floating mt-3">
        <select
          className={`form-select ${errors?.gerente ? "is-invalid" : "is-valid"}`}
          id="gerente"
          name="gerente"
          onChange={handleChange}
          value={inputs?.gerente || ""}
        >
          <option value="">É Gerente?</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
        <label htmlFor="gerente">Gerente</label>
      </div>
      {errors?.gerente && <p className="m-0 small text-danger">{errors.gerente}</p>}

      <div className="mt-3">
        <label htmlFor="foto" className="form-label">
          Foto
        </label>
        <input type="file" id="foto" name="foto" onChange={handleFotoChange} />
      </div>
      <FormButtons cancelTarget="/funcionarios" />
    </form>
  );
};

export default FormFuncionarios;

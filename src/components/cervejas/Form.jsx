import React from "react";
import FormButtons from "../FormButtons";
import FormInput from "../FormInput";

const FormCervejas = ({ handleSubmit, handleChange, handleImagemChange, errors, inputs, marcas }) => {
  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <FormInput
        type="text"
        field="nome"
        label="Nome"
        placeholder="Nome da Cerveja"
        error={errors?.nome}
        onChange={handleChange}
        value={inputs?.nome}
      />

      <FormInput
        type="number"
        field="qtdMaxEstoque"
        label="Quantidade Máxima de Estoque"
        placeholder="Quantidade Máxima de Estoque"
        error={errors?.qtdMaxEstoque}
        onChange={handleChange}
        value={inputs?.qtdMaxEstoque}
      />
      <FormInput
        type="number"
        field="qtdVazio"
        label="Quantidade de Vazio"
        placeholder="Quantidade de Vazio"
        error={errors?.qtdVazio}
        onChange={handleChange}
        value={inputs?.qtdVazio}
      />
      <FormInput
        type="number"
        field="qtdCheio"
        label="Quantidade de Cheio"
        placeholder="Quantidade de Cheio"
        error={errors?.qtdCheio}
        onChange={handleChange}
        value={inputs?.qtdCheio}
      />
      <FormInput
        type="number"
        field="qtdAlcool"
        label="Quantidade de Álcool"
        placeholder="Quantidade de Álcool"
        error={errors?.qtdAlcool}
        onChange={handleChange}
        value={inputs?.qtdAlcool}
      />
      <FormInput
        type="number"
        field="precoCerveja"
        label="Preço da Cerveja"
        placeholder="Preço da Cerveja"
        error={errors?.precoCerveja}
        onChange={handleChange}
        value={inputs?.precoCerveja}
      />
      <FormInput
        type="number"
        field="precoCasco"
        label="Preço do Casco"
        placeholder="Preço do Casco"
        error={errors?.precoCasco}
        onChange={handleChange}
        value={inputs?.precoCasco}
      />

      <div className="form-floating mt-3">
        <select
          className={`form-select ${errors?.litragem ? "is-invalid" : "is-valid"}`}
          id="litragem"
          name="litragem"
          onChange={handleChange}
          value={inputs?.litragem || ""}
        >
          <option value="">Selecione A Litragem</option>
          <option value="300">300ml</option>
          <option value="600">600ml</option>
          <option value="1000">1000ml</option>
        </select>
        <label htmlFor="litragem">Litragem</label>
      </div>
      {errors?.litragem && <p className="m-0 small text-danger">{errors.litragem}</p>}

      <div className="form-floating mt-3">
        <select
          id="marcaId"
          name="marcaId"
          className={`form-select ${errors?.marcaId ? "is-invalid" : ""}`}
          onChange={handleChange}
          value={inputs?.marcaId || ""}
        >
          <option value="">Selecione uma Marca</option>
          {marcas.map((marca) => (
            <option key={marca.id} value={marca.id}>
              {marca.nome}
            </option>
          ))}
        </select>
        <label htmlFor="marcaId">Marca</label>
      </div>
      {errors?.marcaId && <div className="invalid-feedback">{errors.marcaId}</div>}

      <div className="mt-3">
        <label htmlFor="image" className="form-label">
          Imagem
        </label>
        <input type="file" id="imagem" name="imagem" onChange={handleImagemChange} />
      </div>
      <FormButtons cancelTarget="/cervejas" />
    </form>
  );
};

export default FormCervejas;

import * as yup from "yup";
import paises from './paises.js';

const validator = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório.").min(1, "O nome deve ter pelo menos 1 caractere.").max(100, "O nome deve ter no máximo 100 caracteres."),
  origem: yup.string().required("A origem é obrigatória.").oneOf(paises, "A origem deve ser um país válido."),
  fornecedorId: yup.number().required("O fornecedor é obrigatório.").integer("O fornecedor deve ser um número inteiro positivo."),
});

export default validator;

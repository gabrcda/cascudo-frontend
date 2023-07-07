import * as yup from "yup";

const validator = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório.").min(2, "Nome deve ter pelo menos 2 caracteres.").max(32, "Nome deve ter no máximo 32 caracteres."),
  cpf: yup.string().required("CPF é obrigatório.").matches(/^\d{11}$/, "CPF deve conter 11 dígitos numéricos."),
  dataNascimento: yup.string().required("Data de Nascimento é obrigatória."),
  email: yup.string().required("Email é obrigatório.").email("Email inválido."),
  qtdCascosDevolvidos: yup.number().required("Quantidade de Cascos Devolvidos é obrigatória.").integer("Quantidade deve ser um número inteiro positivo."),
});

export default validator;

import * as yup from "yup";

const validator = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório.").min(1, "O nome deve ter pelo menos 1 caracter.").max(100, "O nome deve ter no máximo 100 caracteres."),
  codigo: yup.string().required("O código é obrigatório."),
  dataNascimento: yup.date().required("A data de nascimento é obrigatória."),
  senha: yup.string().required("A senha é obrigatória.").min(6, "A senha deve ter pelo menos 6 caracteres.").max(20, "A senha deve ter no máximo 20 caracteres."),
  gerente: yup.string().required("A informação de gerente é obrigatória."),
});

export default validator;

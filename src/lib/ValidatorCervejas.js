import * as yup from "yup";

const validator = yup.object().shape({
  nome: yup
    .string()
    .required("O nome é obrigatório.")
    .trim()
    .min(1, "O nome deve ter pelo menos 1 caractere.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),
  litragem: yup
    .string()
    .required("A litragem é obrigatória.")
    .oneOf(["300", "600", "1000"], "A litragem deve ser 300, 600 ou 1000."),
  qtdMaxEstoque: yup
    .number()
    .required("A quantidade máxima de estoque é obrigatória.")
    .integer("A quantidade máxima de estoque deve ser um número inteiro.")
    .min(0, "A quantidade máxima de estoque deve ser maior ou igual a 0."),
  qtdVazio: yup
    .number()
    .required("A quantidade de vazio é obrigatória.")
    .integer("A quantidade de vazio deve ser um número inteiro.")
    .min(0, "A quantidade de vazio deve ser maior ou igual a 0.")
    .test("qtdMax", "A quantidade de vazio não pode ser maior que a quantidade máxima de estoque", function (value) {
      const qtdMaxEstoque = this.parent.qtdMaxEstoque;
      return value <= qtdMaxEstoque;
    })
    .test("qtdSomaMax", "A quantidade de vazio e cheio não pode ser maior que a quantidade máxima de estoque", function (value) {
      const qtdMaxEstoque = this.parent.qtdMaxEstoque;
      const qtdCheio = this.parent.qtdCheio;
      return value + qtdCheio <= qtdMaxEstoque;
    }),
  qtdCheio: yup
    .number()
    .required("A quantidade de cheio é obrigatória.")
    .integer("A quantidade de cheio deve ser um número inteiro.")
    .min(0, "A quantidade de cheio deve ser maior ou igual a 0.")
    .test("qtdMax", "A quantidade de cheio não pode ser maior que a quantidade máxima de estoque", function (value) {
      const qtdMaxEstoque = this.parent.qtdMaxEstoque;
      return value <= qtdMaxEstoque;
    })
    .test("qtdSomaMax", "A quantidade de vazio e cheio não pode ser maior que a quantidade máxima de estoque", function (value) {
      const qtdMaxEstoque = this.parent.qtdMaxEstoque;
      const qtdVazio = this.parent.qtdVazio;
      return value + qtdVazio <= qtdMaxEstoque;
    }),
  qtdAlcool: yup
    .number()
    .required("A quantidade de álcool é obrigatória.")
    .typeError("A quantidade de álcool deve ser um número decimal.")
    .min(0, "A quantidade de álcool deve ser maior ou igual a 0.")
    .max(100, "A quantidade de álcool deve ser menor ou igual a 100."),
  precoCerveja: yup
    .number()
    .required("O preço da cerveja é obrigatório.")
    .typeError("O preço da cerveja deve ser um número decimal.")
    .min(0, "O preço da cerveja deve ser maior ou igual a 0."),
  precoCasco: yup
    .number()
    .required("O preço do casco é obrigatório.")
    .typeError("O preço do casco deve ser um número decimal.")
    .min(0, "O preço do casco deve ser maior ou igual a 0.")
});

export default validator;

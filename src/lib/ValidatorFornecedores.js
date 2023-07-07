import * as yup from "yup";

const validator = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório.").min(2, "Nome deve ter pelo menos 2 caracteres.").max(32, "Nome deve ter no máximo 32 caracteres."),
  endereco: yup.string().required("Endereço é obrigatório.").min(7, "Endereço deve ter pelo menos 7 caracteres."),
  horaEntrega: yup.string().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM).").required("Hora de Entrega é obrigatória."),
  diaEntrega: yup.string().oneOf(["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"], "Dia de Entrega inválido.").required("Dia de Entrega é obrigatório."),
});

export default validator;

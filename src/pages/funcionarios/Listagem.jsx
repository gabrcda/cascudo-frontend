import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import estilos from "./Listagem.module.css";
import axios from "axios";

const Listagem = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarFuncionarios = () => {
    axios
      .get("https://cascudo.onrender.com/api/v1/funcionarios")
      .then((resp) => {
        const dadosFuncionarios = resp.data.map((funcionario) => ({
          id: funcionario.id,
          nome: funcionario.nome,
          codigo: funcionario.codigo,
          dataNascimento: funcionario.dataNascimento,
          foto: `data:image/png;base64, ${funcionario.foto}`,
        }));
        setFuncionarios(dadosFuncionarios);
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Listagem de Funcionários</h1>
        <Link className="btn btn-primary" to="cadastrar">
          Novo
        </Link>
      </div>
      <hr />
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}
      {!loading && (
        <table className={`table table-striped ${estilos.tabela}`}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Código</th>
              <th>Data de Nascimento</th>
              <th className={estilos.fotoColumn}>Foto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario) => (
              <tr key={funcionario.id}>
                <td>{funcionario.nome}</td>
                <td>{funcionario.codigo}</td>
                <td>{funcionario.dataNascimento}</td>
                <td className={estilos.fotoColumn}>
                  <img
                    src={funcionario.foto}
                    alt={funcionario.nome}
                    className="logo"
                  />
                </td>
                <td>
                  <Link
                    className="btn btn-sm btn-success me-1"
                    to={`/funcionarios/alterar/${funcionario.id}`}
                  >
                    <i className="bi bi-pen" title="Alterar"></i>
                  </Link>
                  <Link
                    className="btn btn-sm btn-danger"
                    to={`/funcionarios/excluir/${funcionario.id}`}
                  >
                    <i className="bi bi-trash" title="Excluir"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Listagem;

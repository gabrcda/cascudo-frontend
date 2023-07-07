import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import estilos from "./Listagem.module.css";
import axios from "axios";

const Listagem = () => {
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarEntradas = () => {
    axios
      .get("https://cascudo.onrender.com/api/v1/entradas")
      .then(async (resp) => {
        const dadosEntradas = await Promise.all(resp.data.map(async (entrada) => {
          const funcionarioResp = await axios.get(`https://cascudo.onrender.com/api/v1/funcionarios/${entrada.funcionarioId}`);
          const funcionario = funcionarioResp.data;
          return {
            id: entrada.id,
            dataHora: entrada.dataHora,
            funcionarioNome: funcionario.nome
          };
        }));
        setEntradas(dadosEntradas);
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarEntradas();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Listagem de Entradas</h1>
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
              <th>ID</th>
              <th>Data e Hora</th>
              <th>Funcionário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {entradas.map((entrada) => (
              <tr key={entrada.id}>
                <td>{entrada.id}</td>
                <td>{entrada.dataHora}</td>
                <td>{entrada.funcionarioNome}</td>
                <td>
                  <Link
                    className="btn btn-sm btn-success me-1"
                    to={`/entradas/alterar/${entrada.id}`}
                  >
                    <i className="bi bi-pen" title="Alterar"></i>
                  </Link>
                  <Link
                    className="btn btn-sm btn-danger"
                    to={`/entradas/excluir/${entrada.id}`}
                  >
                    <i className="bi bi-trash" title="Excluir"></i>
                  </Link>
                  <Link
                    className="btn btn-sm btn-info"
                    to={`/entradas/visualizar/${entrada.id}`}
                  >
                    <i className="bi bi-arrow-up-left-square-fill" title="Visualizar"></i>
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

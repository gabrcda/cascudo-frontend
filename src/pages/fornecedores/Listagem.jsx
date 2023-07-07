import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import estilos from "./Listagem.module.css";
import axios from "axios";

const Listagem = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarFornecedores = () => {
    axios
      .get("https://cascudo.onrender.com/api/v1/fornecedores")
      .then((resp) => {
        const dadosFornecedores = resp.data.map((fornecedor) => ({
          id: fornecedor.id,
          nome: fornecedor.nome,
          endereco: fornecedor.endereco,
          horaEntrega: fornecedor.horaEntrega,
          diaEntrega: fornecedor.diaEntrega,
          logo: `data:image/png;base64, ${fornecedor.logo}`,
        }));
        setFornecedores(dadosFornecedores);
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarFornecedores();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Listagem de Fornecedores</h1>
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
              <th>Endereço</th>
              <th>Hora de Entrega</th>
              <th>Dia de Entrega</th>
              <th className={estilos.logoColumn}>Logo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.id}>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.endereco}</td>
                <td>{fornecedor.horaEntrega}</td>
                <td>{fornecedor.diaEntrega}</td>
                <td className={estilos.logoColumn}>
                  <img
                    src={fornecedor.logo}
                    alt={fornecedor.nome}
                    className="logo"
                  />
                </td>
                <td>
                  <Link
                    className="btn btn-sm btn-success me-1"
                    to={`/fornecedores/alterar/${fornecedor.id}`}
                  >
                    <i className="bi bi-pen" title="Alterar"></i>
                  </Link>
                  <Link
                    className="btn btn-sm btn-danger"
                    to={`/fornecedores/excluir/${fornecedor.id}`}
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

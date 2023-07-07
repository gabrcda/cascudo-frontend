import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import estilos from "./Listagem.module.css";
import axios from "axios";

const Listagem = () => {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarVendas = () => {
    axios.get("https://cascudo.onrender.com/api/v1/vendas").then(async (resp) => {
      const dadosVendas = await Promise.all(
        resp.data.map(async (venda) => {
          const funcionarioResp = await axios.get(
            `https://cascudo.onrender.com/api/v1/funcionarios/${venda.funcionarioId}`
          );
          const clienteResp = await axios.get(
            `https://cascudo.onrender.com/api/v1/clientes/${venda.clienteId}`
          );
          const funcionario = funcionarioResp.data;
          const cliente = clienteResp.data;
          return {
            id: venda.id,
            dataHora: venda.dataHora,
            funcionarioNome: funcionario.nome,
            clienteNome: cliente.nome,
            totalComCasco: venda.totalComCasco,
            totalSemCasco: venda.totalSemCasco,
          };
        })
      );
      setVendas(dadosVendas);
      setLoading(false);
    });
  };

  useEffect(() => {
    carregarVendas();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Listagem de Vendas</h1>
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
              <th>Cliente</th>
              <th>Total com Casco</th>
              <th>Total sem Casco</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id}>
                <td>{venda.id}</td>
                <td>{venda.dataHora}</td>
                <td>{venda.funcionarioNome}</td>
                <td>{venda.clienteNome}</td>
                <td>{venda.totalComCasco}</td>
                <td>{venda.totalSemCasco}</td>
                <td>
                  <Link
                    className="btn btn-sm btn-success me-1"
                    to={`/vendas/alterar/${venda.id}`}
                  >
                    <i className="bi bi-pen" title="Alterar"></i>
                  </Link>
                  <Link
                    className="btn btn-sm btn-danger"
                    to={`/vendas/excluir/${venda.id}`}
                  >
                    <i className="bi bi-trash" title="Excluir"></i>
                  </Link>
                  <Link
                    className="btn btn-sm btn-info"
                    to={`/vendas/visualizar/${venda.id}`}
                  >
                    <i
                      className="bi bi-arrow-up-left-square-fill"
                      title="Visualizar"
                    ></i>
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

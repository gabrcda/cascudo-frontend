import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import estilos from "./Listagem.module.css";
import axios from "axios";

const Listagem = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarClientes = () => {
    axios
      .get("https://cascudo.onrender.com/api/v1/clientes")
      .then((resp) => {
        const dadosClientes = resp.data.map((cliente) => ({
          id: cliente.id,
          nome: cliente.nome,
          cpf: cliente.cpf,
          dataNascimento: cliente.dataNascimento,
          email: cliente.email,
          qtdCascosDevolvidos: cliente.qtdCascosDevolvidos,
          foto: `data:image/png;base64, ${cliente.foto}`,
        }));
        setClientes(dadosClientes);
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Listagem de Clientes</h1>
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
              <th>CPF</th>
              <th>Nascimento</th>
              <th>Email</th>
              <th>Cascos Devolvidos</th>
              <th className={estilos.fotoColumn}>Foto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.dataNascimento}</td>
                <td>{cliente.email}</td>
                <td>{cliente.qtdCascosDevolvidos}</td>
                <td className={estilos.fotoColumn}>
                  <img
                    src={cliente.foto}
                    alt={cliente.nome}
                    className="logo"
                  />
                </td>
                <td>
                  <Link
                    className="btn btn-sm btn-success me-1"
                    to={`/clientes/alterar/${cliente.id}`}
                  >
                    <i className="bi bi-pen" title="Alterar"></i>
                  </Link>
                  <Link
                    className="btn btn-sm btn-danger"
                    to={`/clientes/excluir/${cliente.id}`}
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

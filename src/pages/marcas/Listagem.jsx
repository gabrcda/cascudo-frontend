import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import estilos from "./Listagem.module.css";
import axios from "axios";

const ListagemMarcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarMarcas = () => {
    axios
      .get("https://cascudo.onrender.com/api/v1/marcas")
      .then((resp) => {
        const dadosMarcas = resp.data.map((marca) => ({
          id: marca.id,
          nome: marca.nome,
          origem: marca.origem,
          fornecedor: marca.fornecedor.nome,
          logo: `data:image/png;base64, ${marca.logo}`,
        }));
        setMarcas(dadosMarcas);
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarMarcas();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Listagem de Marcas</h1>
        <Link className="btn btn-primary" to="cadastrar">
          Nova Marca
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
              <th>Origem</th>
              <th>Fornecedor</th>
              <th>Logo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {marcas.map((marca) => (
              <tr key={marca.id}>
                <td>{marca.nome}</td>
                <td>{marca.origem}</td>
                <td>{marca.fornecedor}</td>
                <td>
                  <img src={marca.logo} alt={marca.nome} className="logo" />
                </td>
                <td>
                  <Link
                    className="btn btn-sm btn-success me-1"
                    to={`/marcas/alterar/${marca.id}`}
                  >
                    <i className="bi bi-pen" title="Alterar"></i>
                  </Link>
                  <Link
                    className="btn btn-sm btn-danger"
                    to={`/marcas/excluir/${marca.id}`}
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

export default ListagemMarcas;

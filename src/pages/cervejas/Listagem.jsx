import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import estilos from "./Listagem.module.css";
import axios from "axios";

const Listagem = () => {
  const [cervejas, setCervejas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marcas, setMarcas] = useState([]);

  const carregarCervejas = () => {
    axios.get("https://cascudo.onrender.com/api/v1/cervejas").then((resp) => {
      const dadosCervejas = resp.data.map((cerveja) => ({
        id: cerveja.id,
        nome: cerveja.nome,
        qtdMaxEstoque: cerveja.qtdMaxEstoque,
        qtdVazio: cerveja.qtdVazio,
        qtdCheio: cerveja.qtdCheio,
        qtdAlcool: cerveja.qtdAlcool,
        precoCerveja: cerveja.precoCerveja,
        precoCasco: cerveja.precoCasco,
        litragem: cerveja.litragem,
        marca: cerveja.marca.nome,
        imagem: `data:image/png;base64, ${cerveja.imagem}`,
      }));
      setCervejas(dadosCervejas);
      setLoading(false);
    });
  };

  const carregarMarcas = () => {
    axios.get("https://cascudo.onrender.com/api/v1/marcas").then((resp) => {
      setMarcas(resp.data);
    });
  };

  useEffect(() => {
    carregarCervejas();
    carregarMarcas();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Listagem de Cervejas</h1>
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
              <th>Marca</th>
              <th>Qtd MáxEstoque</th>
              <th>Qtd Vazio</th>
              <th>Qtd Cheio</th>
              <th>Qtd Álcool</th>
              <th>Preço da Cerveja</th>
              <th>Preço do Casco</th>
              <th>Litragem</th>
              <th className={estilos.fotoColumn}>Imagem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cervejas.map((cerveja) => (
              <tr key={cerveja.id}>
                <td>{cerveja.nome}</td>
                <td>{cerveja.marca}</td>
                <td>{cerveja.qtdMaxEstoque}</td>
                <td>{cerveja.qtdVazio}</td>
                <td>{cerveja.qtdCheio}</td>
                <td>{cerveja.qtdAlcool}</td>
                <td>{cerveja.precoCerveja}</td>
                <td>{cerveja.precoCasco}</td>
                <td>{cerveja.litragem}</td>
                <td className={estilos.fotoColumn}>
                  <img src={cerveja.imagem} alt={cerveja.nome} className="logo" />
                </td>
                <td>
                  <Link className="btn btn-sm btn-success me-1" to={`/cervejas/alterar/${cerveja.id}`}>
                    <i className="bi bi-pen" title="Alterar"></i>
                  </Link>
                  <Link className="btn btn-sm btn-danger" to={`/cervejas/excluir/${cerveja.id}`}>
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

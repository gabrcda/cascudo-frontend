import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={'assets\\images\\beer-mug.png'} alt="Logo da Empresa" className="logo" />
        <span className="company-name">Cascudo</span>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/vendas" className="nav-link">
            💲 Venda
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/entradas" className="nav-link">
            📦 Entrada
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/cervejas" className="nav-link">
            🍺 Cerveja
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/marcas" className="nav-link">
            🛑 Marca
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/fornecedores" className="nav-link">
            🚚 Fornecedor
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/funcionarios" className="nav-link">
            🧑 Funcionário
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/clientes" className="nav-link">
            🧑 Cliente
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/relatorios" className="nav-link">
            📜 Relatórios
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

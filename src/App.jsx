import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListagemClientes from './pages/clientes/Listagem';
import CadastroClientes from './pages/clientes/Cadastro';
import AlteracaoClientes from './pages/clientes/Alteracao';
import ExclusaoClientes from './pages/clientes/Exclusao';
import ListagemFornecedor from './pages/fornecedores/Listagem';
import CadastroFornecedor from './pages/fornecedores/Cadastro';
import AlteracaoFornecedor from './pages/fornecedores/Alteracao';
import ExclusaoFornecedor from './pages/fornecedores/Exclusao';
import ListagemFuncionarios from './pages/funcionarios/Listagem';
import CadastroFuncionarios from './pages/funcionarios/Cadastro';
import AlteracaoFuncionarios from './pages/funcionarios/Alteracao';
import ExclusaoFuncionarios from './pages/funcionarios/Exclusao';
import ListagemMarcas from './pages/marcas/Listagem';
import CadastroMarcas from './pages/marcas/Cadastro';
import AlteracaoMarcas from './pages/marcas/Alteracao';
import ExclusaoMarcas from './pages/marcas/Exclusao';
import ListagemVendas from './pages/vendas/Listagem';
import CadastroVendas from './pages/vendas/Cadastro';
import AlteracaoVendas from './pages/vendas/Alteracao';
import ExclusaoVendas from './pages/vendas/Exclusao';
import VisualizacaoVendas from './pages/vendas/Visualizar';
import ListagemEntradas from './pages/entradas/Listagem';
import CadastroEntradas from './pages/entradas/Cadastro';
import AlteracaoEntradas from './pages/entradas/Alteracao';
import ExclusaoEntradas from './pages/entradas/Exclusao';
import VisualizacaoEntradas from './pages/entradas/Visualizar'
import ListagemCervejas from './pages/cervejas/Listagem';
import CadastroCervejas from './pages/cervejas/Cadastro';
import AlteracaoCervejas from './pages/cervejas/Alteracao';
import ExclusaoCervejas from './pages/cervejas/Exclusao';
import Relatorio from './pages/relatorios/Relatorio';
import Leiaute from './pages/Leiaute';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Leiaute />} >
            <Route path="vendas">
              <Route index element={<ListagemVendas />} />
              <Route path="cadastrar" element={<CadastroVendas />} />
              <Route path="alterar/:id" element={<AlteracaoVendas />} />
              <Route path="excluir/:id" element={<ExclusaoVendas />} />
              <Route path="visualizar/:id" element={<VisualizacaoVendas />} />
            </Route>
            <Route path="entradas">
              <Route index element={<ListagemEntradas />} />
              <Route path="cadastrar" element={<CadastroEntradas />} />
              <Route path="alterar/:id" element={<AlteracaoEntradas />} />
              <Route path="excluir/:id" element={<ExclusaoEntradas />} />
              <Route path="visualizar/:id" element={<VisualizacaoEntradas />} />
            </Route>
            <Route path="cervejas">
              <Route index element={<ListagemCervejas />} />
              <Route path="cadastrar" element={<CadastroCervejas />} />
              <Route path="alterar/:id" element={<AlteracaoCervejas />} />
              <Route path="excluir/:id" element={<ExclusaoCervejas />} />
            </Route>
            <Route path="marcas">
              <Route index element={<ListagemMarcas />} />
              <Route path="cadastrar" element={<CadastroMarcas />} />
              <Route path="alterar/:id" element={<AlteracaoMarcas />} />
              <Route path="excluir/:id" element={<ExclusaoMarcas />} />
            </Route>
            <Route path="funcionarios">
              <Route index element={<ListagemFuncionarios />} />
              <Route path="cadastrar" element={<CadastroFuncionarios />} />
              <Route path="alterar/:id" element={<AlteracaoFuncionarios />} />
              <Route path="excluir/:id" element={<ExclusaoFuncionarios />} />
            </Route>
            <Route path="clientes">
              <Route index element={<ListagemClientes />} />
              <Route path="cadastrar" element={<CadastroClientes />} />
              <Route path="alterar/:id" element={<AlteracaoClientes />} />
              <Route path="excluir/:id" element={<ExclusaoClientes />} />
            </Route>
            <Route path="fornecedores">
              <Route index element={<ListagemFornecedor />} />
              <Route path="cadastrar" element={<CadastroFornecedor />} />
              <Route path="alterar/:id" element={<AlteracaoFornecedor />} />
              <Route path="excluir/:id" element={<ExclusaoFornecedor />} />
            </Route>
            <Route path="relatorios">
              <Route index element={<Relatorio />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

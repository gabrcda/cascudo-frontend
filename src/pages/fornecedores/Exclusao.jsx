import { useNavigate, useParams } from "react-router-dom";
import FormButtons from "../../components/FormButtons";
import axios from "axios";
import { useEffect, useState } from "react";

const Exclusao = () => {
    const [fornecedores, setFornecedores] = useState({});
    const id = useParams().id;

    const navigate = useNavigate();

    function carregarDados() {
        axios.get(`https://cascudo.onrender.com/api/v1/fornecedores/${id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    setFornecedores(resp.data);
                } else if (resp.status === 404) {
                    navigate("/fornecedores");
                } else {
                    console.log(resp);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        carregarDados();
    }, [id]);

    function handleDelete() {
        axios.delete(`https://cascudo.onrender.com/api/v1/fornecedores/${id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    alert("Fornecedor excluído com sucesso!");
                    navigate("/fornecedores")
                } else {
                    console.log(resp);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <h1>Exclusão de Fornecedor</h1>
            <hr />
            <p className="lead">Deseja realmente excluir o fornecedor: {fornecedores.nome}?</p>
            <FormButtons cancelTarget="/fornecedores" negativeTitle="Não" positiveTitle="Sim" positiveAction={handleDelete} buttonType="button" />
        </>
    )
}

export default Exclusao;
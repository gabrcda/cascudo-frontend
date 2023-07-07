import { useNavigate, useParams } from "react-router-dom";
import FormButtons from "../../components/FormButtons";
import axios from "axios";
import { useEffect, useState } from "react";

const Exclusao = () => {
    const [funcionario, setFuncionario] = useState({});
    const id = useParams().id;

    const navigate = useNavigate();

    function carregarDados() {
        axios.get(`https://cascudo.onrender.com/api/v1/funcionarios/${id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    setFuncionario(resp.data);
                } else if (resp.status === 404) {
                    navigate("/funcionario");
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
        axios.delete(`https://cascudo.onrender.com/api/v1/funcionarios/${id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    alert("Funcionário excluído com sucesso!");
                    navigate("/funcionarios");
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
            <h1>Exclusão de Funcionário</h1>
            <hr />
            <p className="lead">Deseja realmente excluir o funcionário: {funcionario.nome}?</p>
            <FormButtons cancelTarget="/funcionarios" negativeTitle="Não" positiveTitle="Sim" positiveAction={handleDelete} buttonType="button" />
        </>
    )
}

export default Exclusao;

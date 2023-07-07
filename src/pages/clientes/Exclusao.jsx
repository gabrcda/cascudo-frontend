import { useNavigate, useParams } from "react-router-dom";
import FormButtons from "../../components/FormButtons";
import axios from "axios";
import { useEffect, useState } from "react";

const Exclusao = () => {
    const [cliente, setCliente] = useState({});
    const id = useParams().id;

    const navigate = useNavigate();

    function carregarDados() {
        axios.get(`https://cascudo.onrender.com/api/v1/clientes/${id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    setCliente(resp.data);
                } else if (resp.status === 404) {
                    navigate("/clientes");
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
        axios.delete(`https://cascudo.onrender.com/api/v1/clientes/${id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    alert("Cliente excluído com sucesso!");
                    navigate("/clientes");
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
            <h1>Exclusão de Cliente</h1>
            <hr />
            <p className="lead">Deseja realmente excluir o cliente: {cliente.nome}?</p>
            <FormButtons cancelTarget="/clientes" negativeTitle="Não" positiveTitle="Sim" positiveAction={handleDelete} buttonType="button" />
        </>
    )
}

export default Exclusao;

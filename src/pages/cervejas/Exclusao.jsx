import { useNavigate, useParams } from "react-router-dom";
import FormButtons from "../../components/FormButtons";
import axios from "axios";
import { useEffect, useState } from "react";

const Exclusao = () => {
    const [cerveja, setCerveja] = useState({});
    const id = useParams().id;

    const navigate = useNavigate();

    function carregarDados() {
        axios.get(`https://cascudo.onrender.com/api/v1/cervejas/${id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    setCerveja(resp.data);
                } else if (resp.status === 404) {
                    navigate("/cervejas");
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
        axios.delete(`https://cascudo.onrender.com/api/v1/cervejas/${id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    alert("Cerveja excluída com sucesso!");
                    navigate("/cervejas");
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
            <h1>Exclusão de Cerveja</h1>
            <hr />
            <p className="lead">Deseja realmente excluir o cliente: {cerveja.nome}?</p>
            <FormButtons cancelTarget="/cervejas" negativeTitle="Não" positiveTitle="Sim" positiveAction={handleDelete} buttonType="button" />
        </>
    )
}

export default Exclusao;

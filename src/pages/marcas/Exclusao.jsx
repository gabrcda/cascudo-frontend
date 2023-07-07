import { useNavigate, useParams } from "react-router-dom";
import FormButtons from "../../components/FormButtons";
import axios from "axios";
import { useEffect, useState } from "react";

const Exclusao = () => {
    const [marca, setMarca] = useState({});
    const id = useParams().id;

    const navigate = useNavigate();

    function carregarDados() {
        axios.get(`https://cascudo.onrender.com/api/v1/marcas/${id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    setMarca(resp.data);
                } else if (resp.status === 404) {
                    navigate("/marcas");
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
        axios.delete(`https://cascudo.onrender.com/api/v1/marcas/${id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    alert("Marca excluída com sucesso!");
                    navigate("/marcas");
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
            <h1>Exclusão de Marcas</h1>
            <hr />
            <p className="lead">Deseja realmente excluir a Marca: {marca.nome}?</p>
            <FormButtons cancelTarget="/marcas" negativeTitle="Não" positiveTitle="Sim" positiveAction={handleDelete} buttonType="button" />
        </>
    )
}

export default Exclusao;

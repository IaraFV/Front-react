import React, { useState, useEffect } from "react";
import './Projetos.css';
import Card from 'react-bootstrap/Card';
import { BsFlagFill } from "react-icons/bs";
import imagemerro from '../img/itensNaoencontrados.png';
import { Link } from 'react-router-dom';
import api from '../../../services/api';

function Projetos() {

    const [initialprojeto, setInitialprojeto] = useState([])

    //get projetos
    const [projeto, setprojeto] = useState([])
    useEffect(() => {
        api.get('/projetos/')
            .then((response) => {
                setprojeto(response.data)
                setInitialprojeto(response.data)

            }).catch(() => {

            })
    }, [])

    //filter pesquisa
    const handlechange = ({ target }) => {
        if (!target.value) {
            setprojeto(initialprojeto)
            return;
        }
        const filter = projeto.filter(({ nome_projeto }) =>
            nome_projeto.toUpperCase().includes(target.value.toUpperCase()))

        setprojeto(filter);
    }
    const porjnum = parseInt(projeto.length);

    function mudacor(status) {
        if (status === 'Em planejamento') {
            return '#EB5757'
        }
        else if (status === 'Em desenvolvimento') {
            return '#E9C46A'
        }
    }

    //formataçao de data
    function formdata(data) {
        let Data = new Date(data);
        return Data.toLocaleDateString("pt-BR")
    }


    function TratamentoError() {
        if (porjnum === 0) {
            return (
                <h2><img src={imagemerro} alt=" " width={'53%'} style={{ marginLeft: '78%' }} /></h2>
            )
        } else {
            return (
                <>
                    {
                        projeto.map((projeto, key) => {
                            return (
                                <div id="div-card-page-projetos">
                                    <Link to={{ pathname: `/InspProjeto/${projeto.id_projeto}` }} style={{ textDecoration: 'none' }} data-cy='projeto-inspecionar'>
                                        <Card id="div-card-projeto">
                                            <Card.Body>
                                                <Card.Title id="nome-projeto-plan" key={key}>
                                                    {projeto.nome_projeto}
                                                </Card.Title>
                                                <Card.Text id="status">
                                                    <span style={{ color: mudacor(projeto.status) }}>{projeto.status}</span>
                                                </Card.Text>
                                                <Card.Text id="bandeira-data">
                                                    <div>
                                                        <span> <BsFlagFill /> </span>{formdata(projeto.data_inicio)}
                                                    </div>
                                                </Card.Text>
                                                <Card.Text>
                                                    <div className="titulo-descricao-projeto">Descrição</div>
                                                    <div id="corpo-descricao-projeto">
                                                        {projeto.descricao_projeto}
                                                    </div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                            );
                        })
                    }
                </>
            )
        }

    }

    return (
        <>
            <div id="geral-cabecario-projetos-sup">
                <div className="cabecario-projetos-sup">
                    <h1 style={{ color: 'white' }} >Projetos</h1>
                    <input type="text" id="input" placeholder="Meu nome é Zé" onChange={handlechange}></input>
                </div>
            </div>
            <div>
                <Link to="/AddProjeto">
                    <button className="botao-page-projeto">Criar Projeto</button>
                </Link>
            </div>
            <div id="geral-cards-page-projetos-jus">
                <div id="caixa-geral-de-projetos" style={{ height: "650px" }}>
                    <TratamentoError />
                </div>
            </div>
        </>
    )
}
export default Projetos;
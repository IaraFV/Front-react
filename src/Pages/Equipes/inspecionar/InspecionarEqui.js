import './InspecionarEqui.css'
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";
import { Progress } from 'rsuite';
import "rsuite/dist/rsuite.css";
import Card from 'react-bootstrap/Card';
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { BsFlagFill } from "react-icons/bs";
import imagemerro from './img/falta_de_dados.png';
import api from '../../Login/services/api';

function InspecionarEquipe() {

    const [equipe, setequipe] = useState([])
    const [pessoa, setpessoa] = useState([])
    const [projeto, setprojeto] = useState([])
    const { id_equipe } = useParams()
    const [percent, setPercent] = React.useState(50);
    const status = percent === 100 ? 'success' : null;
    let navigate = useNavigate()

    /*------------------------------------------------------------------------------GET EQUIPE--------------------------------------------------------------------*/
    useEffect(() => {
        api.get(`/equipes/${id_equipe}`)
            .then((response) => {
                setequipe(response.data)
                console.log('deu certo Men')
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )

    /*-------------------------------------------------------------GET NO PROJETO ESPECÍFICO DA EQUIPE------------------------------------------------------------*/

    useEffect(() => {
        api.get('/equipes/' + id_equipe + '/projetos')
            .then((response) => {
                setprojeto(response.data)
                console.log('deu certo Men')
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )


    /*------------------------------------------------------------------GET NOS MEMBROS DA EQUIPE----------------------------------------------------------------*/

    useEffect(() => {
        api.get("/pessoas/")
            .then((response) => {
                setpessoa(response.data)
                console.log('deu certo Men')
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )


    /*-------------------------------------------------------------FUNCAO PARA DELETAR A EQUIPE ESPECIFICA------------------------------------------------------------*/
    function deleteEquipe(id_equipe) {
        api.delete(`/equipes/${id_equipe}`)
        setequipe(equipe.filter(post => post.id_equipe !== id_equipe))

        setTimeout(() =>
            navigate('/Equipes'), 1000)

    }

    /*-------------------------------------------------------------FUNCAO DE 'SLICE' PARA PEGAR A PRIMEIRA LETRA DO NOME DA EQUIPE------------------------------------------------------------*/
    function stringAvatar(name) {
        return {
            sx: {
                width: '14rem', height: '14rem', fontSize: '8rem'
            },
            children: `${name.split(' ')[0][0]}`,
        };
    }
    function voltar() {
        window.history.back();
    }

    /*---------------------------------------------------------------------------------MANIPULAÇÃO DO ARRAY DE EQUIPE--------------------------------------------------------------------------*/
    const nome = equipe.nome_equipe;
    const getId_equipe = equipe.id_equipe;
    var INTid_equipe = parseInt(getId_equipe);

    /*----------------------------------------------COM A MANIPULAÇÃO DO ARRAY DE EQUIPE AGORA É FILTRADO OS NOMES DOS MEMBROS------------------------------------------------------------------*/
    const ArrGeral_pessoas = pessoa;

    /*-------------------------------------------------------NESSA PARTE É FILTRADO AS PESSOAS COM BASE NO ID DA EQUIPE ORIUNDO DO INTID_EQUIPE-------------------------------------------------*/
    const filtrandoPessoas = ArrGeral_pessoas.filter(pessoa_eque => pessoa_eque.equipe_id === INTid_equipe);
    const inicialLetra = filtrandoPessoas.map((letraini) => letraini.nome_pessoa);
    const recebe = inicialLetra.map((l) => l.charAt(0));

    /*----------------------------------------------------------------------------------AQUI É CALCULADO O TOTAL DE MEMBROS---------------------------------------------------------------------*/
    const totalmember = inicialLetra.length;

    function alentsuccess() {
        alert("Excluido com sucesso")
    }

    console.log(projeto);
    function RenderCards() {
        if (projeto === null) {
            return (
                <h2>
                    <img src={imagemerro} alt=" deu bom" width={'53%'} style={{ marginLeft: '18%' }} />
                </h2>
            )
        } else {
            return (
                <div id="caixa-geral-de-projetos-inspequipe">
                    {
                        projeto?.map((projeto, key) => {
                            return (
                                <div >
                                    <div id="div-card-page-inpequipe">

                                        <Card id="div-card-projeto-equipe">
                                            <Card.Body>
                                                <Card.Title id="header-projeto-inspequipe" key={key}>
                                                    {projeto.nome_projeto}

                                                    <div>
                                                        <Link to={{ pathname: `/InspProjeto/${projeto.id_projeto}` }}>
                                                            <AiOutlineArrowsAlt id="more-button-planejamento" />
                                                        </Link>
                                                    </div>
                                                </Card.Title>
                                                <Card.Text id="status-projeto-isnpequipe">
                                                    {projeto.status}
                                                </Card.Text>
                                               
                                                <Card.Text>
                                                    <div id="titulo-descricao-projeto">Descrição</div>
                                                    <div id="corpo-descricao-projeto">
                                                        {projeto.descricao_projeto}
                                                    </div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>

                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            )

        }
    }

    return (
        <div id='just-cards-geral-inspequipe'>
            <div id="geral-card-inspecionar_equipe">
                <div id="card-inspecionar_equipe">
                    <div>
                        <BsArrowLeft onClick={voltar} id="seta" />
                    </div>
                    <div id="card-header">
                        <Avatar {...stringAvatar(`${nome}`)} />
                    </div>
                    <div id="h1-inspeq" >
                        <div>{equipe.nome_equipe}</div>
                    </div>


                    <div>
                        <div id='icon-plus-inspequi'>
                            <Link to="/Post">
                                <AiOutlinePlus id="corr" />
                            </Link>
                        </div>


                        <div id='tituloinsp'>
                            <div>Membros</div>
                            <div>{totalmember}</div>
                        </div>
                        <div className='avatares_Equipert'>
                            {
                                recebe.map((nomepessoa) => {
                                    return (
                                        <div>
                                            <Avatar aria-label="recipe">{nomepessoa}</Avatar>

                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div id='btn-opition'>

                            <div>
                                <Link className="link-inspequi" to={{ pathname: `/EditarEquipe/${equipe.id_equipe}` }}>
                                    <button id="btn-edit-inspequi" to={{ pathname: `/EditarEquipe/${equipe.id_equipe}` }}>
                                        Editar
                                    </button>
                                </Link>

                            </div>
                            <div>
                                <button type="submit" onClick={() => { deleteEquipe(equipe.id_equipe) }} id="btn-excluir">Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='insp-card-dois-pagina-inspequipe'>
                    <div>
                        <div id='header-projetos-concluidos-insp-equipe'>Projetos</div>
                    </div>

                    <div id='linha-progresso-eq'>
                        <Progress.Line percent={percent} strokeColor={'#00DB99'} status={status} />
                    </div>
                    <div>
                        <RenderCards />
                    </div>


                </div>
            </div>

        </div>
    )
}

export default InspecionarEquipe;
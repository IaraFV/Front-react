import axios from "axios";
import React, { useState, useEffect } from "react";
import './Projetos.css';
import Card from 'react-bootstrap/Card';
import { BsFlagFill } from "react-icons/bs";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlineMore, AiOutlinePlusCircle, AiOutlineArrowsAlt } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";
import Avatar from '@mui/material/Avatar';

//onDrag: Acionado quando um elemento ou seleção de texto está sendo arrastado.
//onDragEnd: Acionado quando uma operação de arrastar está terminando
// (por eexmplo, ao soltar o botão do mouse ou pressionar a tecla esc).
// ondragstart: Acionado quando o usuário começa a arrastar um elemento válido ou seleção de texto. 


function Projetos() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    const cards = document.querySelectorAll('.card')
    const dropzones = document.querySelectorAll('.dropzone')

    const [initialPost, setInitialPost] = useState([])

    //get projetos
    const [post, setpost] = useState([])
    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/')
            .then((response) => {
                setpost(response.data)
                setInitialPost(response.data)
            }).catch(() => {
                console.log("Deu BO Men")
            })
    }, [])

    function deletePost(id_projeto) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/${id_projeto}`)
        setpost(post.filter(posts => posts.id_projeto !== id_projeto))
    }

    //filter pesquisa
    const handlechange = ({ target }) => {
        if (!target.value) {
            setpost(initialPost)
            return;
        }
        const filter = post.filter(({ nome_projeto }) =>
            nome_projeto.toUpperCase().includes(target.value.toUpperCase()))

        setpost(filter);
    }

    return (
        <div>

            <div id="geral-cabecario-projetos-sup">
                <div className="cabecario-projetos-sup">
                    <h1 style={{ color: 'white' }} >Projetos</h1>
                    <input type="text" id="input" placeholder="Meu nome é Zé" onChange={handlechange}></input>
                </div>
            </div>

            <div id="corpo-button-projeto-add">
                <Link to="/AddProjeto">
                    <button className="botao-page-projeto">
                        <AiOutlinePlus />New
                    </button>
                </Link>
            </div>

            <div id="geral-cards-page-projetos-jus">
                <div id="caixa-geral-de-projetos" style={{ height: "650px" }}>
                    {
                        post.map((post, key) => {
                            return (
                                <div>
                                    <div id="div-card-page-projetos">
                                        <Card id="div-card-projeto">
                                            <Card.Body>
                                                <Card.Title id="nome-projeto-plan" key={key}>
                                                    {post.nome_projeto}

                                                    <div>
                                                    <Link to={{ pathname: `/InspProjeto/${post.id_projeto}` }}>
                                                            <AiOutlineArrowsAlt id="more-button-planejamento" />
                                                        </Link>
                                                    </div>

                                                </Card.Title>


                                                <Card.Text id="status">
                                                    {post.status}
                                                </Card.Text>

                                                <Card.Text id="bandeira-data">
                                                    <div><BsFlagFill /></div>
                                                    <div>{post.data_inicio}</div>
                                                </Card.Text>

                                                <Card.Text>
                                                    <div id="titulo-descricao-projeto">Descrição</div>
                                                    <div id="corpo-descricao-projeto">
                                                        {post.descricao_projeto}
                                                    </div>
                                                </Card.Text>

                                                <Card.Text>
                                                    <div id="titulo-descricao-projeto">Membros</div>
                                                    <div id="membros-projeto">
                                                        <Avatar id="avatar-projeto-membro-eq" />
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

                <div id="red-projetos-adicionados">
                    dgfrefvgrvf
                </div>

            </div>
        </div>


    )
}
export default Projetos;

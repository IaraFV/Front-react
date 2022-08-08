import axios from "axios";
import React, { useState, useEffect } from "react";
import './Projetos.css';
import Card from 'react-bootstrap/Card';
import { BsFlagFill } from "react-icons/bs";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlineMore } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
function Projetos() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function log(message) {
        console.log('> ' + message)
    }

    const cards = document.querySelectorAll('.card')
    const dropzones = document.querySelectorAll('.dropzone')

    const [initialPost, setInitialPost] = useState([])

    //get projetos
    const [post, setpost] = useState([])
    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/')
            .then((response) => {
                setpost(response.data)
            }).catch(() => {
                console.log("Deu BO Men")
            })
    }, [])

    function deletePost(id_projeto) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/projeos/${id_projeto}`)
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
    const [show, setShow] = useState(false);


    const handleShow = () => setShow(true);


    //onDrag: Acionado quando um elemento ou seleção de texto está sendo arrastado.
    //onDragEnd: Acionado quando uma operação de arrastar está terminando
    // (por eexmplo, ao soltar o botão do mouse ou pressionar a tecla esc).
    // ondragstart: Acionado quando o usuário começa a arrastar um elemento válido ou seleção de texto. 

    const arr = post;
    var stats = arr;

    var planejamento = stats.filter(states => states.status === "Em planejamento");

    var desenvolvimento = stats.filter(states => states.status === 'Em desenvolvimento');

    var finalizado = stats.filter(states => states.status === 'Concluído');

    cards.forEach(card => {
        card.addEventListener('dragstart', dragstart)
        card.addEventListener('drag', drag)
        card.addEventListener('dragend', dragend)
    })

    function dragstart() {
        dropzones.forEach(dropzone => dropzone.classList.add('highlight'))
        this.classList.add('is-dragging')
    }

    function drag() {
        log('CARD: Is dragging ')
    }

    function dragend() {
        log('CARD: Stop drag! ')
        dropzones.forEach(dropzone => dropzone.classList.remove('highlight'))

        this.classList.remove('is-dragging')
    }

    /** place where we will drop cards */
    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragenter', dragenter)
        dropzone.addEventListener('dragover', dragover)
        dropzone.addEventListener('dragleave', dragleave)
        dropzone.addEventListener('drop', drop)
    })

    function dragenter() {
    }

    function dragover() {

        this.classList.add('over')

        const cardBeingDragged = document.querySelector('.is-dragging')

        this.appendChild(cardBeingDragged)
    }

    function dragleave() {
        this.classList.remove('over')

    }

    function drop() {
        this.classList.remove('over')
    }


    return (
        <div>

            <div id="geral-cabecario-sup">
                <div className="cabecario-projetos-sup">
                    <h1 style={{ color: 'white' }} >Projetos</h1>
                    <input type="text" className="input" placeholder="Meu nome é Zé"></input>
                    <div><AiOutlinePlusCircle style={{ color: '#fff' }} /></div>
                </div>
            </div>


            <div className="d-flex">

                <div className="col-9 d-flex justify-content-around  align-items-cente" style={{ height: "800px" }}>


                    <div className="col-3 d-flex flex-column align-items-center " style={{ height: "745px" }} >
                        <h4 className="text-center mt-2 ">
                            Em planejamento
                        </h4>
                        {
                            planejamento.map((post, key) => {
                                return (

                                    <div class="dropzone" id="card-projeto-planejamento">
                                        <Card style={{ background: '#21222D' }} class="card" id="testeplan" draggable="true" >
                                            <Card.Body>
                                                <Card.Title id="status" key={key}>
                                                    {post.status}

                                                </Card.Title>
                                                <div id="more-button-planejamento">
                                                    <Button
                                                        id="demo-positioned-button"
                                                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick}
                                                    >
                                                        <AiOutlineMore />
                                                    </Button>
                                                    <Menu
                                                        id="demo-positioned-menu"
                                                        aria-labelledby="demo-positioned-button"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        anchorOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left',
                                                        }}
                                                    >
                                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                        <MenuItem onClick={handleClose}>My account</MenuItem>

                                                        <MenuItem
                                                            onClick={() => deletePost(post.id_projeto)} aria-label="share" type="submit">Deletar
                                                        </MenuItem>
                                                    </Menu>
                                                </div>
                                                <Card.Text id="nome-projeto-plan">
                                                    {post.nome_projeto}
                                                </Card.Text>
                                                <Card.Text id="bandeira-data">
                                                    <div><BsFlagFill /></div>
                                                    <div>{post.data_inicio}</div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>


                                );
                            })
                        }
                    </div>


                    <div className="col-3 d-flex flex-column align-items-center" style={{ height: "745px" }}  >
                        <h4 className="text-center mt-2">
                            Em desenvolvimento
                        </h4>
                        {
                            desenvolvimento.map((post, key) => {
                                return (

                                    <div class="dropzone" id="card-projeto-desenvolvimento">
                                        <Card style={{ background: '#21222D' }} id="testedes" class="card" draggable="true">
                                            <Card.Body>
                                                <Card.Title id="status-desen" key={key}>
                                                    {post.status}
                                                </Card.Title>
                                                <Card.Text >
                                                    {post.nome_projeto}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                );
                            })
                        }
                    </div>


                    <div className="col-3 d-flex flex-column align-items-center" style={{ height: "745px" }} >
                        <h4 className="text-center mt-2">
                            Concluídos
                        </h4>
                        {
                            finalizado.map((post, key) => {
                                return (
                                    <div class="dropzone">
                                        <Card style={{ width: '18rem' }} draggable="true">
                                            <Card.Body>
                                                <Card.Title style={{ color: 'black' }} key={key}>{post.nome_projeto}</Card.Title>
                                                <Card.Text>{post.descricao_projeto}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                );
                            })
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}
export default Projetos;

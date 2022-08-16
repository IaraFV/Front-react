import React, { useEffect, useState } from "react";
import './InspProjeto.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import { string } from "yup";
import { BsArrowLeft } from "react-icons/bs";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function InspProjeto() {
    const [projetos, setprojetos] = useState([])
    const { id_projeto } = useParams()
    const [initialprojetos, setInitialprojetos] = useState([])

    function log(message) {
        console.log('> ' + message)
    }

    const cards = document.querySelectorAll('.card')
    const dropzones = document.querySelectorAll('.dropzone')
/*
    const [tasks, settasks] = useState([])
    const [initialtasks, setInitialtasks] = useState([])

    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/')
            .then((response) => {
                settasks(response.data)
                setInitialtasks(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )*/


    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/${id_projeto}`)
            .then((response) => {
                setprojetos(response.data)

            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )
/*

    function deleteprojetos(id_task) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/tasts/${id_task}`)
        setprojetos(projetos.filter(projetos => projetos.id_task !== id_task))
    }
*/

    function deleteprojetos(id_pessoa) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
        setprojetos(projetos.filter(projetos => projetos.id_pessoa !== id_pessoa))
    }

    /** our cards */
    cards.forEach(card => {
        card.addEventListener('dragstart', dragstart)
        card.addEventListener('drag', drag)
        card.addEventListener('dragend', dragend)
    })

    function dragstart() {
        // log('CARD: Start dragging ')
        dropzones.forEach(dropzone => dropzone.classList.add('highlight'))

        // this = card
        this.classList.add('is-dragging')
    }

    function drag() {
        log('CARD: Is dragging ')
    }

    function dragend() {
        // log('CARD: Stop drag! ')
        dropzones.forEach(dropzone => dropzone.classList.remove('highlight'))

        // this = card
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
        // log('DROPZONE: Enter in zone ')
    }

    function dragover() {
        // this = dropzone
        this.classList.add('over')

        // get dragging card
        const cardBeingDragged = document.querySelector('.is-dragging')

        // this = dropzone
        this.appendChild(cardBeingDragged)
    }

    function dragleave() {
        // log('DROPZONE: Leave ')
        // this = dropzone
        this.classList.remove('over')

    }

    function drop() {
        // log('DROPZONE: dropped ')
        this.classList.remove('over')
    }

    /**função de filtro *//*
    const handlechange = ({ target }) => {
        if (!target.value) {
            settasks(initialtasks)
            return;
        }
        const filter = tasks.filter(({ descricao_task }) =>
            descricao_task.toUpperCase().includes(target.value.toUpperCase()))

        settasks(filter);
    }
*/
/*
    const arr = tasks;
    var stats = arr;
    var and = stats.filter(states => states.status === "A fazer");
    var fi = stats.filter(states => states.status === 'Em desenvolvimento');
    var Sta = stats.filter(states => states.status === 'Concluído');
*/
    //const getIdProj = parseInt(projetos.id_projeto);
    //const filtra =  projetos.map(filtra => filtra.tasks);
    
    //c/onsole.log(filtra)

const g =  projetos;
console.log(g);
const j =  projetos.map(gh => gh.tasks);
console.log(j);



    return (
        <>
            <p style={{color:'red'}}>الاغ بزرگ</p>
        </>
    )
}
/**
            <div id="cabecario-geral-pagina-insp-projeto">
                <div id="iconvoltar-pesquisa">
                    <div>
                        <Link to='/ProjetosConcluidos'>
                            <BsArrowLeft id="icon-voltar-projetosconcluidos" />
                        </Link>
                    </div>

                    <div>
                        <input type="text" id="input-insp-projeto" placeholder="Meu nome é Zé" onChange={handlechange}></input>
                    </div>

                </div>

                <div id="botoes-page-inp-projetos">

                    <div className="btn-editar-pagina-projeto">
                        <Link to={{ pathname: `/Edit/${projetos.id_projeto}` }}>
                            <button type="submit">Editar</button>
                        </Link>
                    </div>
                    <div className="btn-excluir-pagina-projeto">
                        <button onClick={() => deleteprojetos(projetos.id_projeto)} aria-label="share" type="submit" to='/pessoas'>Deletar</button>
                    </div>
                </div>

            </div>




            <div>
                <div>
                    <div >
                        <p style={{ color: '#fff' }}>Username:  {projetos.nome_projeto} </p>
                    </div>
                </div>


            </div>

            <div>

                <div className="d-flex ">
                    <div className="col-9 d-flex justify-content-around" style={{ height: "800px" }}>


                        <div className="col-3 d-flex flex-column align-items-center" id="BarraRolagem" style={{ height: "745px" }} >
                            <h4 className="text-center mt-2">
                                A fazer
                            </h4>


                            {
                                and.map((projetos, key) => {
                                    return (
                                        <div className="dropzone" >
                                            <Card style={{ width: '18rem' }} className="card" draggable="true">
                                                <Card.Body>
                                                    <Card.Title style={{ color: 'black' }} key={key}>{projetos.descricao_task}</Card.Title>
                                                    <Card.Text>{projetos.status}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div className="col-3 d-flex flex-column align-items-center" id="BarraRolage" style={{ height: "745px" }} >
                            <h4 className="text-center mt-2">
                                Em desenvolvimento
                            </h4>
                            {
                                fi.map((projetos, key) => {
                                    return (
                                        <div className="dropzone" >
                                            <Card style={{ width: '18rem' }} draggable="true">
                                                <Card.Body className="dropzone">
                                                    <Card.Title style={{ color: 'black' }} key={key}>{projetos.descricao_task}</Card.Title>
                                                    <Card.Text>{projetos.status}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="col-3 d-flex flex-column align-items-center" id="BarraRolag" style={{ height: "745px" }} >
                            <h4 className="text-center mt-2">
                                Concluídos
                            </h4>
                            {
                                Sta.map((projetos, key) => {
                                    return (
                                        <div className="dropzone">
                                            <Card style={{ width: '18rem' }} draggable="true">
                                                <Card.Body>
                                                    <Card.Title style={{ color: 'black' }} key={key}>{projetos.descricao_task}</Card.Title>
                                                    <Card.Text>{projetos.status}
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


 */
export default InspProjeto;
import axios from "axios";
import React, { useState, useEffect } from "react";
import './Task.css';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate, useParams } from 'react-router-dom'

function Task() {


    function log(message) {
        console.log('> ' + message)
    }

    const cards = document.querySelectorAll('.card')
    const dropzones = document.querySelectorAll('.dropzone')

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/')
            .then((response) => {
                setPosts(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )


    function deletePost(id_task) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/tasts/${id_task}`)
        setPosts(posts.filter(post => post.id_task !== id_task))
    }

    const arr = posts;
    var stats = arr;

    var and = stats.filter(states => states.status === "A fazer");

    var fi = stats.filter(states => states.status === 'Em desenvolvimento');

    var Sta = stats.filter(states => states.status === 'Concluído');

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

    

    return (
        <div>
            <div className="cabecalho">
                <h1 style={{ color: 'white' }} >Task</h1>
                <input type="text" className="input" placeholder="Ex: hello"></input>
            </div>
            
            <div className="d-flex ">
                <div className="col-3 " id="teste">
                    <Card style={{ width: '20rem' }}>
                        <Link to="/PostT">
                            <AddCircleOutlineIcon/>
                        </Link>
                    </Card>
                    <Card style={{ width: '26rem' }}>
                        <h1 className="H_um" style={{color:'red'}}>Ultimas Atividades</h1>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">R</Avatar>}
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />
                    </Card>
                </div>

                <div className="col-9 d-flex justify-content-around" style={{ height: "800px" }}>


                    <div className="col-3 d-flex flex-column align-items-center" id="BarraRolagem" style={{ height: "745px" }} >
                        <h4 className="text-center mt-2">
                            A fazer
                        </h4>


                        {
                            and.map((post, key) => {
                                return (
                                    <div className="dropzone" >
                                        <Card style={{ width: '18rem' }} className="card" draggable="true">
                                            <Card.Body>
                                                <Card.Title style={{ color: 'black' }} key={key}>{post.descricao_task}</Card.Title>
                                                <Card.Text>{post.status}
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
                            fi.map((post, key) => {
                                return (
                                    <div className="dropzone" >
                                        <Card style={{ width: '18rem' }} draggable="true">
                                            <Card.Body className="dropzone">
                                                <Card.Title style={{ color: 'black' }} key={key}>{post.descricao_task}</Card.Title>
                                                <Card.Text>{post.status}
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
                            Sta.map((post, key) => {
                                return (
                                    <div className="dropzone">
                                        <Card style={{ width: '18rem' }} draggable="true">
                                            <Card.Body>
                                                <Card.Title style={{ color: 'black' }} key={key}>{post.descricao_task}</Card.Title>
                                                <Card.Text>{post.status}
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
export default Task;
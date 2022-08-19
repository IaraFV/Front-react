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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function InspProjeto() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    


    const [projetos, setprojetos] = useState([])
    const { id_projeto } = useParams()
    const { id_task } = useParams()
    
    const [initialprojetos, setInitialprojetos] = useState([])
    const [ settask] = useState([])
    function log(message) {
        console.log('> ' + message)
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver()
    })

    const Afazer = document.querySelectorAll('#A fazer');
    const desenvovimento = document.querySelectorAll('#Em desenvovimento');
    const Concluido = document.querySelectorAll('#Concluído');
    const dropzones = document.querySelectorAll('.dropzone')

    const [tasks, settasks] = useState([])
    const [initialtasks, setInitialtasks] = useState([])
    /*
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
        )
    */

        console.log(settasks)
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

    function pegarstatus() {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/${id_task}`)
        
            .then(() => {
                console.log('foi task');
            })
            .catch(() => {
                console.log('deu errado pegar task')
            })
    }


    function mudarstatus(id_task) {
        axios.put(`https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/${id_task}`)
    }

    function deleteprojetos(id_pessoa) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
        setprojetos(projetos.filter(projetos => projetos.id_pessoa !== id_pessoa))
    }

    /**função de filtro */
    const handlechange = ({ target }) => {
        if (!target.value) {
            settasks(initialtasks)
            return;
        }
        const filter = tasks.filter(({ descricao_task }) =>
            descricao_task.toUpperCase().includes(target.value.toUpperCase()))

        settasks(filter);
    }

    const k = projetos.tasks
    const l = k?.filter((get) => get.status === "A fazer");
    const f = k?.filter((get) => get.status === "Em desenvolvimento");
    const g = k?.filter((get) => get.status === "Concluído");
    console.log(f);
    /**variavesi do seletor */
    const [valuPessoa, setvalue] = React.useState('');
    console.log(valuPessoa);
    /**funçoes de evento das variaves do seletor */
    const handleChange = (event) => {
        setvalue(event.target.value);
    };
    function putego() {

    }
    return (
        <div>
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
                <div >
                    <p style={{ color: '#fff' }}>Username:  {projetos.nome_projeto} </p>
                </div>
            </div>
            <div className="d-flex ">
                <div className="col-9 d-flex justify-content-around" style={{ height: "800px" }}>
                    <div className="col-3 d-flex flex-column align-items-center" id="BarraRolagem" style={{ height: "745px" }} >
                        <h4 className="text-center mt-2">
                            A fazer
                        </h4>
                        {
                            l?.map((projetos, key) => {
                                return (
                                    <div className="dropzone" >
                                        <Card style={{ width: '18rem' }} id='A fazer' draggable="true">
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
                            f?.map((projetos, key) => {
                                return (
                                    <div className="dropzone" >
                                        <Card style={{ width: '18rem' }} id="Em desenvolvimento" draggable="true">
                                            <Card.Body>
                                                <Card.Title style={{ color: 'black' }} value={projetos.id_task} key={key}>
                                                    {projetos.descricao_task}
                                                    <Button onClick={() => {pegarstatus(tasks.id_task)}} >Open modal</Button>
                                                    <Modal
                                                        open={open}
                                                        onClose={handleClose}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    >
                                                        <Box sx={style}>
                                                            <Button onClick={putego}>concluido</Button>
                                                        </Box>
                                                    </Modal>
                                                </Card.Title>
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
                            g?.map((projetos, key) => {
                                return (
                                    <div className="dropzone">
                                        <Card style={{ width: '18rem' }} id="Concluído" draggable="true">
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
    )
}

export default InspProjeto;
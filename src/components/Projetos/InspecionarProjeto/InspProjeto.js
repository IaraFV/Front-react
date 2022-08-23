import React, { useEffect, useState } from "react";
import './InspProjeto.css'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import imagemerro from './img/itensNaoencontrados.png';

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
    const [projetos, setprojetos] = useState([])
    const { id_projeto } = useParams()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function log(message) {
        console.log('> ' + message)
    }

    const [tasks, settasks] = useState([])
    const [initialtasks, setInitialtasks] = useState([])

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

    useEffect(() => {
        axios.get("https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/")
            .then((response) => {
                settasks(response.data)
                setInitialtasks(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )

    function deleteprojetos(id_projeto) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/${id_projeto}`)
        setprojetos(projetos.filter(projetos => projetos.id_projeto !== id_projeto))
    }

    //filter pesquisa
    const handlechange = ({ target }) => {
        if (!target.value) {
            setInitialtasks(initialtasks)
            return;
        }
        const filter = tasks.filter(({ descricao_task }) =>
            descricao_task.toUpperCase().includes(target.value.toUpperCase()))

        setInitialtasks(filter);
    }
    const pegaid = parseInt(id_projeto);
    const gettask = tasks.filter((get) => get.projeto_id === pegaid);
    const l = gettask.filter((get) => get.status === "A fazer");
    const f = gettask.filter((get) => get.status === "Em desenvolvimento");
    const g = gettask.filter((get) => get.status === "Concluído");

    function VerificaAfazer() {
        if (l.length === 0) {
            return (
                <h2><img src={imagemerro} alt=" " width={'53%'} style={{ marginLeft: '28%' , marginTop:'50%' }} /></h2>
            )
        } else {
            return (
                <>
                    {
                        l?.map((projetos, key) => {
                            return (
                                <div className="dropzone" >
                                    <Card style={{ width: '18rem' }} id='A fazer' draggable="true">
                                        <Card.Body>
                                            <Card.Title style={{ color: 'black' }} key={key}>{projetos.descricao_task}
                                                <Button onClick={handleOpen}>Open modal</Button>
                                                <Modal
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                                                        </Typography>

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
                </>
            )
        }
    }
    function VerificaDesenvolvimento() {
        if (f.length === 0) {
            return (
                <h2><img src={imagemerro} alt=" " width={'53%'} style={{ marginLeft: '28%' , marginTop:'50%' }} /></h2>
            )
        } else {
            return (
                <>
                    {
                        f.map((projetos, key) => {
                            return (
                                <div className="dropzone" >
                                    <Card style={{ width: '18rem' }} id="Em desenvolvimento" draggable="true">
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
                </>
            )
        }
    }
    function VerificaConcluído() {
        if (g.length === 0) {
            return (
                <h2><img src={imagemerro} alt=" " width={'53%'} style={{ marginLeft: '28%' , marginTop:'50%' }} /></h2>
            )
        } else {
            return (
                <>
                    {
                        g.map((projetos, key) => {
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
                </>
            )
        }
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
                        <VerificaAfazer/>
                    </div>

                    <div className="col-3 d-flex flex-column align-items-center" id="BarraRolage" style={{ height: "745px" }} >
                        <h4 className="text-center mt-2">
                            Em desenvolvimento
                        </h4>
                        <VerificaDesenvolvimento/>
                    </div>
                    <div className="col-3 d-flex flex-column align-items-center" id="BarraRolag" style={{ height: "745px" }} >
                        <h4 className="text-center mt-2">
                            Concluídos
                        </h4>
                        <VerificaConcluído/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InspProjeto;
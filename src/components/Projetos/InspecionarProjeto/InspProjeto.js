import React, { useEffect, useState } from "react";
import './InspProjeto.css'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import imagemerro from './img/itensNaoencontrados.png';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import api from "../../Login/services/api"

const validacaoPost = yup.object().shape({
    status:yup.string().required("O campo é obrigatorio!"),
    
})


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};



function InspProjeto() {
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacaoPost)
        })

    //variaves das requisições GET
    const [projetos, setprojetos] = useState([])
    const { id_projeto } = useParams()
    const [tasks, settasks] = useState([])
    const [initialtasks, setInitialtasks] = useState([])

    //get do array geral de projetos, sendo passado um parametro para busca com base no id passado
    useEffect(() => {
        api.get(`/projetos/${id_projeto}`)
            .then((response) => {
                setprojetos(response.data)

            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )
    const addPost = data => api.put("/tasks/"+getid+'/status', data)
    .then(() => {
        console.log("foi")
       
    })
    .catch(() => {
        console.log("n foi")
    })

    //get do array geral de tasks
    useEffect(() => {
        api.get("/tasks/")
            .then((response) => {
                settasks(response.data)
                setInitialtasks(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )
    //função de delete
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
    /**pega o id do projeto selecionado e converte para inteiro*/
    const pegaid = parseInt(id_projeto);
    /**filtra as taks com basa no id do projeto */
    const gettask = tasks.filter((get) => get.projeto_id === pegaid);
    /**divide as taks vindas da pimeira filtragem e as filtra novamento com base no status */
    const filtFazer = gettask.filter((get) => get.status === "A fazer");
    const filtFazendo = gettask.filter((get) => get.status === "Em desenvolvimento");
    const filtFeito = gettask.filter((get) => get.status === "Concluído");


    //variavel da manipulação do modal 1
    const [open, setOpen] = React.useState(false);
    var [getid, Setteste] = React.useState();

    /*const handleClickOpen = () => {
        setOpenh(true);
    };*/
   //const {teste, setteste} = useState([])
    function handleClickOpen (id_task) {
        if (id_task !== 0) {
            setOpen(true)
            Setteste(id_task)
        }else{
            console.log('n foi true')
        }
    }
    console.log(open);
    const handleClose = () => {
        setOpen(false);
    };
    //variavel da manipulação do modal 2
    const [openh, setOpenh] = React.useState(false);

    const handleClickOpenh = () => {
        setOpenh(true);
    };
    const handleCloseh = () => {
        setOpenh(false);
    };
    
    /**Esta função faz uma verificação de erro. Caso o Array velha vazio ele retorna uma imagem 
     * de "nenhum item encontrado".*/
    function VerificaAfazer() {
        if (filtFazer.length === 0) {
            return (
                <h2><img src={imagemerro} alt=" " width={'53%'} style={{ marginLeft: '28%', marginTop: '50%' }} /></h2>
            )
        } else {
            return (
                <>
                    {
                        filtFazer.map((projetos, key) => {
                            return (
                                <div className="dropzone" >
                                    <Button variant="outlined" onClick={() => handleClickOpen(projetos.id_task)}>
                                        <Card style={{ width: '18rem' }} id='A fazer' draggable="true">
                                            <Card.Body>
                                                <Card.Title style={{ color: 'black' }} key={key}>{projetos.descricao_task}
                                                </Card.Title>
                                                <Card.Text>{projetos.status}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Button>
                                </div>
                            );
                        })
                    }
                    <BootstrapDialog  
                        aria-labelledby="customized-dialog-title"
                        open={open}>
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Modal title
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>
                                <FormControlLabel
                                    {...register("status")}
                                    value="Em desenvolvimento"
                                    control={<Checkbox />}
                                    label="Em desenvolvimento"
                                    labelPlacement="Em desenvolvimento"
                                   
                                />
                                <FormControlLabel
                                    {...register("status")}
                                    value="Concluído"
                                    control={<Checkbox />}
                                    label="Concluído"
                                    labelPlacement="Concluído"
                                    
                                />
                            </Typography>
                        </DialogContent>
                        <DialogActions type='submit' onClick={handleSubmit(addPost)}>
                            <Button autoFocus type="submit" >
                                Save changes
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </>
            )
        }
    }

    /**Esta função faz uma verificação de erro. Caso o Array velha vazio ele retorna uma imagem 
     * de "nenhum item encontrado".
    */
    function VerificaDesenvolvimento() {
        if (filtFazendo.length === 0) {
            return (
                <h2><img src={imagemerro} alt=" " width={'53%'} style={{ marginLeft: '28%', marginTop: '50%' }} /></h2>
            )
        } else {
            return (
                <>
                    {
                        filtFazendo.map((projetos, key) => {
                            return (
                                <div className="dropzone" >
                                    <Button variant="outlined" onClick={handleClickOpenh}>
                                    <Card style={{ width: '18rem' }} id="Em desenvolvimento" draggable="true">
                                        <Card.Body className="dropzone">
                                            <Card.Title style={{ color: 'black' }} key={key}>{projetos.descricao_task}</Card.Title>
                                            <Card.Text>{projetos.status}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    </Button>
                                </div>
                            );
                        })
                    }
                    <BootstrapDialog onSubmit={handleSubmit(addPost)}
                        onClose={handleCloseh}
                        aria-labelledby="customized-dialog-title"
                        open={openh}>
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseh}>
                            Modal title
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>
                                <FormControlLabel
                                    {...register("status")}
                                    value="A fazer"
                                    control={<Checkbox />}
                                    label="A fazer"
                                    labelPlacement="A fazer"
                                />
                                <FormControlLabel
                                    {...register("status")}
                                    value="Concluído"
                                    control={<Checkbox />}
                                    label="Concluído"
                                    labelPlacement="Concluído"
                                />
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCloseh}>
                                Save changes
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </>
            )
        }
    }
    /**Esta função faz uma verificação de erro. Caso o Array velha vazio ele retorna uma imagem 
     * de "nenhum item encontrado".
    */
    function VerificaConcluído() {
        if (filtFeito.length === 0) {
            return (
                <h2><img src={imagemerro} alt=" " width={'53%'} style={{ marginLeft: '28%', marginTop: '50%' }} /></h2>
            )
        } else {
            return (
                <>
                    {
                        filtFeito.map((projetos, key) => {
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
                        <VerificaAfazer />
                    </div>

                    <div className="col-3 d-flex flex-column align-items-center" id="BarraRolage" style={{ height: "745px" }} >
                        <h4 className="text-center mt-2">
                            Em desenvolvimento
                        </h4>
                        <VerificaDesenvolvimento />
                    </div>
                    <div className="col-3 d-flex flex-column align-items-center" id="BarraRolag" style={{ height: "745px" }} >
                        <h4 className="text-center mt-2">
                            Concluídos
                        </h4>
                        <VerificaConcluído />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InspProjeto;
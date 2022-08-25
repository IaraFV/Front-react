//GAMBIARA SUPREMA NÃO APAGUE E NEM DESCOMENTE
//SE DESCOMPRIR AS ORIENTAÇÕES ACIMA A RESPONSABILIDADE É SUA!!!
/*
import React, { useEffect , useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useParams } from 'react-router-dom'
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom'
import { Link } from "@mui/material";
const validacaoGet = yup.object().shape({
    status: yup.string().required("O campo é obrigatorio!")
})

function Muda() {
    let navigate = useNavigate()
    const { id_task } = useParams()
    
    const addPost = data => axios.put(`https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/${id_task}/status`, data)
    .then(() => {
        console.log("foi");
        alert('cadastro realizado');
        navigate(`/MudaSta/${id_task}`);
    })
    .catch(() => {
        console.log("n foi")
    })/*
    const addPost = data => axios.put(`https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/ + ${id_task} + ${valutask}`, data)
        .then(() => {
            console.log("foi")
        })
        .catch(() => {
            console.log("n foi")
        })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validacaoGet)
    })

    const {task, settask} = useState([])
    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/${id_task}`)
            .then((response) => {
                settask(response.data)
            })
    }, [])
    function voltar() {
        window.history.back();
    }
//variavesi do seletor 
var [valutask, setvalue] = React.useState('');

    //funçoes de evento das variaves do seletor 
const handleChange = (event) => {
    setvalue(event.target.value);
};
    return (
        <div>
            <main>
                <div className="card-post">
                    <h1>Editar status</h1>
                    <div className="line-post"></div>

                    <div className="body-post">

                        <form onSubmit={handleSubmit(addPost)}>

                            <Select
                                {...register("status")}
                                labelId="demo-simple-select-label"
                                status="demo-simple-select"
                                value={valutask}
                                label="Age"
                                sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                onChange={handleChange}>
                                    <MenuItem id="menuEquipe-pageequipes" value={'A fazer'} key={'A fazer'}>A fazer</MenuItem>
                                    <MenuItem id="menuEquipe-pageequipes" value={'Em desenvolvimento'} key={'Em desenvolvimento'}>Em desenvolvimento</MenuItem>
                                    <MenuItem id="menuEquipe-pageequipes" value={'Concluído'} key={'Concluído'}>Concluído</MenuItem>
                            </Select>

                            <div className="btn-postt">
                                <Link id="btn-cancelar" onClick={voltar}>Cancelar</Link>
                                <button type="submit"  id="btn-cadastrar">Cadastrar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Muda;*/
/**
 * 
 * CODIGO DA PAGINA INSPECIONAR PROJETO
 * 
 * import React, { useEffect, useState } from "react";
import './InspProjeto.css'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import imagemerro from './img/itensNaoencontrados.png';

function InspProjeto() {



    //variaves das requisições GET
    const [projetos, setprojetos] = useState([])
    const { id_projeto } = useParams()
    const [tasks, settasks] = useState([])
    const [initialtasks, setInitialtasks] = useState([])

    //get do array geral de projetos, sendo passado um parametro para busca com base no id passado
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
    const addPost = data => axios.post("https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/", data)
        .then(() => {
            console.log("foi")

        })
        .catch(() => {
            console.log("n foi")
        })

    //get do array geral de tasks
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
    /**pega o id do projeto selecionado e converte para inteiro
    const pegaid = parseInt(id_projeto);
    /**filtra as taks com basa no id do projeto 
    const gettask = tasks.filter((get) => get.projeto_id === pegaid);
    /**divide as taks vindas da pimeira filtragem e as filtra novamento com base no status 
    const filtFazer = gettask.filter((get) => get.status === "A fazer");
    const filtFazendo = gettask.filter((get) => get.status === "Em desenvolvimento");
    const filtFeito = gettask.filter((get) => get.status === "Concluído");


    /**Esta função faz uma verificação de erro. Caso o Array velha vazio ele retorna uma imagem 
     * de "nenhum item encontrado".
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
                                    <Link to={{ pathname: `/MudaSta/${projetos.id_task}` }}>
                                        <button>status</button>
                                    </Link>
                                    <Card style={{ width: '18rem' }} id='A fazer' draggable="true">
                                        <Card.Body>
                                            <Card.Title style={{ color: 'black' }} key={key}>{projetos.descricao_task}
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

    /**Esta função faz uma verificação de erro. Caso o Array velha vazio ele retorna uma imagem 
     * de "nenhum item encontrado".
    
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
                                    <Link to={{ pathname: `/MudaSta/${projetos.id_task}` }}>
                                        <button>status</button>
                                    </Link>
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
    /**Esta função faz uma verificação de erro. Caso o Array velha vazio ele retorna uma imagem 
     * de "nenhum item encontrado".
    
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

export default InspProjeto; */
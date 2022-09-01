import React, { useEffect, useState } from "react";
import './inspecionar.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { BsFillFileEarmarkFill } from "react-icons/bs";
import CheckIcon from '@mui/icons-material/Check';
import { AiOutlineStar } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import imagemerro from '../../../assets/img/falta_de_dados (cópia).png';
import api from '../../../services/api'

const validacaoGet = yup.object().shape({
    favoritar: yup.number(),
})
function Inspecionar() {
    let navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [Task, setTask] = useState([])
    const { id_pessoa } = useParams()
   
   
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validacaoGet)
    })
    
    useEffect(() => {
        api.get(`/pessoas/${id_pessoa}`)
            .then((response) => {
                setPosts(response.data)

            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )
    useEffect(() => {
        api.get(`/tasks/`)
            .then((response) => {
                setTask(response.data)
                console.log("deu certo boy")

            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )
    const nome = posts.nome_pessoa;
    function deletePost(id_pessoa) {
        api.delete(`/pessoas/${id_pessoa}`)
        setPosts(posts.filter(post => post.id_pessoa !== id_pessoa))
    }
    function stringAvatar(name) {
        return {
            sx: {
                //bgcolor: stringToColor(name),
                width: '14rem', height: '14rem', fontSize: '8rem'
            },
            children: `${name.split(' ')[0][0]}`,
        };
    }
    const ArrGeral_task = Task;
    const recebId_pessoa = posts.id_pessoa;
    const idPessoaINT = parseInt(recebId_pessoa);
    const filtra_task = Task.filter(task => task.pessoa_id === idPessoaINT);
    /**pega o numero total de task */
    const numero = filtra_task.length;
  
    /*----------------------------------------------------------------------------------------------------------------------*/


    var favoritar = parseInt(posts.favoritar);

    console.log(favoritar);
   

    function favoritarFuncao() {
        favoritar++
        if (favoritar === 1) {
             api.put('/pessoas/' + id_pessoa + '/favoritar')
                .then(() => {
                    console.log("favoritou")
                })
                .catch(() => {
                    console.log("n favoritou")
                })
               
        } 
        
    }


    
    function RenderCards() {
        if (numero === 0) {
            return (
                <h2><img src={imagemerro} alt=" " width={'53%'} style={{marginLeft:'78%'}}  /></h2>
            )
        } else {
            return (
                <>
                    {filtra_task.map(t => {
                        return (
                            <div id="container-render-projetos-insppessoas">
                                <Card id="card-tarefas-dee-pessoas">
                                    <CardContent id="test">
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe">
                                                    <BsFillFileEarmarkFill id="cor" />
                                                </Avatar>
                                            }>
                                                
                                            </CardHeader>
                                        <Typography >
                                            <h5 id="titulo">{t.descricao_task}</h5>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })}
                </>
            )
        }

    }

     
    function voltar() {
        window.history.back();
    }
    
    return (
        <>
            <div id="geral-card-inspecionar">
                <div id="card-inspecionar">
                    <Link to='/Pessoas'>
                        <BsArrowLeft id="voltar-insp" />
                    </Link>
                    <div id="card-header">
                        <Avatar {...stringAvatar(`${nome}`)} />
                    </div>
                    <div>
                        <div  id="h1-insp-pagina-pessoa-insp">{posts.nome_pessoa}</div>
                    </div>
                    <div id="geralestatistica">
                        <div id="estatisticaum">
                            <div className="doneicon"><CheckIcon /></div>
                            <div id="textoestatistica">
                                <p id="total-taskfeitas-pagepessoas">{numero}</p>
                                <p id="tasks-feitas-pagepessoa">Total Tasks</p>
                            </div>
                        </div>
                        <div id="estatisticadois" >
                            <button type="submit"  onClick={favoritarFuncao}  className="star">
                                <AiOutlineStar />
                            </button>
                        </div>
                    </div>
                    
                    <div id="detalhes">

                        <div id="cabecariodetalhes">
                            Detalhes
                        </div>

                        <div id="bodydetalhes">
                            <p>Username: {posts.nome_pessoa}</p>
                            <p>Função: {posts.funcao_pessoa}</p>
                            <p>Data de contratação: {posts.data_contratacao}</p>
                        </div>
                    </div>
                    <div id="botoes-insp">
                        <div className="btn-editar">
                            <Link to={{ pathname: `/Edit/${posts.id_pessoa}` }}>
                                <button type="submit">Editar</button>
                            </Link>
                        </div>
                        <div className="btn-excluir">
                            <Link to='/Pessoas'>
                            <button onClick={() => deletePost(posts.id_pessoa)} aria-label="share" type="submit" >Deletar</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div id="card-inspdois">
                    <div id="card-header-insp">
                        <div id="btn-addTask-pessoaInsp">
                            Task's
                            <Link to="/PostT">
                                <AiOutlinePlus className="btn-adicionartesk"></AiOutlinePlus>
                            </Link>
                        </div>
                       
                    </div>
                    <div id="lucas">
                        <RenderCards />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Inspecionar;
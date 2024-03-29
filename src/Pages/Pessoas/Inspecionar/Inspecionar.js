import React, { useEffect, useState } from "react";
import './inspecionar.css'
import { useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { AiOutlineStar } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import imagemerro from '../../../assets/img/falta_de_dados (cópia).png';
import api from '../../../services/api'
import { message } from "antd";

function Inspecionar() {

    const validacaoGet = yup.object().shape({
        favoritar: yup.number(),
    })
    const [people, setPeople] = useState([])
    const [Task, setTask] = useState([])
    const { id_pessoa } = useParams()


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validacaoGet)
    })

    useEffect(() => {
        api.get(`/pessoas/${id_pessoa}`)
            .then((response) => {
                setPeople(response.data)

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
    const nome = people.nome_pessoa;



    function deletePost(id_pessoa) {
        api.delete(`/pessoas/${id_pessoa}`)
        message.success('Usuario deletado!')
        setPeople(people.filter(post => post.id_pessoa !== id_pessoa))
        window.location.reload(true);
    }


    function formdata(data) {
        let Data = new Date(data);
        return Data.toLocaleDateString("pt-BR")
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
    const recebId_pessoa = people.id_pessoa;
    const idPessoaINT = parseInt(recebId_pessoa);
    const filtra_task = Task.filter(task => task.pessoa_id === idPessoaINT);
    
    /**pega o numero total de task */
    const numero = filtra_task.length;

    var favoritar = parseInt(people.favoritar);

    /*----------------------------------------------------------------------------------------------------------------------*/

    function favoritarFuncao() {
        api.put('/pessoas/' + id_pessoa + '/favoritar')
        .then(() =>{
            
            window.location.reload(true)

        })
        .catch(() => {
            message.error('Usuario não foi favoritado!')
        })

    }

    function mudarCor() {
        if (favoritar === 1) {
            return '#2684FF' 
        }
        else if (favoritar === 0){
            return '#fffff'
        }
    }

    function RenderCards() {
        if (numero === 0) {
            return (
                <h2><img src={imagemerro} alt=" " width={'53%'} style={{ marginLeft: '78%' }} /></h2>
            )
        } else {

            return (
                <>
                    {filtra_task.map(t => {
                        return (
                            <div id="container-render-projetos-insppessoas">
                                <Card id="card-tarefas-dee-pessoas">
                                    <CardContent id="test">
                                        <Typography id="titulo-projeto-tarefa-pessoa">
                                            {t.nome_projeto}
                                        </Typography>
                                        <Typography id="nome-tarefa-inppessoa">
                                            {t.descricao_task}
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
                        <div id="h1-insp-pagina-pessoa-insp">{people.nome_pessoa}</div>
                    </div>
                    <div id="geralestatistica">
                        <div className="estatisticaumdeum">
                            <div className="doneicon">
                                <CheckIcon/></div>
                            <div id="textoestatistica">
                                <p id="total-taskfeitas-pagepessoas">{numero}</p>
                                <p id="tasks-feitas-pagepessoa">Total Tasks</p>
                            </div>
                        </div>

                        <div id="estatisticadois" >
                            <button className="star">
                                <span style={{ color: mudarCor(favoritarFuncao) }}>
                                    <AiOutlineStar onClick={favoritarFuncao}  />
                                </span>
                            </button>
                        </div>
                    </div>

                    <div id="detalhes">

                        <div id="cabecariodetalhes">
                            Detalhes
                        </div>

                        <div id="bodydetalhes">
                            <p>Username: {people.nome_pessoa}</p>
                            <p>Função: {people.funcao_pessoa}</p>
                            <p>Data de contratação: {formdata(people.data_contratacao)}</p>
                        </div>
                    </div>
                    <div id="botoes-insp">
                        <div className="btn-editar">
                            <Link to={{ pathname: `/Edit/${id_pessoa}` }}>
                                <button type="submit">Editar</button>
                            </Link>
                        </div>
                        <div className="btn-excluir">
                            <Link to='/Pessoas'>
                                <button onClick={() => deletePost(people.id_pessoa)} aria-label="share" type="submit" >Deletar</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div id="card-inspdois">
                    <div id="card-header-insp">
                        <div id="btn-addTask-pessoaInsp">
                            Tarefas
                        </div>

                    </div>
                    <div id="conteiner-das-tasks">
                        <RenderCards />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Inspecionar;
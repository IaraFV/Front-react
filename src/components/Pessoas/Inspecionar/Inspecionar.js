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
/** */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

function Inspecionar() {

    const [favoritar, setFavoritar] = useState()

    let navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [Task, setTask] = useState([])
    const { id_pessoa } = useParams()



    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
            .then((response) => {
                setPosts(response.data)

            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )
    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/`)
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
    //<Avatar  sx={{ width: '14rem', height: '14rem', fontSize: '8rem' }} aria-label="recipe">{nome.charAt(0)}</Avatar>


    function deletePost(id_pessoa) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
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
    const filtra_task = ArrGeral_task.filter(task => task.pessoa_id === idPessoaINT);


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
                    <div id="h1-insp">
                        <h1>{posts.nome_pessoa}</h1>
                    </div>
                    <div id="geralestatistica">
                        <div id="estatisticaum">
                            <div className="doneicon"><CheckIcon /></div>
                            <div id="textoestatistica">
                                <p style={{ color: "rgba(186, 186, 186, 0.87)", fontSize: "1.2rem" }}>10</p>
                                <p style={{ marginTop: '-20%', color: '#fff', width: '5rem' }}>Tasks feitas</p>
                            </div>
                        </div>
                        <div id="estatisticadois">

                            <button onClick={() => setFavoritar(!favoritar)} className="star">
                                <AiOutlineStar />
                            </button>

                            <p style={{ color: "rgba(186, 186, 186, 0.87)", fontSize: "1.2rem" }}>
                                {favoritar ? 0 : 1}
                            </p>
                        </div>
                    </div>
                    <div id="detalhes">
                        <div id="cabecariodetalhes">
                            <h4>Detalhes</h4>
                            <div className="line-insp"></div>
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
                            <button onClick={() => deletePost(posts.id_pessoa)} aria-label="share" type="submit" to='/pessoas'>Deletar</button>
                        </div>
                    </div>
                </div>
                <div id="card-inspdois">
                    <div id="card-header-insp">
                        <div id="btn-addTask-pessoaInsp">
                            <h2>Task's</h2>
                            <Link to="/PostT">
                                <AiOutlinePlus className="btn-adicionartesk"></AiOutlinePlus>
                            </Link>
                        </div>
                        <div className="line-insp-dois"></div>
                    </div>
                    <div id="lucas">
                        {filtra_task.map((tasks) => {
                            return (
                                <div id="try">
                                    <Card sx={{ minWidth: 175 }} id="cardtask">
                                        <CardContent id="test">
                                            <CardHeader
                                                avatar={
                                                    <Avatar  aria-label="recipe">
                                                        <BsFillFileEarmarkFill id="cor"/>
                                                    </Avatar>
                                                }></CardHeader>
                                            <Typography variant="h5" id="titulo" component="div">
                                                {tasks.descricao_task}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inspecionar;
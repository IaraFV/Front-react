import React, { useEffect, useState } from "react";
import './inspecionar.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { BsFillFileEarmarkFill } from "react-icons/bs";
import CheckIcon from '@mui/icons-material/Check';
import { AiOutlineStar } from "react-icons/ai";
function Inspecionar() {

    let navigate = useNavigate()
    const [posts, setPosts] = useState([])
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

    function deletePost(id_pessoa) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
        setPosts(posts.filter(post => post.id_pessoa !== id_pessoa))
    }

    return (
        <>
            <div id="geral-card-inspecionar">
                <div id="card-inspecionar">
                    <div id="card-header">
                        <Avatar sx={{ width: '14rem', height: '14rem', fontSize: '8rem' }} aria-label="recipe">A</Avatar>

                    </div>
                    <div id="nome">
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
                            <div className="star"><AiOutlineStar /></div>
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
                            <button onClick={() => deletePost(posts.id_pessoa)} aria-label="share" type="submit">Deletar</button>
                        </div>
                    </div>
                </div>

                <div id="card-inspdois">

                    <div id="card-header-insp">
                        <h2>Task's</h2>
                        <div className="line-insp-dois"></div>
                    </div>

                    
                    <div id="cards-insp-tasks">
                    </div>
                    <div id="file" ><BsFillFileEarmarkFill/></div>

                    <div id="cards-insp-tasks">
                    </div>
                    <div id="file" ><BsFillFileEarmarkFill/></div>
                </div>
            </div>
        </>
    )
}

export default Inspecionar;
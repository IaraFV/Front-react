import React, { useEffect, useState } from "react";
import './InspProjeto.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { BsFillFileEarmarkFill } from "react-icons/bs";
import CheckIcon from '@mui/icons-material/Check';
import { AiOutlineStar } from "react-icons/ai";
import { string } from "yup";
import { BsArrowLeft } from "react-icons/bs";
import Card from 'react-bootstrap/Card';
import CardHeader from '@mui/material/CardHeader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



function InspProjeto() {


    const [post, setPost] = useState([])
    const { id_projeto } = useParams()

    const cards = document.querySelectorAll('.card')
    const dropzones = document.querySelectorAll('.dropzone')

    const [posts, setPosts] = useState([])
    const [initialPosts, setInitialPosts] = useState([])

    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/projeto/${id_projeto}`)
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
 
    return (
        <>


            <div id="geral-card-inspecionar">
                <div id="card-inspecionar">


                    <Link to='/Pessoas'>
                        <BsArrowLeft id="voltar-insp" />
                    </Link>



                    <div id="h1-insp">
                        <h1>{post.nome_pessoa}</h1>
                    </div>
                    

                    <div id="detalhes">
                        <div id="cabecariodetalhes">
                            <h4>Detalhes</h4>
                            <div className="line-insp"></div>
                        </div>
                        <div style={{ color: '#fff' }}>
                            <p>Username: {post.nome_projeto}</p>
                          
                            
                        </div>
                    </div>

                    <div id="botoes-insp">
                        <div className="btn-editar">
                            <Link to={{ pathname: `/Edit/${post.id_projeto}` }}>
                                <button type="submit">Editar</button>
                            </Link>
                        </div>
                        <div className="btn-excluir">
                            <button onClick={() => deletePost(posts.id_projeto)} aria-label="share" type="submit" to='/pessoas'>Deletar</button>
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
                    <div id="file" ><BsFillFileEarmarkFill /></div>

                    <div id="cards-insp-tasks">
                    </div>
                    <div id="file" ><BsFillFileEarmarkFill /></div>
                </div>
            </div>
        </>
    )
}

export default InspProjeto;
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


function InspProjeto() {


    const [post, setPost] = useState([])
    const { id_projeto } = useParams()
    const [initialPost, setInitialPost] = useState([])

    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/${id_projeto}`)
            .then((response) => {
                setPost(response.data)

            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )


    function deletePost(id_task) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/tasts/${id_task}`)
        setPost(post.filter(post => post.id_task !== id_task))
    }


    function deletePost(id_pessoa) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
        setPost(post.filter(post => post.id_pessoa !== id_pessoa))
    }

    const handlechange = ({ target }) => {
        if (!target.value) {
            setPost(initialPost)
            return;
        }
        const filter = post.filter(({ nome_projeto }) =>
            nome_projeto.toUpperCase().includes(target.value.toUpperCase()))

        setPost(filter);
    }

    return (
        <>

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
                            <Link to={{ pathname: `/Edit/${post.id_projeto}` }}>
                                <button type="submit">Editar</button>
                            </Link>
                        </div>
                        <div className="btn-excluir-pagina-projeto">
                            <button onClick={() => deletePost(post.id_projeto)} aria-label="share" type="submit" to='/pessoas'>Deletar</button>
                        </div>
                </div>

            </div>




            <div>
                <div>
                    <div >
                        <p style={{ color: '#fff' }}>Username:  {post.nome_projeto} </p>
                    </div>
                </div>


            </div>
        </>
    )
}

export default InspProjeto;
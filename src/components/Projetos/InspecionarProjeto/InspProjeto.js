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

    
 
    return (
        <>


            <div id="geral-card-inspecionar">
                <div id="card-inspecionar">


                   
                    <div >
                        <div >
                            <h4>Detalhes</h4>
                            <div className="line-insp"></div>
                        </div>
                        <div >
                            <p style={{ color: '#fff' }}>Username:  {post.nome_projeto} </p>
                          
                            
                        </div>
                    </div>

                    <div>
                        <div className="btn-editar">
                            <Link to={{ pathname: `/Edit/${post.id_projeto}` }}>
                                <button type="submit">Editar</button>
                            </Link>
                        </div>
                        <div className="btn-excluir">
                            <button onClick={() => deletePost(post.id_projeto)} aria-label="share" type="submit" to='/pessoas'>Deletar</button>
                        </div>
                    </div>
                </div>

               
            </div>
        </>
    )
}

export default InspProjeto;
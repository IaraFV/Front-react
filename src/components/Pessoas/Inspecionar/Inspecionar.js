import React, { useEffect, useState } from "react";
import './inspecionar.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
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
            <div id="card-inspecionar">
                <div id="card-header">
                    <Avatar sx={{ width: '14rem', height: '14rem', fontSize: '8rem' }} aria-label="recipe">A</Avatar>

                </div>
                <div id="nome">
                    <h1>{posts.nome_pessoa}</h1>
                </div>
                <div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Inspecionar;
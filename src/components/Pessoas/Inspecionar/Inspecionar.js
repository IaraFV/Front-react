import React, { useEffect, useState } from "react";
import { Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './inspecionar.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function Inspecionar() {

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
    return (
        <>
            <div id="card-inspecionar">
                <div id="card-header">
                    <Avatar sx={{ width: '10rem', height: '10rem', fontSize:'5rem' }} aria-label="recipe">A</Avatar>
                <h1>{posts.nome_pessoa}</h1>
                </div>

                <CardContent sx={{ color: 'white' }}>
                    <Typography variant="body2" color="white">
                        {posts.funcao_pessoa}
                    </Typography>
                </CardContent>
            </div>
        </>
    )
}

export default Inspecionar;
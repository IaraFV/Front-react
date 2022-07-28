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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Inspecionar() {
    const [equipeEscolhida, setEquipeEscolhida] = useState()
    const childToParent = (childdata) => {
        setEquipeEscolhida(childdata);
        console.log(equipeEscolhida)
    }
    
    const { id_pessoa } = useParams()
    
    let navigate = useNavigate()

     const addPost = data => axios.put(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`, data)
        .then(() => {
            console.log("foi");
            console.log(age);
            navigate("/Pessoas");
        })
        .catch(() => {
            console.log("n foi")
        })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver()
})

    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
        .then((response) => {
            reset(response.data)
        })
    }, [])

    const [age, setAge] = React.useState('');
    const [equipe] = useState([]);
    const handleChange = (event) => {
        setAge(event.target.value);
      };

    return(
        <div>
            <main>
                <div className="card-post">
                    <h1>Editar Cadastro</h1>
                    <div className="line-post"></div>
                    <div className="body-post">
                        <div>
                            <div className="fields">
                                <label>Nome</label>
                                <input type="text" name="nome_pessoa" {...register("nome_pessoa")}/>
                                <p className="error-message">{errors.nome_pessoa?.message} </p>
                            </div>

                            <div className="fields">
                                <label>Função</label>
                                <div name="funcao_pessoa" {...register("funcao_pessoa")}/>
                                <p className="error-message">{errors.funcao_pessoa?.message} </p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Inspecionar;
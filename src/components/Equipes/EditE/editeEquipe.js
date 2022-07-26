import React, { useEffect } from "react";
import { Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";

const validacaoGet = yup.object().shape({
    nome_equipe:  yup.string().required("O nome é obrigatorio!"),

})


function Edite() {

    const { id_equipe } = useParams()

    let navigate = useNavigate()

     const addPost = data => axios.put(`https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/${id_equipe}`, data)
        .then(() => {
            console.log("foi")
            navigate("/equipes");
        })
        .catch(() => {
            console.log("n foi")
        })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validacaoGet)
})

   

    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/${id_equipe}`)
        .then((response) => {
            reset(response.data)
        })
    }, [])


    return(
        <div>
            <IconButton sx={{color: 'white'}}>
                <Link to="/equipes" />
                <ArrowBackIcon/>
            </IconButton>

            <main>
                <div className="card-post">
                    <h1>Editar Cadastro</h1>
                    <div className="line-post"></div>

                    <div className="body-post">

                        <form onSubmit={handleSubmit(addPost)}>

                            <div className="fields">
                                <label>Nome</label>
                                <input type="text" name="nome_equipe" {...register("nome_equipe")}/>
                                <p className="error-message">{errors.nome_equipe?.message} </p>
                            </div>

                            <div className="btn-post">
                                <button type="submit">Cadastrar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Edite;
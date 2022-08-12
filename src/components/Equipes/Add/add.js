import { Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './add.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import React, { useEffect, useState, } from "react";

const validacaoPostE = yup.object().shape({
    nome_equipe:  yup.string().required("O nome equipe é obrigatorio!")
})

function PostE() {

    let navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validacaoPostE)
})

    const addPostE = data => axios.post("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/", data)
    .then(() => {
        console.log("foi")
        navigate("/Equipes");
    })
    .catch(() => {
        console.log("n foi")
    })
    /**função de retorno */
    function voltar() {
        window.history.back();
    }

    const [valuPessoa, setvalue] = React.useState('');
    return(
<>
        <div>
            <IconButton sx={{color: 'white'}} onClick={voltar}>
                <ArrowBackIcon/>
            </IconButton>

            <main>
                <div className="card-post-equipe">
                    <h1>Criar Cadastro</h1>
                    <div className="line-post-equipe"></div>

                    <div className="body-post-equipe">

                        <form onSubmit={handleSubmit(addPostE)}>

                            <div className="fieldsequipe">
                                <label>Nome</label>
                                <input type="text" name="nome_equipe" {...register("nome_equipe")}/>
                                <p className="error-message">{errors.nome_equipe?.message} </p>
                            </div>

                            <div className="btn-post-equipe">
                                <button type="submit">Cadastrar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </main>

        </div>
</>
    )

}

export default PostE;
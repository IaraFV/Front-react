import { Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './add.css'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState, } from "react";
import api from '../../../services/api';
import Avatar from '@mui/material/Avatar';
import { HiUserGroup } from "react-icons/hi";


const validacaoPostE = yup.object().shape({
    nome_equipe: yup.string().required("Campo obrigatorio!"),
})

function PostEquipe() {

    let navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacaoPostE)
    })

    const AdicionaEquipe = data => api.post("/equipes/", data)
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

    return (
        <div>
            <main>
                <div className="card-post-equipe">
                    <div className="card-Avatar">
                        <Avatar id='avatar-eq-pagecadastro'><HiUserGroup style={{ fontSize: '4rem' }} /></Avatar>
                    </div>


                    <div className="body-post-equipe">

                        <form onSubmit={handleSubmit(AdicionaEquipe)}>

                            <div className="fieldsequipe">
                                <label>Nome</label>
                                <input type="text" name="nome_equipe" {...register("nome_equipe")} className="inputgeral" />
                                <p className="error-message">{errors.nome_equipe?.message} </p>
                            </div>
                            <div className="fields">
                                {/* <Verificapessoas/>*/}
                            </div>
                            <div className="btn-post-equipe">
                                <h1 onClick={voltar} id="btn-cancelarE" type='text' >Cancelar</h1>
                                <button type="submit" >Cadastrar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </main>

        </div>
    )
}

export default PostEquipe;
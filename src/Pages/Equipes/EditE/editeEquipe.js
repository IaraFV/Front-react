import React, { useEffect } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './editeEquipe.css'
import { useParams } from 'react-router-dom'
import api from '../../../services/api'
import Avatar from '@mui/material/Avatar';
import { HiUserGroup } from "react-icons/hi";

const validacaoGet = yup.object().shape({
    nome_equipe: yup.string().required("O nome é obrigatorio!")
})

function Edite() {

    const { id_equipe } = useParams()

    const addPost = data => api.put(`/equipes/${id_equipe}`, data)
        .then(() => {
            console.log("foi")
           
        })
        .catch(() => {
            console.log("n foi")
        })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validacaoGet)
    })



    useEffect(() => {
        api.get(`/equipes/${id_equipe}`)
            .then((response) => {
                reset(response.data)
            })
    }, [])
    
    function voltar() {
        window.history.back();
    }

    return (
        <div>
            <main>
                <div className="card-post">
                <div className="card-Avatar">
                        <Avatar id='avatar-eq-pagecadastro'><HiUserGroup style={{ fontSize: '4rem' }} /></Avatar>
                    </div>

                    <div className="body-post">

                        <form onSubmit={handleSubmit(addPost)}>

                            <div className="fields">
                                <label>Nome</label>
                                <input type="text" data-cy="nome_equipe" {...register("nome_equipe")} className="inputgeral"/>
                                <p className="error-message">{errors.nome_equipe?.message} </p>
                            </div>

                            <div className="btn-postt">
                                <button type="submit" onClick={voltar} id="btn-cancelar">cancelar</button>
                                <button type="submit" onClick={voltar} id="btn-cadastrar">Editar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Edite;
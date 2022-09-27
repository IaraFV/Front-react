import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './edit.css'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../services/api';
import Avatar from '@mui/material/Avatar';
import { message } from "antd";

function Edit() {

    const { id_pessoa } = useParams()
    let navegate = useNavigate()
    const validacaoGet = yup.object().shape({
        nome_pessoa: yup.string().required("O nome é obrigatorio!"),
        funcao_pessoa: yup.string().required("A função é obrigatoria"),
        equipe_id: yup.number().required("é obrigatoria"),
    })


    const editPost = data => api.put(`/pessoas/${id_pessoa}`, data)
        .then(() => {
            message.success("Usuario editado!")
            navegate(`/Inspecionar/${id_pessoa}`)
            
        })
        .catch(() => {
            console.log("n foi")
        })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validacaoGet)
    })



    useEffect(() => {
        api.get(`/pessoas/${id_pessoa}`)
            .then((response) => {
                reset(response.data)
            })

        const fetchequipe = async () => {
            try {
                const response = await api.get('/equipes/');
                const data = await response.json();
            } catch (error) {
                console.log(error);
            }
        };
        fetchequipe();
    }, [])


    
    function voltar() {
        window.history.back()
    }

    return (
        <div>
            <main>
                <div className="card-post">
                    <div id="avatar-cadastro-editar">
                        <Avatar src="/broken-image.jpg" id='png-icon-cadastro-editar' />
                    </div>

                    <div className="body-post">
                        <form onSubmit={handleSubmit(editPost)}>

                            <div className="fields">
                                <label>Nome</label>
                                <input type="text" data-cy="nome_pessoa" {...register("nome_pessoa")} className="inputgeral" />
                                <p className="error-message">{errors.nome_pessoa?.message} </p>
                            </div>

                            <div className="fields">
                                <label>Função</label>
                                <input type="text" data-cy="funcao_pessoa" {...register("funcao_pessoa")} className="inputgeral" />
                                <p className="error-message">{errors.funcao_pessoa?.message} </p>
                            </div>

                            

                            <div className="botoes-edit-pessoa">
                                <h1 className="btn-cancelar" onClick={voltar} >Cancelar</h1>
                                <button className="btn-edit"  type="submit">Editar</button>

                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Edit;

/*<div className="fields">
                                <label>Id da Equipe</label>
                                <input type="text" disabled="true" name="nome equipe" {...register("equipe_id")} />
                            </div> */
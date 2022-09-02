import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './edit.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import api from '../../../services/api';

function Edit() {
    
    const { id_pessoa } = useParams()
    const validacaoGet = yup.object().shape({
        nome_pessoa:  yup.string().required("O nome é obrigatorio!"),
        funcao_pessoa: yup.string().required("A função é obrigatoria"),
        equipe_id: yup.number().required("é obrigatoria"),
    })
    
    let navigate = useNavigate()

     const editPost = data => api.put(`/pessoas/${id_pessoa}`, data)
        .then(() => {
            console.log("foi");
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
                const response = await fetch('/equipes/');
                const data = await response.json();

            } catch (error) {
                console.log(error);
            }
        };
        fetchequipe();
    }, [])

    
      function voltar() {
        window.history.back()
        .then((response) => {
            reset(response.data)
        })
    }

    return(
        <div>
            <main>
                <div className="card-post">
                    <h1>Editar Cadastro</h1>
                    <div className="line-post"></div>

                    <div className="body-post">

                        <form onSubmit={handleSubmit(editPost)}>

                            <div className="fields">
                                <label>Nome</label>
                                <input type="text" name="nome_pessoa" {...register("nome_pessoa")}/>
                                <p className="error-message">{errors.nome_pessoa?.message} </p>
                            </div>

                            <div className="fields">
                                <label>Função</label>
                                <input type="text" name="funcao_pessoa" {...register("funcao_pessoa")}/>
                                <p className="error-message">{errors.funcao_pessoa?.message} </p>
                            </div>

                            <div className="fields">
                            <label>Id da Equipe</label>
                                <input type="text" disabled="true" name="nome equipe" {...register("equipe_id")}/>
                            </div>

                            <div className="botoes-edit-pessoa">
                            <button className="btn-cancelar" onClick={voltar} >Cancelar</button>
                            <button className="btn-edit" onClick={voltar} type="submit">Cadastrar</button>
                                
                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Edit;
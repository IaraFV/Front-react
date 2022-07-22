import React, { useEffect } from "react";
import { Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './edit.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";

const validacaoGet = yup.object().shape({
    nome_pessoa:  yup.string().required("O nome é obrigatorio!"),
    funcao_pessoa: yup.string().required("A função é obrigatoria")
})


function Edit() {

    const { id_pessoa } = useParams()

   let navigate = useNavigate()


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validacaoGet)
})

    const addPost = data => axios.put(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`, data)
        .then(() => {
            console.log("foi")
            navigate("/Pessoas");
        })
        .catch(() => {
            console.log("n foi")
        })

    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
        .then((response) => {
            reset(response.data)
        })
    }, [])

    return(
        <div>
            <IconButton sx={{color: 'white'}}>
                <Link to="/Pessoas" />
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
                                <input type="text" name="nome_pessoa" {...register("nome_pessoa")}/>
                                <p className="error-message">{errors.nome_pessoa?.message} </p>
                            </div>

                            <div className="fields">
                                <label>Função</label>
                                <input type="text" name="funcao_pessoa" {...register("funcao_pessoa")}/>
                                <p className="error-message">{errors.funcao_pessoa?.message} </p>
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

export default Edit;
import { Link } from "@mui/material";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './Post.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import ChamaEquipe from "../Edit/ChamaEquipe";

const validacaoPost = yup.object().shape({
    nome_pessoa:  yup.string().required("O nome é obrigatorio!"),
    funcao_pessoa: yup.string().required("A função é obrigatoria")
})

function Post() {

    let navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validacaoPost)
})

    const addPost = data => axios.post("https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/", data)
    .then(() => {
        console.log(addPost)
        navigate("/Pessoas");
    })
    .catch(() => {
        console.log("n foi")
    })

    return(
<>
        <div>
            <IconButton sx={{color: 'white'}}>
                <Link to="/Pessoas" />
                <ArrowBackIcon/>
            </IconButton>

            <main>
                <div className="card-post">
                    <h1>Criar Cadastro</h1>
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

                            <div>
                                <ChamaEquipe/>

                            </div>

                            <div className="btn-post">
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

export default Post;
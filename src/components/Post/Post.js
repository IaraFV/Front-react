import { Link } from "@mui/material";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './Post.css'


const validacaoPost = yup.object().shape({
    nome_pessoa:  yup.string().required("O nome é obrigatorio!").max(40),
    funcao_pessoa: yup.string().required("A função é obrigatoria").max(40),
})

function Post() {

    const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validacaoPost)
})

    const addPost = data => console.log(data)
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
                                <label>Titulo</label>
                                <input type="text" name="nome_pessoa" {...register("nome")}/>
                                <p className="error-message">{errors.nome_pessoa?.message} </p>
                            </div>
                            <div className="fields">
                                <label>Titulo</label>
                                <input type="text" name="funcao" {...register("funcao_pessoa")}/>
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
</>
    )

}

export default Post;
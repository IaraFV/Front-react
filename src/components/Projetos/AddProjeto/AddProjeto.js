import { Link } from "@mui/material";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './AddProjeto.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const validacaoPost = yup.object().shape({
    nome_projeto:  yup.string().required("O nome projeto é obrigatorio!"),
    equipe_id: yup.string().required("A id equipe é obrigatoria"),
    descricao_projeto: yup.string().required("A descrição é obrigatoria")
})

function AddProjeto() {

    let navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validacaoPost)
})

    const addPost = data => axios.post("https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/", data)
    .then(() => {
        console.log("foi")
        navigate("/ProjetosConcluidos");
    })
    .catch(() => {
        console.log("n foi")
    })


    return(
<>
        <div>
            <IconButton sx={{color: 'white'}}>
                <Link to="/ProjetosCnc"><ArrowBackIcon/></Link>
                
            </IconButton>

            <main>
                <div className="card-post">
                    <h1>Criar Cadastro</h1>
                    <div className="line-post"></div>

                    <div className="body-post">

                        <form onSubmit={handleSubmit(addPost)}>

                            <div className="fields">
                                <label>Nome</label>
                                <input type="text" name="nome_projeto" {...register("nome_projeto")}/>
                                <p className="error-message">{errors.nome_projeto?.message} </p>
                            </div>

                            <div className="fields">
                                <label>Id equipe</label>
                                <input type="string" name="equipe_id" {...register("equipe_id")}/>
                                <p className="error-message">{errors.equipe_id?.message} </p>
                            </div>

                            <div className="fields">
                                <label>Descrição</label>
                                <textarea type="text" name="descricao_projeto" {...register("descricao_projeto")}/>
                                <p className="error-message">{errors.descricao_projeto?.message} </p>
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

export default AddProjeto;
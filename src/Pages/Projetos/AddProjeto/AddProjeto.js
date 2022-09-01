import { Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './AddProjeto.css'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const validacaoPost = yup.object().shape({
    nome_projeto: yup.string().required("O nome projeto é obrigatorio!"),
    equipe_id: yup.string().required("A id equipe é obrigatoria"),
    descricao_projeto: yup.string().required("A descrição é obrigatoria")
})

function AddProjeto() {

    let navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacaoPost)
    })

    const addPost = data => api.post("/projetos/", data)
        .then(() => {
            console.log("foi")
            navigate("/ProjetosConcluidos");
        })
        .catch(() => {
            console.log("n foi")
        })

    function voltar() {
        window.history.back();
    }
    const [valueequipe, setvalueequipe] = React.useState('');

    const handleChange = (event) => {
        setvalueequipe(event.target.value);
    };
    const [equipe, setequipe] = useState([]);
    console.log(equipe);
    useEffect(() => {
        api.get(`/equipes`)
            .then((response) => {
                setequipe(response.data)
                console.log('deu certo')
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )

    return (
        <>
            <div>
                <main>
                    <div className="card-post">
                        <h1>Criar Cadastro</h1>
                        <div className="line-post"></div>

                        <div className="body-post">

                            <form onSubmit={handleSubmit(addPost)}>

                                <div className="fields">
                                    <label>Nome</label>
                                    <input type="text" name="nome_projeto" {...register("nome_projeto")} />
                                    <p className="error-message">{errors.nome_projeto?.message} </p>
                                </div>

                                <div className="fields">
                                    <label>nome equipe</label>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel projeto_id="demo-simple-select-label"></InputLabel>
                                            <Select
                                                {...register("equipe_id")}
                                                labelId="demo-simple-select-label"
                                                projeto_id="demo-simple-select"
                                                value={valueequipe}
                                                label="Age"
                                                sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                                onChange={handleChange}>
                                                {
                                                    equipe.map((equipe) => {
                                                        return (
                                                            <MenuItem value={equipe.id_equipe} key={equipe.id_equipe}>{equipe.nome_equipe}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                            <p className="error-message">{errors.nivel?.message} </p>
                                        </FormControl>
                                    </Box>
                                    <p className="error-message">{errors.equipe_id?.message} </p>
                                </div>

                                <div className="fields">
                                    <label>Descrição</label>
                                    <textarea type="text" name="descricao_projeto" {...register("descricao_projeto")} />
                                    <p className="error-message">{errors.descricao_projeto?.message} </p>
                                </div>

                                <div id="chat">
                                    <Link id="butaoC" onClick={voltar}>Cancelar</Link>
                                    <button type="submit" className="butao">Cadastrar</button>
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
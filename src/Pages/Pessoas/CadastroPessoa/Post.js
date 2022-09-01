import { Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './Post.css'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import api from '../../../services/api'
import { BsArrowLeft } from "react-icons/bs";

function PostPessoa() {

    const validacaoPost = yup.object().shape({
        nome_pessoa: yup.string().required("O nome é obrigatorio!"),
        funcao_pessoa: yup.string().required("A função é obrigatoria"),
        equipe_id: yup.number(),
    })

    console.log(new Date().toISOString().replace('T', '').replace('Z', ''));
    let navigate = useNavigate()

    const addPost = data => api.post("/pessoas/", data)
        .then(() => {
            console.log(addPost);
            alert('Cadastrado com sucesso')
            window.location.reload(true);
        })
        .catch(() => {
            console.log("n foi")
        })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacaoPost)
    })
    /*formata a data
    let data = new Date();
    var dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear(); 
    console.log(dataFormatada);*/

    useEffect(() => {
        api.get('/equipes/')
            .then((response) => {
                setequipe(response.data)
                console.log("pegou eq")
            })
            .catch(() => {
                console.log("deu errado eq")
            })
    }, []
    )
    
    function voltar() {
        window.history.back();
    }
    
    const [age, setAge] = React.useState('');
    const [equipe, setequipe] = useState([]);
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <main>
                <div className="card-post">
                    <div className="seta-titulo">
                        <div>
                            <BsArrowLeft onClick={voltar} id="setar" />
                        </div>
                        <h1>Cadastrar Pessoa</h1>
                    </div>
                    <div className="line-post"></div>

                    <div className="body-post">

                        <form onSubmit={handleSubmit(addPost)}>

                            <div className="fields">
                                <label>Nome</label>
                                <input type="text" name="nome_pessoa" {...register("nome_pessoa")} />
                                <p className="error-message">{errors.nome_pessoa?.message} </p>
                            </div>

                            <div className="fields">
                                <label>Função</label>
                                <input type="text" name="funcao_pessoa" {...register("funcao_pessoa")} />
                                <p className="error-message">{errors.funcao_pessoa?.message} </p>
                            </div>

                            <div className="fields">
                                <label>Equipe</label>
                                <Box sx={{ minWidth: 120 }} >
                                    <FormControl fullWidth >
                                        <InputLabel id_equipe="demo-simple-select-label"></InputLabel>
                                        <Select
                                            {...register("equipe_id")}
                                            labelId="demo-simple-select-label"
                                            id_equipe="demo-simple-select"
                                            value={age}
                                            label="Age"
                                            sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                            onChange={handleChange}
                                            >
                                            {equipe.map((equipe) =>
                                                <MenuItem  id="menuEquipe-pagepessoa" value={equipe.id_equipe} key={equipe.id_equipe}>{equipe.nome_equipe}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>

                            <div id="chat">
                                <Link id="butaoC" onClick={voltar}>Cancelar</Link>
                                <button type="submit"  className="butao" >Cadastrar</button>
                            </div>
                    
                </form>

        </div>
                </div >
            </main >
        </div >
    )

}

export default PostPessoa;
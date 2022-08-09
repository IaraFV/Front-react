import { Link } from "@mui/material";
import React, { useEffect, useState, useParams } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './Post.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Post() {

    const validacaoPost = yup.object().shape({
        nome_pessoa: yup.string().required("O nome é obrigatorio!"),
        funcao_pessoa: yup.string().required("A função é obrigatoria"),
        equipe_id: yup.number()
    })

    let navigate = useNavigate()

    const addPost = data => axios.post("https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/", data)
        .then(() => {
            console.log("foi")
        })
        .catch(() => {
            console.log("n foi")
        })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacaoPost)
    })

    useEffect(() => {

        const fetchequipe = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/');
                const data = await response.json();
                setequipe(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchequipe();
    }, [])
    
    function voltar() {
        window.history.back();
    }

    console.log(voltar);
    const [age, setAge] = React.useState('');
    const [equipe, setequipe] = useState([]);
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <main>
                <div className="card-post">
                    <h1>Cadastrar Pessoa</h1>
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
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id_equipe="demo-simple-select-label"></InputLabel>
                                        <Select
                                            {...register("equipe_id")}
                                            labelId="demo-simple-select-label"
                                            id_equipe="demo-simple-select"
                                            value={age}
                                            label="Age"
                                            sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                            onChange={handleChange}>
                                            {equipe.map((equipe) =>
                                                <MenuItem value={equipe.id_equipe} key={equipe.id_equipe}>{equipe.nome_equipe}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>

                            <div className="botoespost">

                                <Link className="btn-cancelar-post" onClick={voltar}>Cancelar</Link>
                            </div>
                            <div className="botoespost">
                                <button className="btn-post" type="submit">Cadastrar</button>
                            </div>
                    
                </form>

        </div>
                </div >
            </main >
        </div >
    )

}

export default Post;
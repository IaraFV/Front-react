import { Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './add.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import React, { useEffect, useState, } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const validacaoPostE = yup.object().shape({
    nome_equipe:  yup.string().required("O nome equipe é obrigatorio!")
    
})

function PostE() {

    let navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validacaoPostE)
})

    const addPostE = data => axios.post("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/", data)
    .then(() => {
        console.log("foi")
        navigate("/Equipes");
    })
    .catch(() => {
        console.log("n foi")
    })
    /**requisição GET do Array Pessoas da api */
    const [pessoa, setpessoa] = useState([]);

    useEffect(() => {
        const fetchequipe = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/');
                const data = await response.json();
                setpessoa(data);
                console.log("deu certo Men")

            } catch (error) {
                console.log(error);
            }
        };
        fetchequipe();
    }, [])
    

    /**função de retorno */
    function voltar() {
        window.history.back();
    }
    /**variavesi do seletor */
    const [valuPessoa, setvalue] = React.useState('');

     /**funçoes de evento das variaves do seletor */
     const handleChange = (event) => {
        setvalue(event.target.value);
    };
    /**manipulação dos dados oriundos de pessoas 
     * Percorre dados de pessoa e retorna as que nao tem equipe */
    const filtrandoPesssoa = pessoa.filter(semEquipe => semEquipe.equipe_id === null);
   
    return(
<>
        <div>
            <IconButton sx={{color: 'white'}} onClick={voltar}>
                <ArrowBackIcon/>
            </IconButton>

            <main>
                <div className="card-post-equipe">
                    <h1>Criar Cadastro</h1>
                    <div className="line-post-equipe"></div>

                    <div className="body-post-equipe">

                        <form onSubmit={handleSubmit(addPostE)}>

                            <div className="fieldsequipe">
                                <label>Nome</label>
                                <input type="text" name="nome_equipe" {...register("nome_equipe")}/>
                                <p className="error-message">{errors.nome_equipe?.message} </p>
                            </div>
                            <div className="fields">
                                <label>pessoas sem equipe</label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel projeto_id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            {...register("nivel")}
                                            labelId="demo-simple-select-label"
                                            projeto_id="demo-simple-select"
                                            value={valuPessoa}
                                            label="Age"
                                            sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                            onChange={handleChange}>
                                            {filtrandoPesssoa.map((pessoas) =>
                                                <MenuItem value={pessoas.id_pessoa} key={pessoas.id_pessoa}>{pessoas.nome_pessoa}</MenuItem>
                                            )}
                                        </Select>
                                        <p className="error-message">{errors.nivel?.message} </p>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className="btn-post-equipe">
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

export default PostE;
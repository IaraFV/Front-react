import { Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './add.css'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState, } from "react";
import api from '../../../services/api'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const validacaoPostE = yup.object().shape({
    nome_equipe: yup.string().required("Campo obrigatorio!"),
})

function PostEquipe() {

    let navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacaoPostE)
    })

    const AdicionaEquipe = data => api.post("/equipes/", data)
        .then(() => {
            console.log("foi")
            navigate("/Equipes");

        })
        .catch(() => {
            console.log("n foi")
        })
    /**requisição GET do Array Pessoas da api 
    const [pessoa, setpessoa] = useState([]);

    useEffect(() => {
       api.get('/pessoas/')
       .then((response) => {
       setpessoa(response.data)
        console.log('FOI')
        })
        .catch(() => {
            console.log("nao foi")
        })
    }, []
    )

    /**função de retorno */
    function voltar() {
        window.history.back();
    }
    /**variavesi do seletor 
    const [valuPessoa, setvalue] = React.useState('');

    /**funçoes de evento das variaves do seletor 
    const handleChange = (event) => {
        setvalue(event.target.value);
    };
    /**manipulação dos dados oriundos de pessoas 
    var filtrandoPesssoa = pessoa.filter(semEquipe => semEquipe.equipe_id === null);

     /** tratamento de erro para uma usuario que esta ou nao dentro de uma equipe/grupo*/
   /* function Verificapessoas() {
        if (filtrandoPesssoa.length === 0) {
            console.log('Não tem pessoas Sem equipe')
        } else {
            return (
                <>
                    <label>pessoas sem equipe</label>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel pessoa_id="demo-simple-select-label"></InputLabel>
                            <Select
                                {...register("nome_pessoa")}
                                labelId="demo-simple-select-label"
                                pessoa_id="demo-simple-select"
                                value={valuPessoa}
                                label="Age"
                                sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                onChange={handleChange}>
                                {filtrandoPesssoa.map((pessoas) =>
                                    <MenuItem id="menuEquipe-pageequipe" value={pessoas.id_pessoa} key={pessoas.id_pessoa}>{pessoas.nome_pessoa}</MenuItem>
                                )}
                            </Select>
                            <p className="error-message">{errors.nivel?.message} </p>
                        </FormControl>
                    </Box>
                </>
            );
        }
    }*/
    return (
        <div>
            <main>
                <div className="card-post-equipe">
                    <h1>Criar Cadastro</h1>
                    <div className="line-post-equipe"></div>

                    <div className="body-post-equipe">

                        <form onSubmit={handleSubmit(AdicionaEquipe)}>

                            <div className="fieldsequipe">
                                <label>Nome</label>
                                <input type="text" name="nome_equipe" {...register("nome_equipe")} />
                                <p className="error-message">{errors.nome_equipe?.message} </p>
                            </div>
                            <div className="fields">
                               {/* <Verificapessoas/>*/}
                            </div>
                            <div className="btn-post-equipe">
                                <button onClick={voltar}  id="btn-cancelarE" type='text' >Cancelar</button>
                                <button type="submit" >Cadastrar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </main>

        </div>
    )
}

export default PostEquipe;
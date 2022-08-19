import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Editprojeto() {
    
    const { id_projeto } = useParams()
    const validacaoGet = yup.object().shape({
        nome_projeto:  yup.string().required("O campo é obrigatorio!"),
        descricao_projeto: yup.string().required("O campo é obrigatorio!"),
        equipe_id: yup.number()
    })
    
    let navigate = useNavigate()

     const editProje = data => axios.put(`https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/${id_projeto}`, data)
        .then(() => {
            console.log("foi");
            alert('cadastro realizado');
        })
        .catch(() => {
            console.log("n foi")
        })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validacaoGet)
})

   

    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/${id_projeto}`)
        .then((response) => {
            reset(response.data)
            setprojeto(response.data)
        })
    }, [])
    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/')
        .then((response) => {
            setequipe(response.data)
        })
    }, [])

    const [age, setAge] = React.useState('');
    const [equipe, setequipe] = useState([]);
    const [projeto, setprojeto] = useState([]);
    
    const getequ = projeto.equipe;

    const handleChange = (event) => {
        setAge(event.target.value);
      };
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
                    <h1>Editar Projeto</h1>
                    <div className="line-post"></div>

                    <div className="body-post">

                        <form onSubmit={handleSubmit(editProje)}>

                            <div className="fields">
                                <label>Nome</label>
                                <input type="text" name="nome_projeto" {...register("nome_projeto")}/>
                                <p className="error-message">{errors.nome_projeto?.message} </p>
                            </div>

                            <div className="fields">
                                <label>descrição</label>
                                <input type="text" name="descricao_projeto" {...register("descricao_projeto")}/>
                                <p className="error-message">{errors.descricao_projeto?.message} </p>
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
                                    sx={{bgcolor: '#fff', borderRadius: '1rem'}}
                                    onChange={handleChange}>
                                    { 
                                        <MenuItem value={getequ?.id_equipe} key={getequ?.id_equipe}>{getequ?.nome_equipe}</MenuItem>
                                    }
                                </Select>
                                </FormControl>
                            </Box>
                            </div>

                            <div className="botoes-edit-pessoa">
                            <button className="btn-cancelar" onClick={voltar} >Cancelar</button>
                            <button className="btn-edit"  type="submit">Cadastrar</button>
                                
                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Editprojeto;
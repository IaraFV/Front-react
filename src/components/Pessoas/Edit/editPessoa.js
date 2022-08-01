import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './edit.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Edit() {
    
    const { id_pessoa } = useParams()
    const validacaoGet = yup.object().shape({
        nome_pessoa:  yup.string().required("O nome é obrigatorio!"),
        funcao_pessoa: yup.string().required("A função é obrigatoria"),
        equipe_id: yup.number()
    })
    
    let navigate = useNavigate()

     const editPost = data => axios.put(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`, data)
        .then(() => {
            console.log("foi");
            navigate("/Pessoas");
        })
        .catch(() => {
            console.log("n foi")
        })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validacaoGet)
})

   

    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
        .then((response) => {
            reset(response.data)
        })

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

    const [age, setAge] = React.useState('');
    const [equipe, setequipe] = useState([]);
    const handleChange = (event) => {
        setAge(event.target.value);
      };

    return(
        <div>
            <main>
                <div className="card-post">
                    <h1>Editar Cadastro</h1>
                    <div className="line-post"></div>

                    <div className="body-post">

                        <form onSubmit={handleSubmit(editPost)}>

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
                                    { equipe.map((equipe) =>
                                        <MenuItem value={equipe.id_equipe} key={equipe.id_equipe}>{equipe.nome_equipe}</MenuItem>
                                    )}
                                </Select>
                                </FormControl>
                            </Box>
                            </div>

                            <div className="botoes-edit-pessoa">
                            <button className="btn-cancelar"  to='/Pessoas'>Cancelar</button>
                            <button className="btn-edit" type="submit">Cadastrar</button>
                                
                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Edit;
import React, { useEffect, useState, useParams } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import './postT.css'
//import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Post() {

    const validacaoPostT = yup.object().shape({
        descricao_task: yup.string().required("O nome é obrigatorio!"),
        equipe_id: yup.number(),
        projeto_id:yup.number(),
        pessoa_id:yup.number()
    })

   /* let navigate = useNavigate()
    navigate("/Inspecionar");*/

    const addpostT = data => axios.post("https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/", data)
        .then(() => {
            console.log("foi")
        })
        .catch(() => {
            console.log("n foi")
        })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacaoPostT)
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

    useEffect(() => {

        const fetchequipe = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/');
                const data = await response.json();
                setpessoa(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchequipe();
    }, [])

    useEffect(() => {

        const fetchequipe = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/');
                const data = await response.json();
                setprojeto(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchequipe();
    }, [])

    function voltar() {
        window.history.back();
    }

    const [age, setAge] = React.useState('');
    const [equipe, setequipe] = useState([]);

    const [agea, setAgea] = React.useState('');
    const [projeto, setprojeto] = useState([]);

    const [ageu, setAgeu] = React.useState('');
    const [Pessoa,setpessoa] = useState([]);
    
    
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleChangea = (event) => {
        setAgea(event.target.value);
    };
    const handleChangeu = (event) => {
        setAgeu(event.target.value);
    };

    return (
        <div>
            <main>
                <div className="card-post">
                    <h1>Cadastrar Task</h1>
                    <div className="line-post"></div>

                    <div className="body-post">

                        <form onSubmit={handleSubmit(addpostT)}>

                            <div className="fields">
                                <label>Descricao</label>
                                <input type="text" name="descricao_task" {...register("descricao_task")} />
                                <p className="error-message">{errors.descricao_task?.message} </p>
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
                            <div className="fields">
                                <label>projeto</label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel projeto_id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            {...register("equipe_id")}
                                            labelId="demo-simple-select-label"
                                            projeto_id="demo-simple-select"
                                            value={agea}
                                            label="Age"
                                            sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                            onChange={handleChangea}>
                                            {projeto.map((projetos) =>
                                                <MenuItem value={projetos.id_projeto} key={projetos.id_projeto}>{projetos.nome_projeto}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className="fields">
                                <label>Pessoa</label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id_pessoa="demo-simple-select-label"></InputLabel>
                                        <Select
                                            {...register("equipe_id")}
                                            labelId="demo-simple-select-label"
                                            id_pessoa="demo-simple-select"
                                            value={ageu}
                                            label="Age"
                                            sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                            onChange={handleChangeu}>
                                            {Pessoa.map((pessoas) =>
                                                <MenuItem value={pessoas.id_pessoa} key={pessoas.id_pessoa}>{pessoas.nome_pessoa}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>

                            <div className="botoespost">
                                
                                <button className="btn-cancelar-post" onClick={voltar}>Cancelar</button>
                                
                                <button className="btn-post" type="submit">Cadastrar</button>

                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    )

}

export default Post;
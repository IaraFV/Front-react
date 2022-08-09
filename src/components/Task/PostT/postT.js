import React, { useEffect, useState, } from "react";
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
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
import TextField from '@mui/material/TextField';

function PostT() {

    const validacaoPostT = yup.object().shape({
        descricao_task: yup.string().required("A descrição é obrigatoria!"),
        projeto_id: yup.number(),
        pessoa: yup.string().required("A pessoa é obrigatoria!"),

    })

    let navigate = useNavigate()

    const addpostT = data => axios.post("https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/", data)
        .then(() => {
            console.log("foi")
            navigate("/task");
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
    /**projeto */
    const [agea, setAgea] = React.useState('');
    const [projeto, setprojeto] = useState([]);
    /*
    /**equipe  */
    const [ageu, setAgeu] = React.useState('');


    /**pessoas*/

    const [pessoa, setpessoa] = useState([]);



    const handleChangea = (event) => {
        setAgea(event.target.value);
    };
    const handleChangeu = (event) => {
        setAgeu(event.target.value);
    };


    const proj = projeto;
    const filt = proj.filter(pro => pro.id_projeto === agea);
    const nomeEquipe = filt.map(p => p.equipe.id_equipe);
    var idEquipe = parseInt(nomeEquipe);

    const l = pessoa;
    const luc = l.filter(lucs => lucs.equipe_id === idEquipe);
    const lucas = luc.map((luc) => luc.nome_pessoa);

    console.log(ageu);
    console.log(agea);
    return (
        <div>
            <main>
                <div className="card-post">
                    <h1>Cadastrar Task</h1>
                    <div className="line-post"></div>

                    <div className="body-post">

                        <form>

                            <div className="fields">
                                <label>Descricao</label>
                                <input type="text" name="descricao_task" {...register("descricao_task")} />
                                <p className="error-message">{errors.descricao_task?.message} </p>
                            </div>

                            <div className="fields">
                                <label>projeto</label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel projeto_id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            projeto_id="demo-simple-select"
                                            value={agea}
                                            label="Age"
                                            sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                            onChange={handleChangea}>

                                                
                                            {projeto.map((projetos) =>
                                                <MenuItem value={projetos.id_projeto} key={projetos.id_projeto}>{projetos.nome_projeto}</MenuItem>
                                            )}
                                        </Select>
                                        <p className="error-message">{errors.projeto_id?.message} </p>
                                    </FormControl>
                                </Box>
                            </div>

                            <div>
                                <label>Pessoa</label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            equipes_id="demo-simple-select"
                                            value={ageu}
                                            label="Age"
                                            sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                            onChange={handleChangeu}>

                                            {lucas.map((equipe) =>
                                                <MenuItem value={equipe} key={equipe}>{equipe}</MenuItem>
                                            )}
                                        </Select>
                                        <p className="error-message">{errors.pessoa_id?.message} </p>
                                    </FormControl>
                                </Box>
                            </div>



                            <div className="botoespost">

                                <button className="btn-cancelar-post" onClick={voltar}>Cancelar</button>

                                <button className="btn-post" type="submit" onClick={addpostT}>Cadastrar</button>

                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    )

}

export default PostT;
/**<div className="fields">
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
                                            {filt.map((equipe) =>
                                                <MenuItem value={equipe.id_equipe} key={equipe.id_equipe}>{equipe.nome_equipe}</MenuItem>
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
                            </div>*/

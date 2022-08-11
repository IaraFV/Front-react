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
        nivel: yup.string().required("O nivel é obrigatoria!"),
        projeto_id: yup.number(),
        pessoa_id: yup.number(),
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
        /**variavesi do seletor */
    const [vofNivel, setAge] = React.useState('');
    const [vofProjeto, setAgea] = React.useState('');
    const [vofPessoa, setVofPessoa] = React.useState('');
    
    /**variaveis dos arr de pessoa e projeto */
    const [projeto, setprojeto] = useState([]);
    const [pessoa, setpessoa] = useState([]);

    
    /**funçoes de evento das variaves do seletor */
    const handleChangea = (event) => {
        setAgea(event.target.value);
    };


    const handleChangeu = (event) => {
        setVofPessoa(event.target.value);
    };


    const handleChange = (event) => {
        setAge(event.target.value);
    };


    /**manipulaçao dos dados oriundos do arr de projetos(array geral)*/
    const proj = projeto;
    const filtro_statusProjet = proj.filter( statusPro => statusPro.status === "Em desenvolvimento");
    const filt = filtro_statusProjet.filter(pro => pro.id_projeto === vofProjeto);
    const nomeEquipe = filt.map(p => p.equipe.id_equipe);
    
    /**pega a a variavel (nomeEquipe que vem como string e muda para intero)*/
    var idEquipe = parseInt(nomeEquipe);
    
    /**manioulaçao do dados oriundos do arr de pessoas(array geral)*/
    const l = pessoa;
    const luc = l.filter(lucs => lucs.equipe_id === idEquipe);
    


    //console.log(luc);
    //console.log(nomeEquipe);
    console.log(filt);
    console.log(filtro_statusProjet);
    
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
                                <label>nivel</label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel projeto_id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            {...register("nivel")}
                                            labelId="demo-simple-select-label"
                                            projeto_id="demo-simple-select"
                                            value={vofNivel}
                                            label="Age"
                                            sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                            onChange={handleChange}>
                                            <MenuItem value={'facil'} key={'facil'}>facil</MenuItem>
                                            <MenuItem value={'medio'} key={'medio'}>medio</MenuItem>
                                            <MenuItem value={'dificil'} key={'dificil'}>dificil</MenuItem>

                                        </Select>
                                        <p className="error-message">{errors.nivel?.message} </p>
                                    </FormControl>
                                </Box>
                            </div>

                            <div className="fields">
                                <label>projeto</label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel projeto_id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            {...register("projeto_id")}
                                            labelId="demo-simple-select-label"
                                            projeto_id="demo-simple-select"
                                            value={vofProjeto}
                                            label="Age"
                                            sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                            onChange={handleChangea}>


                                            {filtro_statusProjet.map((projetos) =>
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
                                            {...register("pessoa_id")}
                                            labelId="demo-simple-select-label"
                                            equipes_id="demo-simple-select"
                                            value={vofPessoa}
                                            label="Age"
                                            sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                            onChange={handleChangeu}>

                                            {luc.map((nomePessoa) =>
                                                <MenuItem value={nomePessoa.id_pessoa} key={nomePessoa.id_pessoa}>{nomePessoa.nome_pessoa}</MenuItem>
                                            )}
                                        </Select>
                                        <p className="error-message">{errors.pessoa_id?.message} </p>
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

export default PostT;
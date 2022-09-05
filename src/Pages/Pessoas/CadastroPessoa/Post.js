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
import { Select } from 'antd';
import api from '../../../services/api'
import 'antd/dist/antd.css';

function PostPessoa() {

    const validacaoPost = yup.object().shape({
        nome_pessoa: yup.string().required("O nome é obrigatorio!"),
        funcao_pessoa: yup.string().required("A função é obrigatoria"),
        equipe_id: yup.number(),
    })

    let navigate = useNavigate()

    const addPost = data => api.post("/pessoas/", data)
        .then(() => {
            console.log(addPost);
            alert('Cadastrado com sucesso')
            window.location.href = '/Pessoas';
        })
        .catch(() => {
            console.log("n foi")
        })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacaoPost)
    })



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


    const [age, setAge] = useState('');
    const [equipe, setequipe] = useState([]);

    const onChange = (value) => {
        setAge(value);
    };




    const { Option } = Select;

    const onSearch = (value) => {
        console.log('search:', value);
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
                                <input type="text" name="nome_pessoa" {...register("nome_pessoa")} className="inputgeral" />
                                <p className="error-message">{errors.nome_pessoa?.message} </p>
                            </div>

                            <div className="fields">
                                <label>Função</label>
                                <input type="text" name="funcao_pessoa" {...register("funcao_pessoa")} className="inputgeral" />
                                <p className="error-message">{errors.funcao_pessoa?.message} </p>
                            </div>

                            <div className="fields">
                                <label>Equipe</label>
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onSearch={onSearch}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                    onChange={onChange}
                                    value={age}
                                    style={{ width: '21vw'}}
                                    size={"large"}
                                >
                                    <>
                                        {equipe.map((equipe) =>
                                            <Option id="menuEquipe-pagepessoa" value={equipe.id_equipe} key={equipe.id_equipe}>{equipe.nome_equipe}</Option>
                                        )}
                                    </>


                                </Select>
                            </div>

                            <div id="chat">
                                <Link id="butaoC" onClick={voltar}>Cancelar</Link>
                                <button type="submit" className="btn-post button" >Cadastrar</button>
                            </div>

                        </form>

                    </div>
                </div >
            </main >
        </div >
    )

}

export default PostPessoa;
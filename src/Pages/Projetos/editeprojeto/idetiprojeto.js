import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useParams } from 'react-router-dom'
import api from '../../../services/api'
import { Link } from 'react-router-dom';

function Editprojeto() {

    //variaves das requisições GET
    const [projeto, setprojeto] = useState([]);
    const { id_projeto } = useParams()

    const validacaoGet = yup.object().shape({
        nome_projeto: yup.string().required("O campo é obrigatorio!"),
        descricao_projeto: yup.string().required("O campo é obrigatorio!"),
        equipe_id: yup.number()
    })

    //função de PUT de projeto
    const editProje = data => api.put(`/projetos/${id_projeto}`, data)
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

    //faz um get no array geral e retorna um projeto expecifico
    useEffect(() => {
        api.get(`/projetos/${id_projeto}`)
            .then((response) => {
                reset(response.data)
                setprojeto(response.data)
            })
    }, [])

    //função de voltar uma(1) pagina
    function voltar() {
        window.history.back()
    }

    return (
        <>
            <main>
                <div className="card-post">
                    <h1>Editar Projeto</h1>
                    <div className="line-post"></div>
                    <div className="body-post">
                        <form onSubmit={handleSubmit(editProje)}>
                            <div className="fields">
                                <label>Nome</label>
                                <input type="text" name="nome_projeto" {...register("nome_projeto")} />
                                <p className="error-message">{errors.nome_projeto?.message} </p>
                            </div>
                            <div className="fields">
                                <label>descrição</label>
                                <input type="text" name="descricao_projeto" {...register("descricao_projeto")} />
                                <p className="error-message">{errors.descricao_projeto?.message} </p>
                            </div>
                            <div className="fields">
                                <label>Id da Equipe</label>
                                <input type="text" disabled="true" name="nome equipe" {...register("equipe_id")} />
                            </div>
                            <div className="botoes-edit-pessoa">
                                <Link to={{ pathname: '/InspProjeto/' + `${id_projeto}` }}>
                                    <button className="btn-cancelar" >Cancelar</button>
                                </Link>
                                <button className="btn-edit" type="submit">Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Editprojeto;
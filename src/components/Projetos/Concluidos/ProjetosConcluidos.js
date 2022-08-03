import axios from "axios";
import React from "react";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import './Projetos.css';
import { Link } from 'react-router-dom';
import { BsFillFlagFill } from "react-icons/bs";
import Avatar from '@mui/material/Avatar';

function Projetos() {

    const [posts, setPosts] = useState([])
    const [initialPosts, setInitialPosts] = useState([])

    function voltar() {
        window.history.back();
    }
    
    //get projetos
    const [post, setpost] = useState([])
    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/')
            .then((response) => {
                setpost(response.data)
            }).catch(() => {
                console.log("Deu BO Men")
            })
    }, [])


    //filter status
    const meuNovopost = post.filter((valorAtual) => {
        return valorAtual.status.includes("Em planejamento")
    })
    console.log(meuNovopost);



    //filter pesquisa
    const handlechange = ({ target }) => {
        if (!target.value) {
            setPosts(initialPosts)
            return;
        }
        const filter = posts.filter(({ nome_pessoa }) =>
            nome_pessoa.toUpperCase().includes(target.value.toUpperCase()))

        setPosts(filter);
    }

    

    return (

        <>

            <div id="card-header-titulo-projeto">
                <div id="componente-header-titulo">
                    <h1>Projetos</h1>
                    <div id="filtro-Projeto">
                        <input id="filter-projeto" type={"text"} placeholder="Exemplo: Seu Ze..." onChange={handlechange}></input>

                    </div>
                </div>

            </div>

            <div className="geralprojetoc">
                {post.map((post, key) => {
                    return (

                        <>
                            <div id="projetocard" style={{ border: 'none', padding: '1%' }}>
                                <div style={{ width: '23rem', height: '14rem', marginRight: '2%', background: '#21222D', borderRadius: '0.7rem', padding: '3%' }} key={key}>

                                    <div id="status">
                                        {post.status}
                                    </div>


                                    <div id="nome-projeto">
                                        {post.nome_projeto}
                                    </div>

                                    <div id="data-inicio">
                                        <div><BsFillFlagFill/></div>
                                        {post.data_inicio}
                                    </div>


                                    <div id="descricao">
                                        <p id="titulodesc">Descrição</p>
                                        <p id="corpodesc">It is a long established fact that a reader will be distracted by the readable{post.descricao_projeto}</p>
                                    </div>

                                    <div id="container-membros">
                                        <p id="membros">Membros</p>
                                        <Avatar  id="avatar-membros-equipes-projetos" sx={{ fontSize: '0.8rem', width: '30%', height: '1.2rem', marginTop: '-18%' }}>N</Avatar>
                                    </div>

                                </div>


                            </div>

                        </>


                    );

                })}
            </div>



        </>


    );

}

export default Projetos;
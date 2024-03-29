import React, { useState, useEffect } from "react";
import './Equipe.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import { BsPeople } from "react-icons/bs";
import Tilt from 'react-vanilla-tilt';
import api from '../../../services/api';

function Equipe() {
    /*---------------------------------------VARIAVEIS DOS GETs-------------------------------------------------*/
    const [posts, setPosts] = useState([])
    const [initialPosts, setInitialPosts] = useState([])

    /*---------------------------------------GET EQUIPE-------------------------------------------------*/
    useEffect(() => {
        api.get('/equipes/')
            .then((response) => {
                setPosts(response.data)
                setInitialPosts(response.data)
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    alert("É preciso fazer login")
                    window.location.href = '/';
                } else alert("erro inesperado")
                console.log("deu errado")
            })
    }, []
    )
console.log(posts)
    /*----------------------------------------FILTRO----------------------------------------------------*/
    const handlechange = ({ target }) => {
        if (!target.value) {
            setPosts(initialPosts)
            return;
        }
        const filter = posts.filter(({ nome_equipe }) =>
            nome_equipe.toUpperCase().includes(target.value.toUpperCase()))

        setPosts(filter);
    }

    return (
        <div>
            <div id="cabecario-equipe">
                <div id="filtroebtn-page-equipe">
                    <h1 id="page-equipe-nome" style={{ color: '#fff' }}>Equipes Cadastradas</h1>
                    <div>
                        <input id="filtro-equipe" type={"text"} placeholder="Exemplo: Seu Ze..." onChange={handlechange}></input>
                    </div>
                </div>
            </div>
            <div >
                <Link to="/AdicionarEquipe">
                    <button className="btn-adicionarequipe">Criar Equipe</button>
                </Link>
            </div>
            <div id="just-equipes">
                <div id="geraleq" >
                    {
                        posts.map((posts, key) => {
                            return (
                                <div className="cardequipe" key={key.id_equipe}>
                                    <Tilt style={{ background: '#171821' }}>
                                        <Link id="link-pagina-prin-equipe" to={{ pathname: `/InspecionarEqui/${posts.id_equipe}` }}>
                                            <div id="card-prin-eq">
                                                <div id="icon-nomeequipe-pegeequipe">
                                                    <BsPeople id="icon-group-page-equipes" />
                                                    <div id="nome-equipe-pege-equioe">{posts.nome_equipe}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </Tilt>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Equipe;
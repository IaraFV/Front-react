import React, { useState, useEffect } from "react";
import './Equipe.css';
import axios from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { FiSearch } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";

function Equipe() {

    const [posts, setPosts] = useState([])
    const [initialPosts, setInitialPosts] = useState([])

    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/')
            .then((response) => {
                setPosts(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )

    const handlechange = ({ target }) => {
        if (!target.value) {
            setPosts(initialPosts)
            return;
        }
        const filter = posts.filter(({ nome_pessoa }) =>
            nome_pessoa.toUpperCase().includes(target.value.toUpperCase()))

        setPosts(filter);
    }

    function deletePost(id_equipe) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/${id_equipe}`)
        setPosts(posts.filter(post => post.id_equipe !== id_equipe))
    }


    return (
        <div >
            <div>
                <div id="informativo">
                    <h1 id="titlepessoa" style={{ color: '#fff', marginLeft: '5%', marginTop: '4%' }}>Equipes Cadastradas</h1>

                    <div id="filtroebtnl">
                        <Link to="/Add">
                            <button className="btn-adicionarequipe">Adicionar Equipe +</button>
                        </Link>
                        <div id="filtror">
                            <input type={"text"} placeholder="Exemplo: Seu Ze..." onChange={handlechange}></input>
                            <FiSearch style={{ marginLeft: "196%", color: "#E9C46A", marginTop: "-27%" }} />
                        </div>
                    </div>

                    <p style={{ color: '#fff', display: 'flex', justifyContent: 'flex-end', marginTop: '-2%', marginRight: '1%' }}></p>
                </div>

                <div id="geraleq">
                    {
                        posts.map((posts, key) => {

                            return (
                                <div className="cardequipe">

                                    <Link id="link-eq" to={{ pathname: `/InspecionarEqui/${posts.id_equipe}` }}>

                                        <div id="card-prin-eq">
                                            <div id="icon-nomeequipe-pegeequipe">
                                                <BsPeople id="icon-group-page-equipes" />
                                                <div id="nome-equipe-pege-equioe">{posts.nome_equipe}</div>
                                            </div>

                                        </div>

                                    </Link>




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
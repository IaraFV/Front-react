import React, { useState, useEffect } from "react";
import './Equipe.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";
import Tilt from 'react-vanilla-tilt';


function Equipe() {

    const [posts, setPosts] = useState([])
    const [initialPosts, setInitialPosts] = useState([])

    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/')
            .then((response) => {
                setPosts(response.data)
                setInitialPosts(response.data)
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
                <Link to="/Add">
                    <button className="btn-adicionarequipe">Adicionar Equipe +</button>
                </Link>

            </div>
            <div id="just-equipes">
                <div id="geraleq" >
                    {
                        posts.map((posts, key) => {

                            return (

                                
                                <div  className="cardequipe">
                                    <Tilt style={{ background: '#171821' }}>
                                    <Link id="link-eq" to={{ pathname: `/InspecionarEqui/${posts.id_equipe}` }}>

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
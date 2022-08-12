import React, { useState, useEffect } from "react";
import './Pessoas.css';
import axios from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";

function Pessoas() {

    const [posts, setPosts] = useState([])
    const [initialPosts, setInitialPosts] = useState([])


    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/')
            .then((response) => {
                setPosts(response.data)
                setInitialPosts(response.data);

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
    const nome = posts.map((nom) => nom.nome_pessoa);
    //const letra = nome.map((letr) => letr.charAt(0));
    console.log(nome);

    function stringAvatar(nome) {
        console.log(nome);
        return {
            sx: {
                width: '4rem', height: '4rem', fontSize: '3rem'
            },
            children: `${nome.charAt(0)}`,
        };
    }

    return (
        <div >
            <div>


                <div id="div-geral-do-cab-pessoas">
                    <div id="cabecario-page-pessoas">
                        <div id="titulo-pessoa-filtro">
                            <div>
                                <h1 id="titlepessoa">
                                    Cadastro de Pessoas
                                </h1>
                            </div>
                            <div id="filtro">
                                <input type={"text"} placeholder="Exemplo: Seu Ze..." onChange={handlechange}></input>
                            </div>

                            <div id="btn-page-pessoa">
                                <Link to="/Post">
                                    <AiOutlinePlus className="btn-adicionarpessoa"></AiOutlinePlus>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="geralpessoas">
                    {
                        posts.map((posts, key) => {

                            return (
                                <div className="cardpessoas">
                                    <Link className="link-eq" to={{ pathname: `/Inspecionar/${posts.id_pessoa}` }}>

                                        <Card container id="card-pessoa-page" spacing={2} sx={{ width: 360, bgcolor: '#21222D' }} key={key} >

                                            <CardContent sx={{ color: 'white' }}>
                                                <Typography id="sub-title-nome-pessoa" color="white">
                                                    {posts.funcao_pessoa}
                                                </Typography>

                                                <Typography>
                                                    <div id="avatar-page-pessoa">
                                                        <Avatar id="avatar-pessoa" {...stringAvatar(`${nome}`)} />
                                                    </div>

                                                </Typography>
                                                <Typography id="title-nome-pessoa">
                                                    {
                                                        posts.nome_pessoa
                                                    }
                                                </Typography>

                                                <Typography id="data-contratacao">
                                                    {
                                                        posts.data_contratacao
                                                    }
                                                </Typography>


                                            </CardContent>

                                        </Card>
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

export default Pessoas;
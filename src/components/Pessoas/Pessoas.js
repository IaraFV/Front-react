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
                //bgcolor: stringToColor(name),
                width: '14rem', height: '14rem', fontSize: '8rem'
            },
            children: `${nome.split(' ')[0][0]}`,
        };
    }
    
    return (
        <div >
            <div>
                <div id="informativo">
                    <h1 id="titlepessoa" style={{ color: '#fff', marginLeft: '5%', marginTop: '4%' }}>Cadastro de Pessoas</h1>
                    <div id="usuarios">
                        <Avatar sx={{ bgcolor: [500] }} aria-label="recipe">
                            i
                        </Avatar>
                        <Avatar sx={{ bgcolor: [500] }} aria-label="recipe">
                            f
                        </Avatar>
                        <Avatar sx={{ bgcolor: [500] }} aria-label="recipe">
                            v
                        </Avatar>
                    </div>

                    <div id="filtroebtn">

                        <Link to="/Post">
                            <button className="btn-adicionarpessoa">Adicionar Pessoa</button>
                        </Link>
                        <div id="filtro">
                            <input type={"text"} placeholder="Exemplo: Seu Ze..." onChange={handlechange}></input>
                            <FiSearch style={{ marginLeft: "196%", color: "#E9C46A", marginTop: "-27%" }} />
                        </div>

                    </div>




                    <p style={{ color: '#fff', display: 'flex', justifyContent: 'flex-end', marginTop: '-2%', marginRight: '1%' }}></p>
                </div>
                <div id="geralpessoas">
                    {
                        posts.map((posts, key) => {

                            return (
                                <div className="cardpessoas">
                                    <Card container spacing={2} sx={{ width: 345, bgcolor: '#21222D', color: 'white' }} key={key} >
                                        <CardHeader className="titlecinco"
                                            avatar={<Avatar {...stringAvatar(`${nome}`)} />}

                                            action={
                                                <IconButton aria-label="settings" >
                                                    <Link to={{ pathname: `/Inspecionar/${posts.id_pessoa}` }}><VisibilityIcon
                                                        sx={{ color: '#FFFFFF', marginTop: '-108%' }} /></Link>
                                                </IconButton>
                                            }

                                            title={
                                                posts.nome_pessoa
                                            }
                                        />

                                        <CardContent sx={{ color: 'white' }}>
                                            <Typography variant="body2" color="white">
                                                {posts.funcao_pessoa}
                                            </Typography>
                                        </CardContent>
                                    </Card>
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
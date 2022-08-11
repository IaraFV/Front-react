import axios from "axios";
import React, { useState, useEffect } from "react";
import './Home.css'
import teste from './img/undraw_Code_typing_re_p8b9-removebg-preview.png'
import { ClipboardCheckFill, FileEarmarkFill, PeopleFill, } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card'
import { Graf } from "../Graficos/graf";
import { Graf2 } from "../Graficos/graf2";
import { Link } from 'react-router-dom';
import { AiOutlineArrowsAlt } from "react-icons/ai";
import Avatar from '@mui/material/Avatar';
import { BsFlagFill } from "react-icons/bs";

function Home() {

    const [post, setpost] = useState([])

    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/')
            .then((response) => {
                setpost(response.data)
                console.log("Deu certo men")
            }).catch(() => {
                console.log("Deu BO Men")
            })
    }, [])

    const recebeprojetos = post.filter(getstatus => getstatus.status === "Concluído");
    
/**função para implementar o mais breve pocivel
 * NÃO APAGAR!!!!!!!!!!!!!!!!!!
 * OBS: o codigo abaixo é apenas um esboso.
 * 
 * const carros = ["Civic", "Elantra", "Focus", "Jetta", "Cruze", "Corolla",'ferrari','lamborghini','bugatti','fusca'];
 * 
 * var lucas = [];
 * for (var pos = 0; pos < 6; pos++) {
         lucas.push(carros[pos])
}
         console.log(lucas)
 */
    return (
        <>
            <div id="imginicio" ><img src={teste} alt=" " width={'10%'} /></div>
            <div id="container">
                <h1 id="h1" style={{ color: '#FFF' }} >Olá,</h1>
                <h5 style={{ color: '#A0A0A0' }}>Bem-vindo a segunda fase do desafio!</h5>
            </div>

            <div id="geral">

                <div id="cards" style={{ background: '#21222D' }}>
                    <div id="cardum" style={{ background: '#171821' }}>
                        <PeopleFill id="iconpeoplefill" color="beige" size={60} />

                        <Link to="/Pessoas"><p id="sabermais">Saber mais</p></Link>

                        <p id="amarelo">Total de pessoas<br />adicionadas ate hoje:</p>
                        <h3>300 +</h3>
                    </div>

                    <div id="carddois" style={{ background: '#171821' }}><FileEarmarkFill id="iconprojeto" color="beige" size={52} />
                        <Link to="/Projetos"><p id="sabermais">Saber mais</p></Link>
                        <p id="amarelo">Total de projetos<br />adicionadas ate hoje:</p>
                        <h3>300 +</h3>
                    </div>
                    <div id="cardtres" style={{ background: '#171821' }}><ClipboardCheckFill id="iconpeople" color="beige" size={56} />
                        <Link to="/Task"><p id="sabermais">Saber mais</p></Link>
                        <p id="amarelo">Total de Task's<br />adicionadas ate hoje:</p>
                        <h3>300 +</h3>
                    </div>
                </div>

                <div id="tabela" style={{ background: '#21222D' }}>
                    <h1>Task's </h1>

                    <Graf2 />
                </div>
            </div>

            <div id="geraltwo">
                <div id="progress" style={{ background: '#21222D' }}>
                    <h1>Projetos</h1>
                    <h5>Concluídos</h5>
                    <div id="concluidas">
                        {
                            recebeprojetos.map((status,key) => {
                                return (
                                    <div id="div-card-page-projetosH">
                                        <Card id="div-card-projetoH">
                                            <Card.Body>
                                                <Card.Title id="nome-projeto-planH" key={key}>
                                                    {status.nome_projeto}

                                                    <div>
                                                        <Link to={{ pathname: `/InspProjeto/${status.id_projeto}` }}>
                                                            <AiOutlineArrowsAlt id="more-button-planejamentoH" />
                                                        </Link>
                                                    </div>

                                                </Card.Title>


                                                <Card.Text id="statusH">
                                                    {status.status}
                                                </Card.Text>

                                                <Card.Text id="bandeira-dataH">
                                                    <div><BsFlagFill /></div>
                                                    <div>{status.data_inicio}</div>
                                                </Card.Text>

                                                <Card.Text>
                                                    <div id="titulo-descricao-projetoH">Descrição</div>
                                                    <div id="corpo-descricao-projetoH">
                                                        {status.descricao_projeto}
                                                    </div>
                                                </Card.Text>

                                                <Card.Text>
                                                    <div id="titulo-descricao-projetof">Membros</div>
                                                    <div id="membros-projetoH">
                                                        <Avatar id="avatar-projeto-membro-eqH" />
                                                    </div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                );
                            })
                        }
                    </div>

                </div>
                <div id="pc" style={{ background: '#21222D' }}>
                    <h2>Pessoas</h2>
                    <h5>Pessoas adicionadas no período de uma semana</h5>
                    <Graf />
                </div>
            </div>

        </>

    );
}
export default Home;
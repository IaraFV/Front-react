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
import { BsPeople } from "react-icons/bs";
import { GoFile } from "react-icons/go";
import { GoGraph } from "react-icons/go";
import {CalendarComponent} from "./Calendario/calendar";

function Home() {

    const [value, onChange] = useState(new Date());

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

    /**função para implementar o mais breve pocivel (lucas se escreve possível e não pocivel)
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

            <div id="graficoecards">
                <div id="geral">

                    <div id="cards" style={{ background: '#21222D' }}>
                        <div id="cardum" style={{ background: '#171821' }}>
                            <Link to="/Pessoas" className="sabermais">
                                <p >Saber mais</p>
                            </Link>
                            <BsPeople id="iconpeoplefill" color="beige" size={60} />

                            <p className="amarelo" id="totalp1">Total de pessoas adicionadas ate hoje:</p>
                            <h3>300 +</h3>
                        </div>

                        <div id="carddois" style={{ background: '#171821' }}>
                            <Link to="/Projetos" className="sabermais">
                                <p>Saber mais</p>
                            </Link>
                            <GoFile id="FiFile" color="beige" size={52} />

                            <p className="amarelo" id="totalp2">Total de projetos<br />adicionadas ate hoje:</p>
                            <h3>300 +</h3>
                        </div>
                        <div id="cardtres" style={{ background: '#171821' }}>
                            <Link to="/Task" className="sabermais"><p >Saber mais</p></Link>
                            <GoGraph id="icontask-pagehome" color="beige" size={56} />

                            <p className="amarelo" id="totalp3" >Total de Task's adicionadas ate hoje:</p>
                            <h3>300 +</h3>
                        </div>
                    </div>


                </div>

                <div id="graf2">
                    <CalendarComponent/>
                </div>
            </div>

            <div id="geral-graficoum">
                <h2>Projetos</h2>
                <Graf id="graficoum-page-home" />
            </div>

            <div id="projetos-concluidos-page-home">
                <h3>Projetos</h3>

                <div id="just-card-projetos-page-home">
                    <div id="card-projeto-pagina-home">
                        {
                            recebeprojetos.map((status, key) => {
                                return (
                                    <>
                                        <div id="nome-projeto-pagina-homep"> {status.nome_projeto}</div>
                                        <div id="data-projeto-pagehome">{status.data_inicio}</div>
                                    </>

                                );
                            })
                        }
                    </div>


                </div>

            </div>



        </>

    );
}
export default Home;
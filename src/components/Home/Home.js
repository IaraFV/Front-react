import axios from "axios";
import React, { useState, useEffect } from "react";
import './Home.css'
import { Graf } from "../Graficos/graf";
import { Link } from 'react-router-dom';
import { BsPeople } from "react-icons/bs";
import { GoFile } from "react-icons/go";
import { GoGraph } from "react-icons/go";
import { CalendarComponent } from "./Calendario/calendar";
import { FaCircle } from "react-icons/fa";

function Home() {

    const [post, setpost] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [posts, setPosts] = useState([]);
    const [initialPosts, setInitialPosts] = useState([]);
    const [setInitialTasks] = useState([])

    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/')
            .then((response) => {
                setpost(response.data)
                console.log("Deu certo men")
            }).catch(() => {
                console.log("Deu BO Men")
            })
    }, [])

    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/')
            .then((response) => {
                setPosts(response.data)
                setInitialPosts(response.data)
                console.log("foi")

            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )

    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/')
            .then((response) => {
                setTasks(response.data)
                setInitialTasks(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )



    const recebeprojetos = post.filter(getstatus => getstatus.status === "Concluído");

    const contapessoa = posts;
    const totalpessoas = contapessoa.length;

    const contaprojetos = post;
    const totalprojetos = contaprojetos.length;

    const contatask = tasks;
    const totaltask = contatask.length;
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

            <div class="container" style={{ border: '1px solid blue' }} id="Card-container-pagina-home">
                <div class="row align-items-start" >
                    <div class="col-6 col-md-4" id="card-projeto-pagina-home">
                        {
                            recebeprojetos.map((status, key) => {
                                return (
                                    <>
                                        <div><FaCircle/></div>
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

/*<div id="cards" style={{ background: '#21222D' }}>
                        <div id="cardum" style={{ background: '#171821' }}>
                            <Link to="/Pessoas" className="sabermais">
                                <p >Saber mais</p>
                            </Link>
                            <BsPeople id="iconpeoplefill" color="beige" size={60} />

                            <p className="amarelo" id="totalp1">Total de pessoas adicionadas ate hoje:</p>
                            <h3>{totalpessoas}</h3>
                        </div>

                        <div id="carddois" style={{ background: '#171821' }}>
                            <Link to="/Projetos" className="sabermais">
                                <p>Saber mais</p>
                            </Link>
                            <GoFile id="FiFile" color="beige" size={52} />

                            <p className="amarelo" id="totalp2">Total de projetos<br />adicionadas ate hoje:</p>
                            <h3>{totalprojetos}</h3>
                        </div>
                        <div id="cardtres" style={{ background: '#171821' }}>
                            <Link to="/Task" className="sabermais"><p >Saber mais</p></Link>
                            <GoGraph id="icontask-pagehome" color="beige" size={56} />

                            <p className="amarelo" id="totalp3" >Total de Task's adicionadas ate hoje:</p>
                            <h3>{totaltask}</h3>
                        </div>
                    </div> 




<div id="projetos-concluidos-page-home">
                <div id="title-card-projeto-paginahome">Projetos Concluidos</div>

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



<div id="geral-graficoum">
                <Graf id="graficoum-page-home" />
            </div>
*/
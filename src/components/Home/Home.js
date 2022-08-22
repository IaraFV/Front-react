import axios from "axios";
import React, { useState, useEffect } from "react";
import './Home.css'
import Grafico2 from "../Graficos/Grafico2"
import { Link, useParams } from 'react-router-dom';
import { AiOutlineUser, AiOutlineSolution, AiOutlineTeam, AiOutlineFile } from "react-icons/ai";

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




    //const recebetodaspessoas = posts;
    var receber = [];
    for (var person = 0; person < 8; person++) {
        receber.push(posts[person])
    }

    const nome = receber.map((luc) => luc?.nome_pessoa);

    const recebeprojetos = post.filter(getstatus => getstatus.status === "Concluído");

    const contapessoa = posts;
    const totalpessoas = contapessoa.length;

    const contaprojetos = post;
    const totalprojetos = contaprojetos.length;

    const contatask = tasks;
    const totaltask = contatask.length;

    return (
        <>

            <div class="container">
                <div class="row">
                    <div class="col-12 col-sm-12">

                        <div class="row justify-content-evelyn" id="caixa-geral-home" >
                            <div class="container" id="caixa-geral-projetos-home" >
                                <div class="row" >
                                    <div class="card" id="render-projetos-conc-home" >
                                        <div class="card-body">
                                            <div id="header-card-projeto-pagina-home" class="card-title">Atividades recentes</div>
                                            <p class="card-text"></p>
                                        </div>
                                        <ul class="list-group list-group-flush" >
                                            <li class="list-group-item" id="ul-card">
                                                {
                                                    recebeprojetos.map((status, key) => {
                                                        return (
                                                            <>
                                                                {status.nome_projeto}

                                                            </>

                                                        );
                                                    })
                                                }
                                                <button id="btn-ver-mais-projeto">Ver mais</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                            </div>


                            <div class="col-9" id="container-geral-dois-home">
                                <div class="container">
                                    <div class="row" id="col1-quant">
                                        <div class="col-6 col-sm-4" id="card-quant-pessoa">
                                            <div id="cont-quant-pessoa">
                                                <div >
                                                    <AiOutlineUser id="icon-quant-pessoa-home" />
                                                </div>
                                                <div id="total-pessoas-page-home">{totalpessoas}</div>
                                                <div>Total de pessoas adiconadas</div>
                                            </div>
                                        </div>

                                        <div class="col-6 col-sm-4" id="card-quant-projetos">
                                            <div id="cont-quant-projetos">
                                                <div >
                                                    <AiOutlineSolution id="icon-quant-projetos-home" />
                                                </div>
                                                <div id="total-projetos-page-home">{totalprojetos}</div>
                                                <div>Total de projetos adiconadas</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" id="col2-quant">
                                        <div class="col-6 col-sm-4" id="card-quant-equipes">
                                            <div id="cont-quant-equipes">
                                                <div >
                                                    <AiOutlineTeam id="icon-quant-equipes-home" />
                                                </div>
                                                <div id="total-equipes-page-home">{totalpessoas}</div>
                                                <div>Total de equipes adiconadas</div>
                                            </div>

                                        </div>
                                        
                                        <div class="col-6 col-sm-4" id="card-quant-task">
                                            <div id="cont-quant-task">
                                                <div >
                                                    <AiOutlineFile id="icon-quant-task-home" />
                                                </div>
                                                <div id="total-task-page-home">{totalpessoas}</div>
                                                <div>Total de tarefas adiconadas</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>



                        </div>



                    </div>


                    <div class="w-100 d-none d-md-block"></div>
                    <div class="row">
                        <div class="col-12 col-sm-12">
                            <div class="row justify-content-between" id="caixa-dois-home" >
                                <div class="col-2">
                                    <div class="col-6 col-sm-4">
                                        <div class="row" id="geral-graficoum">
                                            <div class="col-6 col-sm-4">
                                                <Grafico2 />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="col-2">

                                    <div class="col-6 col-sm-4" id="sla">
                                        <div class="card" id="render-pessoas-home">
                                            <div class="card-body">
                                                <h5 class="card-title" id="titulo-card-usuario-home">
                                                    Usuarios
                                                    <button id="btn-ver-usuario-projeto">Ver Usuarios</button>
                                                </h5>
                                                <h6 class="card-subtitle mb-2 text-muted"></h6>
                                                <ul class="list-group list-group-flush" id="ul-pessoa">
                                                    {
                                                        nome.map((nome) => {
                                                            return (
                                                                <>
                                                                    <li class="list-group-item" id="li-pessoa">{nome}</li>
                                                                </>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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


<div class="col-2" style={{ border: '1px solid red' }} id="container-geralum">

                    <div class="row align-items-start" >
                        <div id="header-card-projeto-pagina-home">Projetos Concluidos</div>
                        <div class="col-4 " id="card-projeto-pagina-home">
                            {
                                recebeprojetos.map((status, key) => {
                                    return (
                                        <>
                                            <div id="icon-status"><FaCircle /></div>
                                            <div id="nome-projeto-pagina-homep"> {status.nome_projeto}</div>
                                            <div id="data-projeto-pagehome">{status.data_inicio}</div>
                                        </>

                                    );
                                })
                            }
                        </div>
                    </div>


                </div>

*/
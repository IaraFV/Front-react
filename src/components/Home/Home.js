import axios from "axios";
import React, { useState, useEffect } from "react";
import './Home.css'
import Grafico2 from "../Graficos/Grafico2"
import { Link, useParams } from 'react-router-dom';

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

                        <div class="row justify-content-evelyn" id="caixa-geral-home" style={{ border: '1px solid' }}>
                            <div class="container" id="caixa-geral-projetos-home" style={{ border: '1px solid' }}>
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
                                        <div class="col-6 col-sm-4" id="card-quant-pessoa">.col-sm-5 .col-md-6</div>
                                        <div class="col-6 col-sm-4" id="card-quant-projetos">.col-sm-5 .offset-sm-2 .col-md-6 .offset-md-0</div>
                                    </div>

                                    <div class="row" id="col2-quant">
                                        <div class="col-6 col-sm-4" id="card-quant-equipes">.col-sm-6 .col-md-5 .col-lg-6</div>
                                        <div class="col-6 col-sm-4" id="card-quant-task">.col-sm-6 .col-md-5 .offset-md-2 .col-lg-6 .offset-lg-0</div>
                                    </div>
                                </div>



                            </div>



                        </div>



                    </div>


                    <div class="w-100 d-none d-md-block"></div>
                    <div class="row">
                        <div class="col-12 col-sm-12">
                            <div class="row justify-content-between" id="caixa-dois-home" style={{ border: '1px solid' }}>
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

                                    <div class="col-6 col-sm-4" id="sla" style={{ border: '1px solid' }}>
                                        <div class="card" id="render-pessoas-home">
                                            <div class="card-body">
                                                <h5 class="card-title">Usuarios</h5>
                                                <h6 class="card-subtitle mb-2 text-muted"></h6>
                                                <ul class="list-group list-group-flush" >
                                                    {
                                                        nome.map((nome) => {
                                                            return (
                                                                <>
                                                                    <li class="list-group-item">{nome}</li>
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
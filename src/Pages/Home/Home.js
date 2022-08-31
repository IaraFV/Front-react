import axios from "axios";
import React, { useState, useEffect } from "react";
import './Home.css'
import Grafico2 from "../../Components/Graficos/Grafico2"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineUser, AiOutlineSolution, AiOutlineTeam, AiOutlineFile } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import api from '../Login/services/api';

function Home() {
    let navigate = useNavigate();
    const [projeto, setprojeto] = useState([]);
    const [tasks, setTask] = useState([]);
    const [pessoas, setPessoas] = useState([]);
    const [equipes, setEquipes] = useState([]);
    const [setInitialPessoas] = useState([]);
    
    useEffect(() => {
        api.get('/projetos/')
            .then((response) => {
                setprojeto(response.data)
            }).catch(() => {
                console.log("Deu BO Men no projeto")
            })
    }, [])

    useEffect(() => {
        api.get('/pessoas/')
            .then((response) => {
                setPessoas(response.data)

            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )

    useEffect(() => {
        api.get('/equipes/')
            .then((response) => {
                setEquipes(response.data)
                
            })
            .catch(() => {
                console.log("deu errado eq")
            })
    }, []
    )

    useEffect(() => {
        api.get('/tasks/')
            .then((response) => {
                setTask(response.data)
            })
            .catch(() => {
                console.log("deu errado task")
            })
    }, []
    )

    //const recebetodaspessoas = projetos;
    var receber = [];
    for (var person = 0; person < 8; person++) {
        receber.push(pessoas[person])
    }
    //pega 8 projetos concluidos os mais resentes
    const recebeprojetos = projeto.filter(getstatus => getstatus.status === "Concluído");

    var receberProj = [];
    for (var pega = 0; pega < 8; pega++) {
        receberProj.push(recebeprojetos[pega]);
    }
  
    /* for (var persone = 0; persone < 8; person++) {
         recebere.push(projeto[persone])
     }*/
    const nome = receber.map((luc) => luc?.nome_pessoa);



    const totalpessoas = pessoas.length;

    const totalprojetos = projeto.length;

    const totaltask = tasks.length;
    const totalequipes = equipes.length;


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <div className="row justify-content-evelyn" id="caixa-geral-home-um">
                            <div className="container" id="caixa-geral-projetos-home">
                                <div className="row" >
                                    <div className="card" id="render-projetos-conc-home">
                                        <div className="card-body">
                                            <h5 id="header-card-projeto-pagina-home" className="card-title">Atividades recentes</h5>
                                            <p className="card-text"></p>
                                        </div>
                                        <ul className="list-group list-group-flush" id="ul-projeto">
                                            {
                                                recebeprojetos.map((status) => {
                                                    return (
                                                        <>
                                                            <li className="list-group-item" id='li-projeto'>{status.nome_projeto}
                                                                <Link id="link-pessoa-page-pessoa" to={"/ProjetosConcluidos"}>
                                                                    <button id="btn-ver-mais-projeto" >Ver mais</button>
                                                                </Link>
                                                            </li>
                                                        </>
                                                    );
                                                })
                                            }


                                        </ul>
                                    </div>
                                </div>

                            </div>

                            <div className="col-9" id="container-geral-dois-home">
                                <div className="container">
                                    <div className="row" id="col1-quant">
                                        <div className="col-6 col-sm-4" id="card-quant-pessoa">
                                            <div id="cont-quant-pessoa">
                                                <div >
                                                    <AiOutlineUser id="icon-quant-pessoa-home" />
                                                </div>
                                                <div id="total-pessoas-page-home">{totalpessoas}</div>
                                                <div className="colorfff">Total de pessoas adiconadas</div>
                                            </div>
                                        </div>

                                        <div className="col-6 col-sm-4" id="card-quant-projetos">
                                            <div id="cont-quant-projetos">
                                                <div >
                                                    <AiOutlineSolution id="icon-quant-projetos-home" />
                                                </div>
                                                <div id="total-projetos-page-home">{totalprojetos}</div>
                                                <div className="colorfff">Total de projetos adiconadas</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" id="col2-quant">
                                        <div className="col-6 col-sm-4" id="card-quant-equipes">
                                            <div id="cont-quant-equipes">
                                                <div >
                                                    <AiOutlineTeam id="icon-quant-equipes-home" />
                                                </div>
                                                <div id="total-equipes-page-home">{totalequipes}</div>
                                                <div className="colorfff">Total de equipes adiconadas</div>
                                            </div>

                                        </div>

                                        <div className="col-6 col-sm-4" id="card-quant-de-tasks">
                                            <div id="container-quantidade-task">
                                                <div >
                                                    <BsBarChartLine id="icon-quant-task-page-home" />
                                                </div>
                                                <div id="total-de-tasks-pagina-home-h">{totaltask}</div>
                                                <div className="colorfff">Total de tarefas adiconadas</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-100 d-none d-md-block"></div>
                    <div className="row">
                        <div className="col-12 col-sm-12">
                            <div className="row justify-content-between" id="caixa-dois-home">
                                <div className="col-2">
                                    <div className="col-6 col-sm-4">
                                        <div className="row" id="geral-graficoum">
                                            <div className="col-6 col-sm-4">
                                                <Grafico2 pessoas={pessoas} />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-2">
                                    <div className="col-6 col-sm-4" id="sla">
                                        <div className="card" id="render-pessoas-home" >
                                            <div className="card-body">
                                                <h5 className="card-title" id="titulo-card-usuario-home">
                                                    Usuarios
                                                    <Link id="link-pessoa-page-pessoa" to={"/Pessoas"}>
                                                        <button id="btn-ver-usuario-projeto">Ver Usuarios</button>
                                                    </Link>
                                                </h5>
                                                <h6 className="card-subtitle mb-2 text-muted"></h6>
                                                <ul className="list-group list-group-flush" id="ul-pessoa">
                                                    {
                                                        nome.map((nome) => {
                                                            return (
                                                                <>
                                                                    <li className="list-group-item" id="li-pessoa">{nome}</li>
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
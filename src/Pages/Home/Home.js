import React, { useState, useEffect } from "react";
import "./Home.css";
import Grafico2 from "../../Components/Graficos/Grafico2";
import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineSolution,
  AiOutlineTeam,
} from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import api from "../../services/api";
import nenhumprojeto from "../../assets/NenhumProjeto/Group 1000004639.png";
import { Empty } from "antd";
function Home() {
  //variaves das requisições GET
  const [projeto, setprojeto] = useState([]);
  const [tasks, setTask] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [equipes, setEquipes] = useState([]);

  //get do array geral de projetos
  useEffect(() => {
    api
      .get("/projetos/")
      .then((response) => {
        setprojeto(response.data);
      })
      .catch(() => {
        console.log("Deu BO Men no projeto");
      });
  }, []);

  //get do array geral de pessoas
  useEffect(() => {
    api
      .get("/pessoas/")
      .then((response) => {
        setPessoas(response.data);
      })
      .catch(() => {
        console.log("deu errado pessoa");
      });
  }, []);
  //get do array geral de equipe
  useEffect(() => {
    api
      .get("/equipes/")
      .then((response) => {
        setEquipes(response.data);
      })
      .catch(() => {
        console.log("deu errado equipe");
      });
  }, []);
  //get do array geral de tasks
  useEffect(() => {
    api
      .get("/tasks/")
      .then((response) => {
        setTask(response.data);
      })
      .catch(() => {
        console.log("deu errado task");
      });
  }, []);

  //função de FOR, pega 8 pessoas recem Add
  var receberPeople = [];
  for (var person = 0; person < 8; person++) {
    receberPeople.push(pessoas[person]);
  }
  const nomepeople = receberPeople.map((luc) => luc?.nome_pessoa);

  //função de FOR, pega 8 projetos concluidos
  const recebeprojetos = projeto.filter(
    (getstatus) => getstatus.status === "Concluído"
  );
  var receberProj = [];
  for (var pega = 0; pega < 8; pega++) {
    receberProj.push(recebeprojetos[pega]);
  }

  //contadores das variaveis
  const totalpessoas = pessoas.length;
  const totalprojetos = projeto.length;
  const totaltask = tasks.length;
  const totalequipes = equipes.length;

  //Manipulação da variavel da função FOR
  const recebe = receberProj.filter((get) => get === "undefined");
  const valida = recebe.length;

  //função de verificação de erro
  function Apresentaproj() {
    if (valida === 0) {
      return (
        <>
          <img
            src={nenhumprojeto}
            alt=" "
            width={"23%"}
            style={{ marginLeft: "38%", marginTop: "6%" }}
          />
        </>
      );
    } else {
      {
        recebeprojetos.map((status) => {
          return (
            <>
              <li className="list-group-item" id="li-projeto">
                {status.nome_projeto}
                <Link id="link-pessoa-page-pessoa" to={"/ProjetosConcluidos"}>
                  <button id="btn-ver-mais-projeto">Ver mais</button>
                </Link>
              </li>
            </>
          );
        });
      }
    }
  }

  return (
    <>
      <div id="caixa-geral-home-um">
        <div id="projeto-geralcont">
          <div id="caixa-geral-projetos-home">a</div>

          <div id="format-cards-contadores">
            <div className="body-card-home-pro">
              <div className="org">
                <div>{totalpessoas}</div>
                <div>
                  <AiOutlineUser className="icon-quant-pessoa-home" />
                </div>
                <div className="colorfff">Total de pessoas adiconadas</div>
              </div>
            </div>

            <div className="body-card-home-pro">
              <div className="org">
                <div>{totalpessoas}</div>
                <div>
                  <AiOutlineUser className="icon-quant-pessoa-home" />
                </div>
                <div className="colorfff">Total de pessoas adiconadas</div>
              </div>
            </div>

            <div className="body-card-home-pro">
              <div className="org">
                <div>{totalpessoas}</div>
                <div>
                  <AiOutlineUser className="icon-quant-pessoa-home" />
                </div>
                <div className="colorfff">Total de pessoas adiconadas</div>
              </div>
            </div>

            <div className="body-card-home-pro">
              <div className="org">
                <div>{totalpessoas}</div>
                <div>
                  <AiOutlineUser className="icon-quant-pessoa-home" />
                </div>
                <div className="colorfff">Total de pessoas adiconadas</div>
              </div>
            </div>
          </div>

          <div id="projeto-geralcontdois">
            <div id="geral-graficoum">
              <Grafico2 pessoas={pessoas} />
            </div>

            <div className="card" id="render-pessoas-home">
              <div className="card-body">
                <h5 className="card-title" id="titulo-card-usuario-home">
                  Usuarios
                  <Link id="link-pessoa-page-pessoa" to={"/Pessoas"}>
                    <button id="btn-ver-usuario-projeto">Ver Usuarios</button>
                  </Link>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted"></h6>
                <ul className="list-group list-group-flush" id="ul-pessoa">
                  {nomepeople.map((nome) => {
                    return (
                      <>
                        <li className="list-group-item" id="li-pessoa">
                          {nome}
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;

/*

 <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <div className="row justify-content-evelyn" id="caixa-geral-home-um">
                            <div className="container" id="caixa-geral-projetos-home">
                                <div className="row" >
                                    <div className="card" id="render-projetos-conc-home">
                                        <div className="card-body">
                                            <h5 id="header-card-projeto-pagina-home" className="card-title">Ultimos projetos Concluidos</h5>
                                            <p className="card-text"></p>
                                        </div>
                                        <ul className="list-group list-group-flush" id="ul-projeto">
                                            <Apresentaproj/>
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

                                        <div className="col-6 col-sm-4" id="card-quant-pessoa">
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
                                                        nomepeople.map((nome) => {
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
*/

import React, { useState, useEffect } from "react";
import "./Home.css";
import Grafico2 from "../../Components/Graficos/Grafico2";
import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineSolution,
  AiOutlineTeam,
} from "react-icons/ai";
import { BsBarChartLine, BsCircleFill } from "react-icons/bs";
import api from "../../services/api";
import {
  CardP,
  CardTitle,
  CardBody,
  OrgCard,
  CardTextData,
  TituloHome,
} from "./style";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Comment } from "antd";

function Home(props) {
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

  console.log(pessoas);
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
  for (var person = 0; person < 4; person++) {
    receberPeople?.push(pessoas[person]);
  }

  //função de FOR, pega 8 projetos concluidos
  const recebeprojetos = projeto.filter(
    (getstatus) => getstatus.status === "Concluído"
  );
  var receberProj = [];
  for (var pega = 0; pega < 7; pega++) {
    receberProj.push(recebeprojetos[pega]);
  }

  //contadores das variaveis
  const totalpessoas = pessoas.length;
  const totalprojetos = projeto.length;
  const totaltask = tasks.length;
  const totalequipes = equipes.length;

  function formdata(data) {
    let Data = new Date(data);
    return Data.toLocaleDateString("pt-BR");
  }

  //função de verificação de erro
  function Apresentaproj() {
    return (
      <>
        <TituloHome>
          Projetos <span style={{ color: "#2684FF" }}>Concluidos</span>
        </TituloHome>
        <OrgCard>
          {receberProj.map((receberProj, key) => {
            return (
              <>
                <li style={{ listStyle: "none" }}>
                  <CardP>
                    <CardBody>
                      <CardTitle>{receberProj?.nome_projeto}</CardTitle>

                      <CardTextData>
                        <div>
                          Data de conclusão:
                          {formdata(receberProj?.data_inicio)}
                        </div>
                      </CardTextData>
                    </CardBody>
                  </CardP>
                </li>
              </>
            );
          })}
        </OrgCard>
      </>
    );
  }

  return (
    <>
      <div id="caixa-geral-home-um">
        <div id="projeto-geralcont">
          <div>
            <Apresentaproj />
          </div>
          <div id="format-cards-contadores">
            <div>
              <div className="body-card-home-pro">
                <div className="org">
                  <div>
                    <AiOutlineUser className="icon-quant-pessoa-home" />
                  </div>
                  <div className="total-page-home">{totalpessoas}</div>

                  <div className="white">Total de pessoas adiconadas</div>
                </div>
              </div>

              <div className="body-card-home-pro">
                <div className="org">
                  <div>
                    <AiOutlineSolution className="icon-quant-pessoa-home" />
                  </div>
                  <div className="total-page-home">{totalprojetos}</div>
                  <div className="white">Total de projetos adiconadas</div>
                </div>
              </div>
            </div>

            <div>
              <div className="body-card-home-pro">
                <div className="org">
                  <div>
                    <AiOutlineTeam className="icon-quant-pessoa-home" />
                  </div>
                  <div className="total-page-home">{totalequipes}</div>
                  <div className="white">Total de equipes adiconadas</div>
                </div>
              </div>

              <div className="body-card-home-pro">
                <div className="org">
                  <div>
                    <BsBarChartLine className="icon-quant-pessoa-home" />
                  </div>
                  <div className="total-page-home">{totaltask}</div>

                  <div className="white">Total de tarefas adiconadas</div>
                </div>
              </div>
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
                Usuarios cadastrados
              </h5>

              <h6 className="card-subtitle mb-2 text-muted"></h6>

              <ul className="list-group list-group-flush" id="ul-pessoa">
                {receberPeople?.map((nome) => {
                  return (
                    <>
                      <li className="list-group-item" id="li-pessoa">
                        <Avatar size="large" icon={<UserOutlined />} />
                        <div id="org-lista">
                          <div id="ava-date">
                            <span> {nome?.nome_pessoa}</span>
                            <div style={{ color: "#717986" }}>
                              {formdata(nome?.data_contratacao)}
                            </div>
                          </div>
                          <div>
                            <Link id="link-pessoa-page-pessoa" to={"/Pessoas"}>
                              <button id="btn-ver-usuario-projeto">
                                Ver mais
                              </button>
                            </Link>
                          </div>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;

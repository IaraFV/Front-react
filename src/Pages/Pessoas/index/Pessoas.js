import React, { useState, useEffect } from "react";
import "./Pessoas.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import imagemerro from "../../../assets/TratamentoDeErroNaoEncontrado/itensNaoencontrados.png";
import api from "../../../services/api";

function Pessoas() {
  const [pessoas, setpessoas] = useState([]);
  const [initialpessoas, setInitialpessoas] = useState([]);

  useEffect(() => {
    api
      .get("/pessoas/")
      .then((response) => {
        setpessoas(response.data);
        setInitialpessoas(response.data);
        console.log("foi");
      })
      .catch((err) => {
        if (err.response.status == 401) {
          alert("É preciso fazer login");
          window.location.href = "/";
        } else alert(err.message);
      });
  }, []);

  const handlechange = ({ target }) => {
    if (!target.value) {
      setpessoas(initialpessoas);
      return;
    }
    const filter = pessoas.filter(({ nome_pessoa }) =>
      nome_pessoa.toUpperCase().includes(target.value.toUpperCase())
    );

    setpessoas(filter);
  };

  const nome = pessoas.map((nom) => nom.nome_pessoa);

  function stringAvatar(nome) {
    return {
      sx: {
        width: "4rem",
        height: "4rem",
        fontSize: "3rem",
      },
      children: `${nome[0]}`,
    };
  }

  const pessoasnum = parseInt(pessoas.length);

  function formdata(data) {
    let Data = new Date(data);
    return Data.toLocaleDateString("pt-BR")
  }

  function TratamentoError() {
    if (pessoasnum === 0) {
      return (
        <h2>
          <img src={imagemerro} alt=" " className="img_formatacao" />
        </h2>
      );
    } else {
      return (
        <>
          {pessoas.map((pessoas, key) => {
            return (
              <>
                <div className="cardpessoas">
                  <Link
                    id="link-pessoa-page-pessoa"
                    to={{ pathname: `/Inspecionar/${pessoas.id_pessoa}` }}
                  >
                    <Card
                      container
                      id="card-pessoa-page"
                      spacing={2}
                      sx={{ width: 360, bgcolor: "#21222D" }}
                      key={key}
                    >
                      <CardContent sx={{ color: "white" }}>
                        <Typography id="sub-title-nome-pessoa" color="white">
                          {pessoas.funcao_pessoa}
                        </Typography>
                        <Typography>
                          <div id="avatar-page-pessoa">
                            <Avatar
                              id="avatar-pessoa"
                              {...stringAvatar(`${nome}`)}
                            />
                          </div>
                        </Typography>
                        <Typography id="title-nome-pessoa">
                          {pessoas.nome_pessoa}
                        </Typography>
                        <Typography id="data-contratacao">
                          {formdata(pessoas.data_contratacao)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </>
            );
          })}
        </>
      );
    }
  }
  

  return (
    <>
      <div id="cabecario-p">
        <div id="filtroebtn-page-p">
          <h1 id="page-nomep" style={{ color: "#fff" }}>
            Cadastro de Pessoas
          </h1>
          <div>
            <input
              id="filtro-p"
              type={"text"}
              placeholder="Exemplo: Seu Ze..."
              onChange={handlechange}
            ></input>
          </div>
        </div>
      </div>
      <div id="geral-btn-cad-pessoa">
        <Link to="/PostPessoa">
          <button className="btn-adicionarp">Criar Cadastro</button>
        </Link>
      </div>
      <div id="geralpessoas">
        <TratamentoError />
      </div>
    </>
  );
}
export default Pessoas;

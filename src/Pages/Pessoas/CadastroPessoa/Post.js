import { Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Post.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import api from "../../../services/api";
import { message } from "antd";
import Avatar from "@mui/material/Avatar";

function PostPessoa() {
  let navigate = useNavigate();

  const validacaoPost = yup.object().shape({
    nome_pessoa: yup.string().required("O nome é obrigatorio!"),
    funcao_pessoa: yup.string().required("A função é obrigatoria"),
    equipe_id: yup.number(),
  });

  const addPost = (data) =>
    api
      .post("/pessoas/", data)
      .then(() => {
        message.success("Usuario cadastrado!");
        navigate("/Pessoas");
      })
      .catch(() => {
        message.error("Ocorreu algum erro e o usuario não foi cadastrado!");
      });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacaoPost),
  });

  useEffect(() => {
    api
      .get("/equipes/")
      .then((response) => {
        setequipe(response.data);
      })
      .catch(() => {});
  }, []);

  function voltar() {
    window.history.back();
  }

  const [age, setAge] = React.useState("");
  const [equipe, setequipe] = useState([]);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <main>
        <div className="card-post">
          <div id="avatar-cadastrar-users">
            <Avatar id="png-icon-cadastrodepessoas" />
          </div>

          <div className="body-post">
            <form onSubmit={handleSubmit(addPost)}>
              <div className="fields">
                <label>Nome</label>
                <input
                  type="text"
                  name="nome_pessoa"
                  {...register("nome_pessoa")}
                  className="inputgeral"
                />
                <p className="error-message">{errors.nome_pessoa?.message} </p>
              </div>

              <div className="fields">
                <label>Função</label>
                <input
                  type="text"
                  name="funcao_pessoa"
                  {...register("funcao_pessoa")}
                  className="inputgeral"
                />
                <p className="error-message">
                  {errors.funcao_pessoa?.message}{" "}
                </p>
              </div>

              <div className="fields">
                <label>Equipe</label>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id_equipe="demo-simple-select-label"></InputLabel>
                    <Select
                      className="inputgeral"
                      {...register("equipe_id")}
                      labelId="demo-simple-select-label"
                      id_equipe="demo-simple-select"
                      value={age}
                      label="Age"
                      sx={{
                        bgcolor: "rgba(33, 34, 45, 0.5)",
                        borderRadius: "6px",
                        color: "white",
                      }}
                      onChange={handleChange}
                    >
                      {equipe.map((equipe) => (
                        <MenuItem
                          id="menuEquipe-pagepessoa"
                          value={equipe.id_equipe}
                          key={equipe.id_equipe}
                        >
                          {equipe.nome_equipe}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <div id="chat">
                <Link id="butaoC" onClick={voltar}>
                  Cancelar
                </Link>
                <button type="submit" className="btn-post button">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PostPessoa;

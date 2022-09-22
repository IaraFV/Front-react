import "./InspecionarEqui.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import imagemerro from "./img/falta_de_dados.png";
import api from "../../../services/api";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { BsTrash } from "react-icons/bs";
import { message } from "antd";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BsEyeFill } from "react-icons/bs";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-40%, -40%)',
  width: 400,
  bgcolor: 'rgba(16, 16, 20, 0.5)',
  border: '2px solid #000',
  p: 4,
  color: '#fff'
};

function InspecionarEquipe() {
  const [equipe, setequipe] = useState([]);
  const [pessoa, setpessoa] = useState([]);
  const [projeto, setprojeto] = useState([]);
  const { id_equipe } = useParams();
  let navigate = useNavigate();

  /*------------------------------------------------------------------------------GET EQUIPE--------------------------------------------------------------------*/
  useEffect(() => {
    api
      .get(`/equipes/${id_equipe}`)
      .then((response) => {
        setequipe(response.data);
      })
      .catch(() => {
        console.log("deu errado");
      });
  }, []);

  /*-------------------------------------------------------------GET NO PROJETO ESPECÍFICO DA EQUIPE------------------------------------------------------------*/

  useEffect(() => {
    api
      .get("/equipes/" + id_equipe + "/projetos")
      .then((response) => {
        setprojeto(response.data);
      })
      .catch(() => {
        console.log("deu errado");
      });
  }, []);

  /*------------------------------------------------------------------GET NOS MEMBROS DA EQUIPE----------------------------------------------------------------*/

  useEffect(() => {
    api
      .get("/pessoas/")
      .then((response) => {
        setpessoa(response.data);
      })
      .catch(() => {
        console.log("deu errado");
      });
  }, []);

  /*-------------------------------------------------------------FUNCAO PARA DELETAR A EQUIPE ESPECIFICA------------------------------------------------------------*/
  function deleteEquipe(id_equipe) {
    api.delete(`/equipes/${id_equipe}`);
    setequipe(equipe.filter((post) => post.id_equipe !== id_equipe));

    setTimeout(() => navigate("/Equipes"), 1000);
  }

  /*-------------------------------------------------------------FUNCAO DE 'SLICE' PARA PEGAR A PRIMEIRA LETRA DO NOME DA EQUIPE------------------------------------------------------------*/
  function stringAvatar(name) {
    return {
      sx: {
        width: "14rem",
        height: "14rem",
        fontSize: "8rem",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  function Voltar() {
    window.history.back();
  }

  /*---------------------------------------------------------------------------------MANIPULAÇÃO DO ARRAY DE EQUIPE--------------------------------------------------------------------------*/
  const nome = equipe.nome_equipe;
  const getId_equipe = equipe.id_equipe;
  var INTid_equipe = parseInt(getId_equipe);

  /*----------------------------------------------COM A MANIPULAÇÃO DO ARRAY DE EQUIPE AGORA É FILTRADO OS NOMES DOS MEMBROS------------------------------------------------------------------*/
  const ArrGeral_pessoas = pessoa;
  /*-------------------------------------------------------NESSA PARTE É FILTRADO AS PESSOAS COM BASE NO ID DA EQUIPE ORIUNDO DO INTID_EQUIPE-------------------------------------------------*/
  const filtrandoPessoas = ArrGeral_pessoas.filter(
    (pessoa_eque) => pessoa_eque.equipe_id === INTid_equipe
  );
  const inicialLetra = filtrandoPessoas.map((letraini) => letraini.nome_pessoa);
  const recebe = inicialLetra.map((l) => l.charAt(0));

  /*----------------------------------------------------------------------------------AQUI É CALCULADO O TOTAL DE MEMBROS---------------------------------------------------------------------*/
  const totalmember = inicialLetra.length;

  /*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
  var [selecproj, setselecproj] = useState('')
  
  function Selector() {
    
    const handleChangeselec = (e) => setselecproj(e.target.value);

    return (
      <>
        <Box sx={{ minWidth: 120, marginTop:3 ,color: '#fff'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selecproj}
          label="Age"
          className="seletor-format"
          onChange={handleChangeselec}
        >
            <MenuItem value={''}>none</MenuItem>
            <MenuItem value={'Em planejamento'}>Em planejamento</MenuItem>
            <MenuItem value={'Em desenvolvimento'}>Em desenvolvimento</MenuItem>
            <MenuItem value={'Concluído'}>Concluído</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </>
    )
  }
  function Goinspecionar(id_projeto){
    if(id_projeto != 0){
      navigate(`/InspProjeto/${id_projeto}`)
    }
  }
  function Cardplaneja(){

    const getstatusplaneja = projeto?.filter((get) => get.status === selecproj)

    if(getstatusplaneja.length === 0){
      return(
        <>
          <h2>
            <img src={imagemerro} alt=" deu bom" width={"53%"} style={{ marginLeft: "18%", marginTop:'10%'}}/>
          </h2>
        </>
      )
    }else{
        return(
          <>
          <div id="caixa-geral-de-projetos-inspequipe">
          {getstatusplaneja?.map((projeto, key) => {
            return (
              <div>
                <Card id="card-page-inpequipe">
                  <Card.Body className="format-projet-equi">
                    <Card.Text id="status-projeto-isnpequipe" key={key.id_projeto}>
                      {projeto.nome_projeto}
                    </Card.Text>
                    <BsEyeFill onClick={() => Goinspecionar(projeto.id_projeto)}/>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>

          </>
        )
      }
  }
  function Carddesenvov(){

      const getstatusdesenvolve = projeto?.filter((get) => get.status === selecproj)
      
      if(getstatusdesenvolve.length === 0){
        return(
          <>
            <h2>
              <img src={imagemerro} alt=" deu bom" width={"53%"} style={{ marginLeft: "18%", marginTop:'10%'}}/>
            </h2>
          </>
        )
      }else{
          return(
            <>
            <div id="caixa-geral-de-projetos-inspequipe">
            {getstatusdesenvolve?.map((projeto, key) => {
              return (
                <div>
                  <Card id="card-page-inpequipe">
                    <Card.Body className="format-projet-equi">
                      <Card.Text id="status-projeto-isnpequipe" key={key.id_projeto}>
                        {projeto.nome_projeto}
                      </Card.Text>
                      <BsEyeFill onClick={() => Goinspecionar(projeto.id_projeto)}/>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
          </>
          )
        }
  }
  function Cardconcluido(){
        const getstatusconcluido = projeto?.filter((get) => get.status === selecproj)
        
        if(getstatusconcluido.length === 0){
          return(
            <>
              <h2>
                <img src={imagemerro} alt=" deu bom" width={"53%"} style={{ marginLeft: "18%", marginTop:'10%'}}/>
              </h2>
            </>
          )
        }else{
            return(
              <>
              <div id="caixa-geral-de-projetos-inspequipe">
              {getstatusconcluido?.map((projeto, key) => {
                return (
                  <div>
                    <Card id="card-page-inpequipe">
                      <Card.Body className="format-projet-equi">
                            <Card.Text id="status-projeto-isnpequipe" key={key.id_projeto}>
                              {projeto.nome_projeto}
                            </Card.Text>
                            <BsEyeFill onClick={() => Goinspecionar(projeto.id_projeto)}/>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
            </>
            )
          }
  }
  function Cardgeral() {
      return (
        <div id="caixa-geral-de-projetos-inspequipe">
          {projeto?.map((projeto, key) => {
            return (
              <div>
                <Card id="card-page-inpequipe">
                  <Card.Body className="format-projet-equi">
                    <Card.Text id="status-projeto-isnpequipe" key={key.id_projeto}>
                      {projeto.nome_projeto}
                    </Card.Text>
                    <BsEyeFill onClick={() => Goinspecionar(projeto.id_projeto)}/>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      );
    }
  function RenderCards(){
    if(projeto.length === 0 && selecproj === ''){
      return(
        <>
          <h2>
            <img src={imagemerro} alt=" deu bom" width={"53%"} style={{ marginLeft: "18%", marginTop:'10%'}}/>
          </h2>
        </>
      )
    }else if(projeto.length !== 0 && selecproj === ''){
      return <Cardgeral/>
    }else if(selecproj === 'Em planejamento'){
      return <Cardplaneja/>
    }else if(selecproj === 'Em desenvolvimento'){
      return <Carddesenvov/>
    }else if(selecproj === 'Concluído'){
      return <Cardconcluido/>
    }
  }

  const [open, setOpen] = useState(false);
  const HandleClos = () => setOpen(false);
  const Handleopen = () => setOpen(true);

  function PostpeopleEquipe() {

    const [nome, setnome] = useState([]);
    const [fucao, setfucao] = useState([]);

    const getvaluenome = (e) => { setnome(e.target.value) }
    const getvaluefucao = (e) => { setfucao(e.target.value) }

    const Postpeople = () => {
      api.post(`/pessoas/`, {
        nome_pessoa: nome,
        funcao_pessoa: fucao,
        equipe_id: parseInt(id_equipe)
      })
      window.location.reload(true);
    }

    return (
      <>
        <Modal
          open={open}
          onClose={HandleClos}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Cadastro de membros
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <div className="fields">
                <label>Nome</label>
                <input type={"text"} placeholder='digite aqui....' className="inputgeral" onChange={getvaluenome}></input>
                <label>Função</label>
                <input type={"text"} placeholder='digite aqui....' className="inputgeral" onChange={getvaluefucao}></input>
              </div>
              <div className='btn-put-coment'>

                <button onClick={Postpeople} style={{ background: 'none' }} >Cadastrar</button>
                <button onClick={HandleClos} style={{ background: 'none' }} >Cancelar</button>

              </div>
            </Typography>
          </Box>
        </Modal>
      </>
    )
  }
  function Deletepeopleequipe(id_pessoa) {
    if (id_pessoa != 0) {
      api.delete(`/pessoas/${id_pessoa}`)
      setpessoa(pessoa.filter(pessoa => pessoa.id_pessoa !== id_pessoa))
      message.success('Deletado com sucesso')
    }
  }
  return (
    <div id="just-cards-geral-inspequipe">
      <div id="geral-card-inspecionar_equipe">
        <div id="card-inspecionar_equipe">
          <div>
            <BsArrowLeft onClick={Voltar} id="seta" />
          </div>
          <div id="card-header">
            <Avatar {...stringAvatar(`${nome}`)} />
          </div>
          <div id="h1-inspeq">
            <div>{equipe.nome_equipe}</div>
          </div>

          <div>
            <div id="icon-plus-inspequi">
              <button onClick={Handleopen} style={{ background: 'none' }}>
                <AiOutlinePlus id="corr" />
              </button>
            </div>

            <div id="tituloinsp">
              <div>Membros</div>
              <div>{totalmember}</div>
            </div>
            <div id="apresentacao-dos-membros" className="avatares_Equipert">
              <div>
                {recebe.map((nomepessoa) => {
                  return (
                    <div>
                      <Avatar aria-label="recipe" id="avatar-pessoa-group">
                        {nomepessoa}
                      </Avatar>
                    </div>
                  );
                })}
              </div>
              <div>
                {filtrandoPessoas.map((nome) => {
                  return (
                    <>
                      <div id="div-membros-inpequipe">
                        <div id="nome-user-group">
                          <h6>{nome.nome_pessoa}</h6>
                          <p style={{ color: '#717986' }}>{nome.funcao_pessoa}</p>
                        </div>
                        <div>
                          <button style={{ background: 'none', color: '#fff' }} onClick={() => Deletepeopleequipe(nome.id_pessoa)}> <BsTrash /></button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div id="btn-opition">
              <div>
                <Link
                  className="link-inspequi"
                  to={{ pathname: `/EditarEquipe/${equipe.id_equipe}` }}
                >
                  <button
                    id="btn-edit-inspequi"
                    to={{ pathname: `/EditarEquipe/${equipe.id_equipe}` }}
                  >
                    Editar
                  </button>
                </Link>
              </div>
              <div>
                <Link to="/Equipes">
                  <button
                    type="submit"
                    onClick={() => {
                      deleteEquipe(equipe.id_equipe);
                    }}
                    id="btn-excluir"
                  >
                    Excluir
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div id="insp-card-dois-pagina-inspequipe">
          <div>
            <div id="header-projetos-concluidos-insp-equipe">
              Painel de Projetos
            </div>
            <Selector/>
          </div>

          <div>
            <RenderCards />
          </div>
        </div>
      </div>
      <PostpeopleEquipe />
     
    </div>
  );
}

export default InspecionarEquipe;

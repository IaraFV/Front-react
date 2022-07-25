import axios from "axios";
import React from "react";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import './Projetos.css';
import { Link } from 'react-router-dom';
import AlarmIcon from '@mui/icons-material/Alarm';
import Checkbox from '@mui/material/Checkbox';
import { FiMoreVertical } from "react-icons/fi";

function Projetos(){

    const  [post, setpost] = useState([])
    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/')
        .then((response) => {
            setpost(response.data)
        }).catch(() => {
            console.log("Deu BO Men")
        })
    },[])
    
   const meuNovopost = post.filter((valorAtual) => {
        return valorAtual.status.includes("Em planejamento")
    })

    console.log(meuNovopost)
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    
   
  return(
       
<>

        <div id="informativo">
            <h1 id="titlepessoa" style={{color: '#fff', marginLeft: '5%', marginTop: '4%'}}>Cadastro de Projetos</h1>

                

                <div className="links">
                    <Link style={{textDecoration: 'none', color: '#9E9E9E'}}to="/ProjetosCnc"><h5>Concluído</h5></Link>
                    <Link style={{textDecoration: 'none', color: '#9E9E9E'}}to="/Emdesenvolvimento"><h5>Em desenvolvimento</h5></Link>
                    <Link style={{textDecoration: 'none', color: '#9E9E9E'}}to="/Emandamento"><h5>Em andamento</h5></Link>
                    
                </div>
                <div className="line-concluidos"></div>
                <Link to="/AddProjeto">
                    <button id="adicionar">Adicionar Projeto</button> 
                </Link>
                
                <p style={{color: '#fff', display: 'flex', justifyContent: 'flex-end', marginTop: '-2%', marginRight: '1%'}}></p>
        </div>
         <div id="rendeprojetos"style={{ background: '#21222D', borderRadius: '2rem', height: '35rem' }}>
            <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                <h5 className="statusprojetoh5" style={{marginTop: '5%', marginRight: '40%', height: '2rem', width: '30%'}}>Projects start</h5>
                <p style={{marginTop: '5%', height: '2rem', color: '#A0A0A0'}}>Saber mais</p>  
            </div>                      
        </div>

        <div>
                <div className="renderutprojeto" style={{ background: '#171821', borderRadius: '2rem', height: '3rem', marginLeft: '62.5%', width: '20%' }}>
                <AlarmIcon id="alarme" style={{color: '#fff'}}/>
                </div>
                <div className="renderprojetodois" style={{ background: '#171821', borderRadius: '2rem', height: '3rem', marginLeft: '62.5%', width: '20%' }}>
                <AlarmIcon id="alarme" style={{color: '#fff'}}/>
                </div>
                <div className="renderprojetotres" style={{ background: '#171821', borderRadius: '2rem', height: '3rem', marginLeft: '62.5%', width: '20%' }}>
                <AlarmIcon id="alarme" style={{color: '#fff'}}/>
                </div>
                <div className="renderprojetoquatro" style={{ background: '#171821', borderRadius: '2rem', height: '3rem', marginLeft: '62.5%', width: '20%' }}>
                <AlarmIcon id="alarme" style={{color: '#fff'}}/>
                </div>
                <div className="renderprojetocinco" style={{ background: '#171821', borderRadius: '2rem', height: '3rem', marginLeft: '62.5%', width: '20%' }}>
                <AlarmIcon id="alarme" style={{color: '#fff'}}/>
                </div>
        </div>

        <div className="geralprojetoc">

              {post.map((post, key) => {
                  return (
                
<>                  

                        <div>
                          <div id="projetocard" style={{ background: '#171821', borderRadius: '2rem' }}>
                              <Card style={{ width: '18rem', height: '9rem', marginRight: '2%', background: '#21222D', borderRadius: '2rem' }} key={key}>
                                  <Card.Header id="header" style={{ color: '#A9DFD8' }}>
                                    <div className="poststatus">{post.status}</div>
                                    <Checkbox {...label} defaultChecked style={{color:'#CCCCCC', border: '#444444', display: 'flex', justifyContent:'flex-end', marginTop: '-13.5%', marginRight: '3%'}} id="check"/>
                                   
                                    <FiMoreVertical style={{color:'#CCCCCC', display: 'flex', justifyContent:'flex-end', marginLeft: '95%', marginTop: '-11.7%'}} />
                                
                                  </Card.Header>
                                  <Card.Title style={{ color: "#A9DFD8" }}></Card.Title>
                                  <Card.Body>
                                      <h4 style={{ color: '#fff' }}>{post.nome_projeto}</h4>
                                  </Card.Body>
                              </Card>
                          </div>
                      </div>
                       
</>
                

                  );

              })}



          </div>
</>
  );
  
}

export default Projetos;
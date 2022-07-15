import React from "react"; 
import './Home.css'
import teste from './img/undraw_Code_typing_re_p8b9-removebg-preview.png'
import {  ClipboardCheckFill,  FileEarmarkFill,  PeopleFill,  } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card'
import { Graf } from "../Graficos/graf";
import { Graf2 } from "../Graficos/graf2";

function Home (){
    return(
        <>
            <div id="imginicio" ><img src={teste} alt=" " width={'10%'} /></div>
            <div id="container">
                <h1 id="h1" style={{color: '#FFF'}} >Olá,</h1>
                <h5 style={{color: '#A0A0A0'}}>Bem-vindo a segunda fase do desafio!</h5>
            </div>

            <div id="geral">
                
                <div id="cards" style={{background: '#21222D'}}>                  
                    <div id="cardum" style={{background: '#171821'}}>
                    <PeopleFill id="iconpeoplefill" color="beige" size={60}/>
                    <p id="sabermais">Saber mais</p>
                    <p id="amarelo">Total de pessoas<br/>adicionadas ate hoje:</p>
                    <h3>300 +</h3>
                    </div>

                    <div id="carddois"  style={{background: '#171821'}}><FileEarmarkFill id="iconprojeto" color="beige" size={52}/>
                    <p id="sabermais">Saber mais</p>
                    <p id="amarelo">Total de projetos<br/>adicionadas ate hoje:</p>
                    <h3>300 +</h3>
                    </div>
                    <div id="cardtres"  style={{background: '#171821' }}><ClipboardCheckFill id="iconpeople" color="beige" size={56}/>
                     <p id="sabermais">Saber mais</p>
                    <p id="amarelo">Total de projetos<br/>adicionadas ate hoje:</p>
                    <h3>300 +</h3>
                    </div>
                </div>

                <div id="tabela" style={{background: '#21222D'}}>
                   <h1>Task's </h1>
                  
                    <Graf2/>
                </div>
            </div>

            <div id="geraltwo">
                <div id="progress" style={{background: '#21222D'}}>
                    <h1>Projetos</h1>
                    <h5>Concluídos</h5>
                    <div id="concluidas">
                        <div id="taskum" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '18rem', background:'#171821',  borderRadius:'2rem'}}>
                                <Card.Header  style={{color:"#A9DFD8"}} >Concluido</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Título do projeto</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div id="taskdois" style={{background: '#171821', borderRadius:'2rem'}}>
                             <Card  style={{ width: '18rem', background:'#171821',  borderRadius:'2rem'}}>
                                <Card.Header  style={{color:"#A9DFD8"}} >Concluido</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Título do projeto</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div id="tasktres" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '18rem', background:'#171821',  borderRadius:'2rem'}}>
                                <Card.Header  style={{color:"#A9DFD8"}} >Concluido</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Título do projeto</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    <div id="concluidas">
                        <div id="taskum" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '18rem', background:'#171821', borderRadius:'2rem'}}>
                                <Card.Header  style={{color:"#A9DFD8"}} >Concluido</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Título do projeto</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div id="taskdois" style={{background: '#171821', borderRadius:'2rem'}}>
                             <Card  style={{ width: '18rem', background:'#171821', borderRadius:'2rem'}}>
                                <Card.Header  style={{color:"#A9DFD8"}}>Concluido</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Título do projeto</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div id="tasktres" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '18rem', background:'#171821',  borderRadius:'2rem'}}>
                                <Card.Header  style={{color:"#A9DFD8"}} >Concluido</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Título do projeto</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>

                <div id="pc" style={{background: '#21222D'}}>
                <h2>Pessoas</h2>
                <h5>Pessoas adicionadas no período de uma semana</h5>
                <Graf/>
                </div>
            </div>
                       
      </>
    
);
}
export default Home;
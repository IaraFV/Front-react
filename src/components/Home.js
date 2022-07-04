import React from "react"; 
import './Home.css'
import teste from './img/undraw_Code_typing_re_p8b9-removebg-preview.png'
import { Activity, Calendar2Check, CardChecklist, Check, ListTask, People, Projector } from 'react-bootstrap-icons';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Card from 'react-bootstrap/Card'
import { Graf } from "./graf";
import { Graf2 } from "./graf2";
function Home (){
    return(
        <>
            <div id="imginicio" ><img src={teste} alt=" " width={'10%'} /></div>
            <div id="container">
                <h1 id="h1" style={{color: '#FFF'}} >Olá</h1>
                <p style={{color: '#A0A0A0'}}>Bem-vindo a segunda fase do desafio</p>
            </div>

            <div id="geral">

                <div id="cards" style={{background: '#21222D'}}>
                    <div id="pritext"><h1>Titulo</h1><h5>Porcentagem</h5></div>
                    
                    <div id="cardum"  style={{background: '#171821'}}><People id="iconpeople" color="#FEB95A" size={56}  />
                    <h2>300</h2>
                    <p id="total">Total</p>
                    <p id="amarelo">Pessoas adicionadas + </p>
                    </div>

                    <div id="carddois"  style={{background: '#171821'}}><Calendar2Check id="iconpeople" color="#A9DFD8" size={56}/>
                    <h2>150</h2>
                    <p id="total">Total</p>
                    <p id="verde">Projetos adicionados + </p>
                    </div>
                    <div id="cardtres"  style={{background: '#171821'}}><CardChecklist id="iconpeople" color="#F2C8ED" size={60}/>
                    <h2>50</h2>
                    <p id="total">Total</p>
                    <p id="rosa">Task's feitas + </p>
                    </div>
                </div>

                <div id="tabela" style={{background: '#21222D'}}>
                   <h1>Task's adicionadas</h1>
                   <p>Task's adicionadas em ua semana</p>
                    <Graf2/>
                </div>
            </div>

            <div id="geraltwo">
                <div id="progress" style={{background: '#21222D'}}>
                    <h1>Task's</h1>
                    <h5>Concluídas</h5>
                    <div id="concluidas">
                        <div id="taskum" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '18rem', background:'#171821', border:'1px solid #A9DFD8', borderRadius:'2rem'}}>
                                <Card.Header  style={{color:"#A9DFD8"}} >Concluida</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Título da task</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div id="taskdois" style={{background: '#171821', borderRadius:'2rem'}}>
                             <Card  style={{ width: '18rem', background:'#171821', border:'1px solid #A9DFD8', borderRadius:'2rem'}}>
                                <Card.Header  style={{color:"#A9DFD8"}} >Concluida</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Título da task</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div id="tasktres" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '18rem', background:'#171821', border:'1px solid #A9DFD8', borderRadius:'2rem'}}>
                                <Card.Header  style={{color:"#A9DFD8"}} >Concluida</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Título da task</Card.Title>
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
                            <Card  style={{ width: '18rem', background:'#171821', border:'1px solid #A9DFD8', borderRadius:'2rem'}}>
                                <Card.Header  style={{color:"#A9DFD8"}} >Concluida</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Título da task</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div id="taskdois" style={{background: '#171821', borderRadius:'2rem'}}>
                             <Card  style={{ width: '18rem', background:'#171821', border:'1px solid #A9DFD8', borderRadius:'2rem'}}>
                                <Card.Header  style={{color:"#A9DFD8"}} >Concluida</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Título da task</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div id="tasktres" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '18rem', background:'#171821', border:'1px solid #A9DFD8', borderRadius:'2rem'}}>
                                <Card.Header  style={{color:"#A9DFD8"}} >Concluida</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Título da task</Card.Title>
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
                <h2>Pesssoas Adicionadas</h2>
                <h5>Pessoas adicionadas no período de uma semana</h5>
                <Graf/>
                </div>
            </div>
                       
      </>
    
);
}
export default Home;
import React from "react"; 
import './Home.css'
import teste from './img/undraw_Code_typing_re_p8b9-removebg-preview.png'
import { Activity, Calendar2Check, CardChecklist, Check, ListTask, People, Projector } from 'react-bootstrap-icons';
import ProgressBar from 'react-bootstrap/ProgressBar'
function Home (){
    return(
        <body style={{background: '#171821'}}>
            <div id="imginicio" ><img src={teste} alt=" " width={'10%'} /></div>
            <div id="container">
                <h1 id="h1" style={{color: '#FFF'}} >Olá</h1>
                <p style={{color: '#A0A0A0'}}>Bem-vindo a segunda fase do desafio</p>
            </div>

            <div id="geral">

                <div id="cards" style={{background: '#21222D'}}>
                    <div id="pritext"><h1>Titulo</h1><p>Porcentagem</p></div>
                    
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

                </div>
            </div>

            <div id="geraltwo">
                <div id="progress" style={{background: '#21222D'}}>
                    
                </div>

                <div id="task" style={{background: '#21222D'}}></div>
            </div>
                
      
        
        </body>
    
);
}
export default Home;
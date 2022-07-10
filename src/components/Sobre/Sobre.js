import React from "react"; 
import './Sobre.css';
import sobreimg from './img/undraw_icons_wdp4-removebg-preview.png'
import Card from 'react-bootstrap/Card'
import rect from './img/download-removebg-preview.png'
import gol from './img/download-removebg-preview (1).png'
import post from './img/postgressql-removebg-preview.png'
import javas from './img/1200px-Javascript-shield.svg-removebg-preview (2).png'
import csss from './img/css-removebg-preview.png'
import html from './img/HTML5-removebg-preview.png'
import figma from './img/figma-removebg-preview.png'
function Sobre (){
    return(
        <>
        <div id="imgsobre" ><img src={sobreimg} alt=" " width={'30%'} style={{marginLeft:'48%', marginTop:'10%'}}  /></div>
        <div id="geralparteum">
        <h1>Projeto</h1>
        <h4 >Descrição</h4>
        <h6>Criar um Sistema que mantém projetos. O sistema deve cadastrar projetos e equipes, e cada equipe pode receber um número não delimitado de pessoas. Cada projeto tem tasks e possui uma equipe, cada task pode ser atribuída a uma determinada pessoa que está na equipe do projeto.<br/>
        Primeira fase do desafio: Implementar Back-End e Banco de dados<br/>
        Segunda fase do desafio: Implementar Front-End e Teste</h6>
        </div>

        <div id="integrantes" style={{ borderRadius:"2rem"}}>
                <div id="eq" style={{background: '#21222D', borderRadius:"2rem"}}>
                    <h1>Equipe</h1>
                    <h5>Membros</h5>
                    <div id="membros">
                        <div id="pessoaum" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '30rem', background:'#171821', border:'1px solid #E9C46A', borderRadius:'2rem', height:'120%'}}>
                                <Card.Header  style={{color:"#E9C46A", fontSize:'1.2rem'}} >Bruno Nascimento</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Tarefas Feitas</Card.Title>
                                <Card.Text style={{color:"#A0A0A0", fontSize:'1.2rem', marginTop:'9%'}}>
                                   -Desenvolvimento das structs<br/> 
                                   -Dos metódos GET que relacionam diferentes objetos<br/>
                                   -Definição das rotas gerais do projeto.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                         <div id="pessoadois" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '30rem', background:'#171821', border:'1px solid #E9C46A', borderRadius:'2rem', height:'120%'}}>
                                <Card.Header  style={{color:"#E9C46A", fontSize:'1.2rem'}} >Iara Ferreira</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Tarefas Feitas</Card.Title>
                                <Card.Text style={{color:"#A0A0A0", fontSize:'1.2rem', marginTop:'9%'}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                         <div id="pessoatres" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '30rem', background:'#171821', border:'1px solid #E9C46A', borderRadius:'2rem', height:'120%'}}>
                                <Card.Header  style={{color:"#E9C46A", fontSize:'1.2rem'}} >Lucas Martins</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Tarefas Feitas</Card.Title>
                                <Card.Text style={{color:"#A0A0A0", fontSize:'1.2rem', marginTop:'9%'}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                       
            </div>
        </div>
</div>
        <div id="linguagens" style={{background: '#21222D', borderRadius:"2rem"}}>
            <h1>Ferramentas Utilizadas</h1>
            <h5>Linguagens | Frameworks | Prototipação | Linguagem de arcação</h5>
            <div id="fram">
                <div><img src={rect} alt=" " width={'20%'} style={{marginLeft:'-2%', marginTop:'-0.4%'}}  /></div>
                <div><img src={gol} alt=" " width={'9%'} style={{marginLeft:'16.5%', marginTop:'-13%'}}  /></div>
                <div><img src={post} alt=" " width={'15%'} style={{marginLeft:'27%', marginTop:'-17.3%'}}  /></div>
                <div><img src={javas} alt=" " width={'8%'} style={{marginLeft:'45%', marginTop:'-21%'}}  /></div>
                <div><img src={csss} alt=" " width={'8%'} style={{marginLeft:'59%', marginTop:'-24.1%'}}  /></div>
                <div><img src={html} alt=" " width={'9%'} style={{marginLeft:'73%', marginTop:'-25%'}}  /></div>
                <div><img src={figma} alt=" " width={'23%'} style={{marginLeft:'78%', marginTop:'-28%'}}  /></div>
            </div>

        </div>

        </>
);
}
export default Sobre;
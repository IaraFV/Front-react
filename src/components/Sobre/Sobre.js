import React from "react"; 
import './Sobre.css';
import sobreimg from './img/undraw_icons_wdp4-removebg-preview.png'
import Card from 'react-bootstrap/Card'

function Sobre (){
    return(
        <>
        <div id="imgsobre" ><img src={sobreimg} alt=" " width={'30%'} style={{marginLeft:'48%', marginTop:'10%'}}  /></div>
        <div id="geralparteum">
        <h1>Projeto</h1>
        <h4 >Descrição</h4>
        <h5>Criar um Sistema que mantém projetos. O sistema deve cadastrar projetos e equipes, e cada equipe pode receber um número não delimitado de pessoas. Cada projeto tem tasks e possui uma equipe, cada task pode ser atribuída a uma determinada pessoa que está na equipe do projeto.</h5>
        <h5>Primeira fase do desafio: Implementar Back-End e Banco de dados</h5>
        <h5>Segunda fase do desafio: Implementar Front-End e Teste</h5>
        </div>

        <div id="integrantes" style={{ borderRadius:"2rem"}}>
                <div id="eq" style={{background: '#21222D', borderRadius:"2rem"}}>
                    <h1>Equipe</h1>
                    <h5>Membros</h5>
                    <div id="membros">
                        <div id="pessoaum" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '30rem', background:'#171821', border:'1px solid #F2C8ED', borderRadius:'2rem', height:'250%'}}>
                                <Card.Header  style={{color:"#F2C8ED", fontSize:'1.2rem'}} >Bruno Nascimento</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Tarefas Feitas</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                         <div id="pessoadois" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '30rem', background:'#171821', border:'1px solid #F2C8ED', borderRadius:'2rem', height:'250%'}}>
                                <Card.Header  style={{color:"#F2C8ED", fontSize:'1.2rem'}} >Iara Ferreira</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Tarefas Feitas</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                         <div id="pessoatres" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '30rem', background:'#171821', border:'1px solid #F2C8ED', borderRadius:'2rem', height:'250%'}}>
                                <Card.Header  style={{color:"#F2C8ED", fontSize:'1.2rem'}} >Lucas Martins</Card.Header>
                                <Card.Body>
                                <Card.Title style={{color:"#fff"}}>Tarefas Feitas</Card.Title>
                                <Card.Text style={{color:"#A0A0A0"}}>
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
            <h1>Linguagens/Frameworks</h1>

        </div>

        </>
);
}
export default Sobre;
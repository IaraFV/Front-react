import axios from "axios";
import React from "react";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import './Emandamento.css';
import { Link } from 'react-router-dom';


function Emandamento(){

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
                <Link to="/Post">
                    <button id="btn-adicionar-projeto">Adicionar Projeto</button>
                </Link>
                <p style={{color: '#fff', display: 'flex', justifyContent: 'flex-end', marginTop: '-2%', marginRight: '1%'}}></p>
        </div>
        

      
        <div className="geralprojetoandm">

              {post.map((post, key) => {
                  return (
                
<>                  

                        <div>
                          <div id="projetocard" style={{ background: '#171821', borderRadius: '2rem' }}>
                              <Card style={{ width: '18rem', height: '9rem', marginRight: '2%', background: '#21222D', borderRadius: '2rem' }} key={key}>
                                  <Card.Header id="header" style={{ color: '#EB5757' }}>{post.status}</Card.Header>
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



        /*<Card style={{ width: '18rem' }} key={key}>
                    <Card.Body style={{background: '#21222D', border: 'none', color:'white'}}>
                      <Card.Title>{post.nome_equipe}</Card.Title>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Card>
                  <CardGroup>
                        <Card key={key} style={{ width: '18px' }}>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                            <Card.Title>{post.nome_equipe}</Card.Title>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                  
                  
                  */
    
  
  
}

export default Emandamento;
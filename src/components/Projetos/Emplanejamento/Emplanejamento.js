import axios from "axios";
import React from "react";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import './Emplanejamento.css';
import { Link } from 'react-router-dom';


function Emplanejamento(){

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
  
}

export default Emplanejamento;
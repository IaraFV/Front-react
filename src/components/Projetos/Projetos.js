import axios from "axios";
import React from "react";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import './Projetos.css';

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
    
  return(
    <div>
        <div className="geralcards"> 
            <div id="PostBuscaEQ">
                
            </div>    
        {
            post.map((post,key) => {
                return(
                    <div>
                        <div id="projetocard" style={{background: '#171821', borderRadius:'2rem'}}>
                            <Card  style={{ width: '18rem', background:'#21222D',  borderRadius:'2rem'}} key={key}>
                                <Card.Header id="header" style={{color:'#A9DFD8'}}>{post.status}</Card.Header>
                                <Card.Title style={{color:"#A9DFD8"}}></Card.Title>
                                <Card.Body>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    
                )

            })
        }   
           
    </div>

    </div>
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

export default Projetos;
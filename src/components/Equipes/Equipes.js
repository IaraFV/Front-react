import axios from "axios";
import React from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useEffect, useState } from "react";
import './Equipe.css';

function Equipes(){

    const [post, setpost] = useState([])
    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/')
        .then((response) => {
            setpost(response.data)
        }).catch(() => {
            console.log("Deu BO Men")
        })
    },[])
  return(
    <div>
        <div className="geralcards">     
        {
            post.map((post,key) => {
                return(
                    <Card style={{ width: '18rem',  }} key={key}>
                    <Card.Body style={{background: '#21222D', border: ' 4px', color:'white'}}>
                      <Card.Title>{post.nome_equipe}</Card.Title>
                      <Card.Link href="./modalTeste.js">Atualiza</Card.Link>
                      <Card.Link href="#">Deletar</Card.Link>
                    </Card.Body>
                  </Card>
                    
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

export default Equipes;
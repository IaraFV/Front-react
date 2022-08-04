import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useState, useEffect } from "react";

import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import './Task.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

function Task() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/')
            .then((response) => {
                setPosts(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )


    function deletePost(id_pessoa) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
        setPosts(posts.filter(post => post.id_pessoa !== id_pessoa))
    }

    const arr = posts;
    var stats = arr.map((statuss) => statuss.status);
    var numero = stats.map((ret)=> ret.length);
    console.log(numero);
    /*
    function filtrarStatus (){
        const luc = stats;
        const teste = 'lucas';
        console.log(luc);
        if (luc === 'Em desenvolvimento'){
            var lucas = (teste+luc);
            return(
                <p>{lucas}</p>
            )
                
            
        }

    }*/

    return (
        <div>
            <div className="cabecalho">
                <h1 style={{ color: 'white' }} >Task</h1>
                <input type="text" className="input" placeholder="Ex: hello"></input>
            </div>

            <div className='table'>
                <Table striped>
                    <thead>
                        <tr>
                            <th>lucas</th>
                            <th>lucas</th>
                            <th>Last Name</th>
                            
                        </tr>
                    </thead>
                    <tbody >

                        <tr>
                            {
                                posts.map((post,key) => {
                                    return(
                                        <div>
                                            <td draggable="true"><Card style={{ width: '18rem' }}>
                                                <Card.Body>
                                                    <Card.Title style={{color: 'black'}} key={key}>
                                                        {post.descricao_task}
                                                    </Card.Title>
                                                    <Card.Text>{post.status}
                                                        
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card></td>
                                        </div>
                                    );

                                    
                                })
                                }
                            <td><Card style={{ width: '18rem' }}>
                                
                                <Card.Body>
                                   
                                </Card.Body>
                            </Card> </td>
                            <td><Card style={{ width: '18rem' }}>
                                
                                <Card.Body>
                                    
                                </Card.Body>
                            </Card></td>
                            
                        </tr>
                        
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default Task;
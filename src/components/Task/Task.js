import axios from "axios";
import React, { useState, useEffect } from "react";
import './Task.css';
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
    var stats = arr;
    //.map((statuss) => statuss.status);
    //var numero = stats.map((ret)=> ret.length);

    var and = stats.filter(states => states.status === "A fazer");

    var fi = stats.filter(states => states.status === 'Em desenvolvimento');

    var Sta = stats.filter(states => states.status === 'Concluído');
    console.log(and);
    console.log(fi);
    console.log(Sta);

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
                                and.map((post, key) => {
                                    return (
                                        <div>
                                            <td draggable="true">

                                                <Card style={{ width: '18rem' }}>
                                                    <Card.Body>
                                                        <Card.Title style={{ color: 'black' }} key={key}>
                                                            {post.descricao_task}
                                                        </Card.Title>
                                                        <Card.Text>{post.status}

                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </td>
                                        </div>
                                    );


                                })
                            }



                            {
                                fi.map((las, key) => {
                                    return (

                                    
                                            <td draggable="true">

                                                <Card style={{ width: '18rem' }}>
                                                    <Card.Body>
                                                        <Card.Title style={{ color: 'black' }} key={key}>
                                                            {las.descricao_task}
                                                        </Card.Title>
                                                        <Card.Text>{las.status}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </td>
                                  

                                    )
                                })
                            }

                        </tr>

                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default Task;
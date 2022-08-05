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

    return (
        <div>
            <div className="cabecalho">
                <h1 style={{ color: 'white' }} >Task</h1>
                <input type="text" className="input" placeholder="Ex: hello"></input>
            </div>

            <div className="d-flex">
                <div className="col-3">


                </div>

                <div className="col-9 d-flex justify-content-between" style={{ height: "800px" }}>
                    <div className="col-3 d-flex flex-column align-items-center" style={{ height: "745px" }}>
                        <h4 className="text-center mt-2">
                            A fazer
                        </h4>
                        { 
                          and.map((post, key) => {
                                return (
                                    <div>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Body>
                                                <Card.Title style={{ color: 'black' }} key={key}>{post.descricao_task}</Card.Title>
                                                <Card.Text>{post.status}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="col-3 d-flex flex-column align-items-center" style={{ height: "745px" }}>
                        <h4 className="text-center mt-2">
                            Em desenvolvimento
                        </h4>
                        { 
                          fi.map((post, key) => {
                                return (
                                    <div>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Body>
                                                <Card.Title style={{ color: 'black' }} key={key}>{post.descricao_task}</Card.Title>
                                                <Card.Text>{post.status}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="col-3 d-flex flex-column align-items-center" style={{ height: "745px" }}>
                        <h4 className="text-center mt-2">
                            Concluídos
                        </h4>
                        { 
                          Sta.map((post, key) => {
                                return (
                                    <div>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Body>
                                                <Card.Title style={{ color: 'black' }} key={key}>{post.descricao_task}</Card.Title>
                                                <Card.Text>{post.status}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                );
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Task;

/**
 * <Table striped>
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
 */
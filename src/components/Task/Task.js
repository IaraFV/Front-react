import React from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import Spinner from 'react-bootstrap/Spinner';

function FSpinner() {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

class Equipes extends React.Component {

    state ={
            id_task : 0,
            descricao_task: '',
            statu: '',
            nome_pessoa: '',
            nome_projeto: '',
            tasks : [],
            modalAberta: false,
        }


    componentDidMount(){
        this.buscarTasks();
    }
    componentWillUnmount(){
        
    }
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Metodos POST DELETE GET UPDATE-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
    buscarTasks = () => {
         fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/")
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ tasks : dados})
        })
    }

    cadastraEquipes = (tasks) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/", {
            method: 'POST' ,
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(tasks)
        })
            .then(resposta => {
                if(resposta.ok){
                    this.buscarTasks();
                    }else{
                        alert("nao add")
            }
        })

    }
   

    deletarEquipes = (id_equipe) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/"+id_equipe, 
        { method: 'DELETE' })
            .then(resposta => {
                if(resposta.ok){
                    this.buscarTasks();
                }
        })
    }

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/
atualizaNome = (e) => {
    this.setState(
        {
            nome_equipe: e.target.value
        }
    )
}
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=RENDER TABELA=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/
    renderTabela(){
        return <Table id="table" striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>id_task</th>
                <th>status</th>
                <th>descricao_task</th>
                <th>nome_pessoa</th>
                <th>nome_projeto</th>
                <th>Opcoes</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.tasks.map((tasks) =>
                        <tr>
                            <td> {tasks.id_task} </td>
                            <td> {tasks.status} </td>
                            <td> {tasks.descricao_task} </td>
                            <td> {tasks.nome_pessoa} </td>
                            <td> {tasks.nome_projeto} </td>                            
                            <td id="icon">
                                <AiFillEdit onClick={() => this.carregaEquipes(tasks.id_pessoa)}/> 
                                <AiFillDelete onClick={() => this.deletarEquipes(tasks.id_pessoa)}/>
                                <BsSearch/>
                            </td>
                        </tr>
                    )
                }
                
            </tbody>
        </Table>
    }

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-FUCOES=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/


    submit = () => {
            const tasks = {
                descricao_task : this.state.descricao_task,
                nome_pessoa : this.state.nome_pessoa,
                nome_projeto : this.state.nome_projeto,
        }

        this.cadastraEquipes(tasks);
        
    }

    fecharModal = () => {
        this.setState(
            {
                modalAberta: false

            }
         )
    }

    abrirModal = () => {
        this.setState( 
            {
                modalAberta: true

            }
         )
    }

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=RENDER PESSOA=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

render(){
    return(
        <div id="modal">

        <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                <Modal.Header closeButton>
                <Modal.Title>Adicionar uma nova Equipe:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <Form>
            <Form.Group className="mb-3">
                <Form.Label>id_equipe</Form.Label>
                <Form.Control type="text" value={this.state.id_equipe} readOnly={true}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>nome_equipe</Form.Label>
                <Form.Control type="text" placeholder="nome" value={this.state.nome_equipe} onChange={this.atualizaNome}/>
            </Form.Group>
            </Form>
            
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.fecharModal}>
                    Cancelar
                </Button>
                <Button  variant="primary" type="submit" onClick={this.submit} >
                    Adicionar
                </Button>
                </Modal.Footer>
            </Modal>
            
            <div id="add">
                <BsPlusLg type="submit" onClick={this.abrirModal}/>
            </div>
            

            {this.renderTabela()}
        </div>
    )
  }
 
}

export default Equipes;
/*import React from "react";

class Equipes extends React.Component {

    state ={
            nome_equipe:'',
            equipes : [],
            modalAberta: false,
        }


    componentDidMount(){
        this.buscarTasks();
    }
    componentWillUnmount(){
        
    }
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Metodos POST DELETE GET UPDATE-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
   /* buscarEquipes = () => {
         fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/")
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ equipes : dados})
        })
    }
    render(){
        return(
            <div>
                {
                    this.state.equipes.map((equipes) =>
                        <ul>
                            <li key={equipes.id_equipe}> {equipes.nome_equipe} </li>
                            
                        </ul>
                    )
                }
            </div>
        );}
}
export default Equipes;*/
import React from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import './Equipe.css';
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
            nome_equipe:'',
            equipes : [],
            modalAberta: false,
        }


    componentDidMount(){
        this.buscarEquipes();
    }
    componentWillUnmount(){
        
    }
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Metodos POST DELETE GET UPDATE-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
    buscarEquipes = () => {
         fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/")
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ equipes : dados})
        })
    }

    cadastraEquipes = (equipes) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/", {
            method: 'POST' ,
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(equipes)
        })
            .then(resposta => {
                if(resposta.ok){
                    this.buscarequipes();
                    }else{
                        alert("nao add")
            }
        })

    }
   

    deletarEquipes = (id_equipe) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/"+id_equipe, 
        { method: 'DELETE' })
            .then(resposta => {
                if(resposta.ok){
                    this.buscarequipes();
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
                <th>id_equipe</th>
                <th>nome_equipe</th>
                <th>Opcoes</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.equipes.map((equipes) =>
                        <tr>
                            <td> {equipes.id_equipe} </td>
                            <td> {equipes.nome_equipe} </td>
                            <td id="icon">
                                <AiFillEdit onClick={() => this.carregaEquipes(equipes.id_pessoa)}/> 
                                <AiFillDelete onClick={() => this.deletarEquipes(equipes.id_pessoa)}/>
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
            const equipes = {
            nome_equipe : this.state.nome_equipe,
        }

        this.cadastraEquipes(equipes);
        
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
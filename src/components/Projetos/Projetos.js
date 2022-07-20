import React from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner'
import { BsPlusLg } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import './Projetos.css';
import './getequipe'
function FSpinner() {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
class Projetos extends React.Component {

    state ={
        id_projeto:0,
        nome_projeto:'',
        equipe_id:parseInt(''),
        nome_equipe:'',
        status:'',
        projetos : [],
        modalAberta: false,
        
        }


    componentDidMount(){
        this.buscarprojetos();
    }
    componentWillUnmount(){
        
    }
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Metodos POST DELETE GET UPDATE-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
    buscarprojetos = () => {
         fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/")
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ projetos : dados})
        })
    }

    cadastraprojetos = (projetos) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/", {
            method: 'POST' ,
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(projetos)
        })
            .then(resposta => {
                if(resposta.ok){
                    this.buscarprojetos();
                    }else{
                        alert("nao add")
            }
        })

    }
    carregaprojetos = (id_projetos) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/"+id_projetos, 
        { method: 'GET' })
            .then(resposta => resposta.json())
            .then(projetos => {
                this.setState({
                    id_projeto: projetos.id_projeto,
                    nome_projeto: projetos.nome_projeto,
                    nome_equipe: projetos.nome_equipe,
                })
                this.abrirModal();
            })
    }

    deletarprojetos = (id_projeto) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/"+id_projeto, 
        { method: 'DELETE' })
            .then(resposta => {
                if(resposta.ok){
                    this.buscarprojetos();
                }
        })
    }
    atualizarprojetos = (projetos) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/", {
            method: 'PUT' ,
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(projetos)
        })
            .then(resposta => {
                if(resposta.ok){
                    this.buscarprojetos();
                    }else{
                        alert("nao atualiza")
            }
        })

    }

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/
atualizaNome = (e) => {
    this.setState(
        {
            nome_projeto: e.target.value
        }
    )
}
atualizaEquipe_id = (e) => {
    this.setState(
        {
            equipe_id: e.target.value
        }
    )
}

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=RENDER TABELA=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/
    renderTabela(){
        return <Table id="table" striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>id_projeto</th>
                <th>nome_projeto</th>
                <th>nome_equipe</th>
                <th>Opcoes</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.projetos.map((projetos) =>
                        <tr>
                            <td> {projetos.id_projeto} </td>
                            <td> {projetos.nome_projeto} </td>
                            <td> {projetos.nome_equipe} </td>
                            <td id="icon">
                                <AiFillEdit onClick={() => this.carregaprojetos(projetos.id_projeto)}/> 
                                <AiFillDelete onClick={() => this.deletarprojetos(projetos.id_projeto)}/>
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
    if(this.state.id_pessoa == 0){
        const pessoas = {
        id_projeto: this.state.id_pessoa,
        nome_projeto : this.state.nome_pessoa,
        nome_equipe: this.state.nome_equipe,
    }
    this.cadastraprojetos(pessoas);

    }else{
        const pessoas = {
        id_pessoa: this.state.id_pessoa,
        nome_pessoa : this.state.nome_pessoa,
        funcao_pessoa: this.state.funcao_pessoa,
        equipe_id: this.state.equipe_id,
    }

    this.atualizarprojetos(pessoas);
    }
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
                <Modal.Title>Adicionar um novo projeto:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <Form>

            <Form.Group className="mb-3">
                <Form.Label>nome_projeto</Form.Label>
                <Form.Control type="text" placeholder="nome" value={this.state.nome_projeto} onChange={this.atualizaNome}/>
            </Form.Group>
             <Form.Group className="mb-3">
                <Form.Label>equipe_id</Form.Label>
                 <Form.Control type="number" placeholder="equipe" value={this.state.equipe_id} onChange={this.atualizaEquipe_id}/>
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

export default Projetos;
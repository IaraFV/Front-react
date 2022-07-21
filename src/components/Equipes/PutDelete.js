import React from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";
import { AiTwotoneFilter} from "react-icons/ai";
import { AiFillPlusSquare, AiOutlineOrderedList } from "react-icons/ai";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

class ModalEquipe extends React.Component {
    
    state ={
        id_equipe:0,
        nome_equipe:'',
        pessoas : [],
        modalAberta: false,
    }


componentDidMount(){
    this.buscarPessoas();
}
componentWillUnmount(){
    
}

buscarPessoas = () => {
    fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/")
       .then(resposta => resposta.json())
       .then(dados => {
           this.setState({ pessoas : dados})
   })
}

carregaPessoas = (id_equipe) => {
   fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/"+id_equipe, 
   { method: 'GET' })
       .then(resposta => resposta.json())
       .then(pessoas => {
           this.setState({
               id_equipe: pessoas.id_equipe,
               nome_equipe: pessoas.nome_equipe
           })

           this.abrirModal();
       })
}

cadastraPessoas = (pessoas) => {
   fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/", {
       method: 'POST' ,
       headers: { 'Content-Type':'application/json' },
       body: JSON.stringify(pessoas)
   })
       .then(resposta => {
           if(resposta.ok){
               this.buscarPessoas();
               }else{
                   alert("nao add")
       }
   })

}
atualizarPesssoas = (pessoas) => {
   fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/", {
       method: 'PUT' ,
       headers: { 'Content-Type':'application/json' },
       body: JSON.stringify(pessoas)
   })
       .then(resposta => {
           if(resposta.ok){
               this.buscarPessoas();
               }else{
                   alert("nao atualiza")
       }
   })

}
deletarPessoas = (id_equipe) => {
    fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/"+id_equipe, 
    { method: 'DELETE' })
        .then(resposta => {
            if(resposta.ok){
                this.buscarPessoas();
            }
    })
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
    atualizaNome = (e) => {
        this.setState(
            {
                nome_equipe: e.target.value
            }
        )
    }

    submit = () => {

        if(this.state.id_equipe == 0){
            const pessoas = {
                nome_equipe : this.state.nome_equipe,
            }
        
            this.cadastraPessoas(pessoas);
        }else{
            const pessoas = {
               id_equipe : this.state.id_equipe,
                nome_equipe : this.state.nome_equipe,
            }
        
            this.atualizarPesssoas(pessoas);
            
        }
    }

    render () {
        return(
            <div>
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

            <div id="iconsgeral">
                
                <div id="opcoes">

                    <AiFillEdit type="submit" onClick={this.carregaPessoas}/>
                    <AiFillDelete type="submit" onClick={this.deletarPessoas}/>
                    <AiFillPlusSquare type="submit" onClick={this.abrirModal}/>
                    <AiTwotoneFilter/>
                </div>
            </div>

            </div>
        );
    }
}
export default ModalEquipe;
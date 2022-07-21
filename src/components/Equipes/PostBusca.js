import './Equipe.css';
import React from 'react';
//import {useForm} from 'react-hook-form'
//import {Button, Form, Modal} from "react-bootstrap";
import { AiFillPlusSquare, AiTwotoneFilter } from "react-icons/ai";

function PostBusca (){
   // const {register, handleSubmit, formState: {erros} } = useForm

    return(
        <div>
                
                <div id='lucas'>
                    <AiFillPlusSquare type="submit"/>
                    <AiTwotoneFilter type="submit"/>
                </div>
           

        </div>
    );
}
export default PostBusca;
/*class PostBusca extends React.Component {
    state ={
        id_equipe:0,
        nome_equipe:'',
        pessoas : [],
        modalAberta: false,
    }


componentDidMount(){
    this.buscarEquipe();
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

cadastraEquipe = (pessoas) => {
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
                </div>
            </div>
        </div>
    );
}*/
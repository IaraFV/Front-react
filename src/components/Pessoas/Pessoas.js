import React from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";
import './Pessoas.css';
import {   PeopleFill } from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner'

function FSpinner() {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

class Pessoas extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            id_pessoa: 0,
            nome_pessoa: '',
            funcao_pessoa: '',  
            equipe_id: parseInt(''),       
            pessoas : [],
            modalAberta: false,
            
        }
    }
    componentDidMount(){
        this.buscarPessoas();
    }
    componentWillUnmount(){
        
    }
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Metodos POST DELETE GET UPDATE-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/


    buscarPessoas = () => {
         fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/")
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ pessoas : dados})
        })
    }

   carregaPessoas = (id_pessoa) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/"+id_pessoa, 
        { method: 'GET' })
            .then(resposta => resposta.json())
            .then(pessoas => {
                this.setState({
                    id_pessoa: pessoas.id_pessoa,
                    nome_pessoa: pessoas.nome_pessoa,
                    funcao_pessoa: pessoas.funcao_pessoa,
                    equipe_id: pessoas.equipe_id,
                })
                this.abrirModal();
            })
    }

    deletarPessoas = (id_pessoa) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/"+id_pessoa, 
        { method: 'DELETE' })
            .then(resposta => {
                if(resposta.ok){
                    this.buscarPessoas();
                }
        })
    }

    cadastraPessoas = (pessoas) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/", {
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

    atualizarPessoas = (pessoas) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/", {
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
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=RENDERTABELA=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=*/

    renderTabela(){
        return <Table id="table" striped bordered hover variant="dark" style={{borderRadius: '2rem'}}>
            <thead style={{marginBottom: 'none'}}>
                <tr>
                <th>id_pessoa</th>
                <th>nome_pessoa</th>
                <th>funcao_pessoa</th>
                <th>Opcoes</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.pessoas.map((pessoas) =>
                        <tr key={pessoas.id_pessoa}>
                            <td> {pessoas.id_pessoa } </td>
                            <td> {pessoas.nome_pessoa} </td>
                            <td> {pessoas.funcao_pessoa} </td>
                           
                            <td> <Button variant="outline-danger" onClick={() => this.carregaPessoas(pessoas.id_pessoa)}>Atualizar</Button> 
                                 <Button variant="outline-danger" onClick={() => this.deletarPessoas(pessoas.id_pessoa)}>Deletar</Button> </td>
                        </tr>
                    )
                }
                
            </tbody>
        </Table>
    }

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-FUCOES=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/

    atualizaNome = (e) => {
        this.setState(
            {
                nome_pessoa: e.target.value
            }
        )
    }

    atualizaFuncao = (e) => {
        this.setState(
            {
                funcao_pessoa: e.target.value
            }
        )
    }

    atualizaEquipe_ID = (e) => {
        this.setState(
            {
                equipe_id: e.target.value
            }
        )
    }
  

    submit = () => {
        if(this.state.id_pessoa == 0){
            const pessoas = {
                nome_pessoa : this.state.nome_pessoa,
                funcao_pessoa: this.state.funcao_pessoa,
                equipe_id: this.state.equipe_id,
        }
        this.cadastraPessoas(pessoas);

        }else{
            const pessoas = {
             
                nome_pessoa : this.state.nome_pessoa,
                funcao_pessoa: this.state.funcao_pessoa,
                equipe_id: this.state.equipe_id,
        }

        this.atualizarPessoas(pessoas);
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
    <>
        
        <div id="modal">
             <div id="personperson">
                        <PeopleFill id="palb"  color="#fff" size={60}/>
                        <h1 style={{color: 'beige', marginLeft:'7%', marginTop:'-5.3%'}}>Cadastro de pessoas</h1>
                        <h6 style={{color: '#A0A0A0',}}>Cadastro de pessoas: Incluir, Listar, Alterar, Excluir.</h6>
                    </div>
        <Modal show={this.state.modalAberta} onHide={this.fecharModal} >

                <Modal.Header closeButton style={{background: '#171821', border: 'none' }}>
                <Modal.Title style={{color: 'beige'}}>Cadastrar Pessoa</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{background: '#21222D'}}>
                     <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="nome" value={this.state.nome_pessoa} onChange={this.atualizaNome}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{color: 'beige'}}>Função</Form.Label>
                            <Form.Control type="text" placeholder="funcao" value={this.state.funcao_pessoa} onChange={this.atualizaFuncao}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{color: 'beige'}}>Equipe</Form.Label>
                            <Form.Control type="number" placeholder="equipe" value={this.state.equipe_id} onChange={this.atualizaEquipe_ID}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer style={{background: '#171821', border: 'none'}}>

                    <Button variant="secondary" onClick={this.fecharModal}>
                        Cancelar
                    </Button>

                    <Button  variant="primary" type="submit" onClick={this.submit} >
                        Adicionar
                    </Button>

                </Modal.Footer>
                
            </Modal>

             <div id="add">
                 <Button variant="primary" type="submit" onClick={this.abrirModal} >
                Adicionar
                 </Button>
            </div>
            
            {this.renderTabela()}
        </div>
</>
    )
  }
}

export default Pessoas;
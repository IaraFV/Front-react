import React from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";
import './Pessoas.css';
class Pessoas extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            id_pessoa: 0,
            nome_pessoa: '',
            funcao_pessoa: '',
            equipe_id: '',
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
                    equipe_id: pessoas.equipe_id
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

    cadastraPesssoas = (pessoas) => {
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

    atualizarPesssoas = (pessoas) => {
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

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=RENDERTABELA=--=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/
    renderTabela(){
        return <Table id="table" striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>id_pessoa</th>
                <th>nome_pessoa</th>
                <th>funcao_pessoa</th>
                <th>equipe_id</th>
                <th>Opcoes</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.pessoas.map((pessoas) =>
                        <tr>
                            <td> {pessoas.id_pessoa} </td>
                            <td> {pessoas.nome_pessoa} </td>
                            <td> {pessoas.funcao_pessoa} </td>
                            <td> {pessoas.equipe_id} </td>
                            <td> <Button variant="outline-danger" onClick={() => this.carregaPessoas(pessoas.id_pessoa)}>Atualizar</Button> 
                                 <Button variant="outline-danger" onClick={() => this.deletarPessoas(pessoas.id_pessoa)}>Deletar</Button> </td>
                        </tr>
                    )
                }
                
            </tbody>
        </Table>
    }

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-FUCOES=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/

    atualizaId = (e) => {
        this.setState(
            {
                id_pessoa: e.target.value
            }
        )
    }
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
    atualizaEquipe = (e) => {
        this.setState(
            {
                equipe_id: e.target.value
            }
        )
    }

    submit = () => {
        if(this.state.id_pessoa === 0){
            const pessoas = {
            id_pessoa: this.state.id_pessoa,
            nome_pessoa : this.state.nome_pessoa,
            funcao_pessoa: this.state.funcao_pessoa,
            equipe_id: this.state.equipe_id,
        }
        this.cadastraPesssoas(pessoas);

        }else{
            const pessoas = {
            id_pessoa: this.state.id_pessoa,
            nome_pessoa : this.state.nome_pessoa,
            funcao_pessoa: this.state.funcao_pessoa,
            equipe_id: this.state.equipe_id,
        }

        this.atualizarPesssoas(pessoas);
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
                <Modal.Title>Adicionar uma nova Pessoa:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <Form>
            <Form.Group className="mb-3">
                <Form.Label>id_pessoa</Form.Label>
                <Form.Control type="text" value={this.state.id_pessoa} readOnly={true}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>nome_pessoa</Form.Label>
                <Form.Control type="text" placeholder="nome" value={this.state.nome_pessoa} onChange={this.atualizaNome}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>funcao_pessoa</Form.Label>
                <Form.Control type="text" placeholder="funcao" value={this.state.funcao_pessoa} onChange={this.atualizaFuncao}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>equipe_id</Form.Label>
                <Form.Control type="number" placeholder="equipe" value={this.state.equipe_id} onChange={this.atualizaEquipe}/>
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
                 <Button variant="primary" type="submit" onClick={this.abrirModal} >
                Adicionar
            </Button>
            </div>
            
            {this.renderTabela()}
        </div>
    )
  }
}

export default Pessoas;
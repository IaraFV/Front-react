import React from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";
class Equipes extends React.Component {

    state ={
            nome_equipe:'',
            pessoas : [],
            modalAberta: false,
        }


    componentDidMount(){
        this.buscarPessoas();
    }
    componentWillUnmount(){
        
    }
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Metodos POST DELETE GET UPDATE-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
    buscarPessoas = () => {
         fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/")
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ pessoas : dados})
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
   

    deletarPessoas = (id_equipe) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/"+id_equipe, 
        { method: 'DELETE' })
            .then(resposta => {
                if(resposta.ok){
                    this.buscarPessoas();
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
                    this.state.pessoas.map((pessoas) =>
                        <tr>
                            <td> {pessoas.id_equipe} </td>
                            <td> {pessoas.nome_equipe} </td>
                            <td>
                                <Button variant="outline-danger" onClick={() => this.abrirModal(pessoas.id_pessoa)}>Adicionar</Button> 
                                <Button variant="outline-danger" onClick={() => this.carregaPessoas(pessoas.id_pessoa)}>Atualizar</Button> 
                                <Button variant="outline-danger" onClick={() => this.deletarPessoas(pessoas.id_pessoa)}>Deletar</Button> 
                            </td>
                        </tr>
                    )
                }
                
            </tbody>
        </Table>
    }

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-FUCOES=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/


    submit = () => {
            const pessoas = {
            nome_equipe : this.state.nome_equipe,
        }

        this.cadastraPessoas(pessoas);
        
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
            <div id="divBusca">
                <input type="text" id="txtBusca" placeholder="Buscar..."/>
            </div>
            
            {this.renderTabela()}
        </div>
    )
  }
 
}

export default Equipes;
import React from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";
class Projetos extends React.Component {

    state ={
            nome_projeto:'',
            equipe_id:'',
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
   

    deletarprojetos = (id_projeto) => {
        fetch("https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/"+id_projeto, 
        { method: 'DELETE' })
            .then(resposta => {
                if(resposta.ok){
                    this.buscarprojetos();
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
                <th>equipe_id</th>
                <th>nome_equipe</th>
                <th>status</th>
                <th>data_inicio</th>
                <th>Opcoes</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.projetos.map((projetos) =>
                        <tr>
                            <td> {projetos.id_projeto} </td>
                            <td> {projetos.nome_projeto} </td>
                             <td> {projetos.equipe_id} </td>
                             <td> {projetos.nome_equipe} </td>
                             <td> {projetos.status} </td>
                             <td> {projetos.data_inicio} </td>
                            <td>
                                <Button variant="outline-danger" onClick={() => this.abrirModal(projetos.id_pessoa)}>Adicionar</Button> 
                                <Button variant="outline-danger" onClick={() => this.carregaprojetos(projetos.id_pessoa)}>Atualizar</Button> 
                                <Button variant="outline-danger" onClick={() => this.deletarprojetos(projetos.id_pessoa)}>Deletar</Button> 
                            </td>
                        </tr>
                    )
                }
                
            </tbody>
        </Table>
    }

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-FUCOES=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=*/


    submit = () => {
            const projetos = {
            nome_projeto : this.state.nome_projeto,
        }

        this.cadastraprojetos(projetos);
        
    }

    submitatualiza = () => {
            const projetos = {
            id_projeto : this.state.id_projeto,
            nome_projeto : this.state.nome_projeto,
            equipe_id : this.state.equipe_id,
            nome_equipe : this.state.nome_equipe,
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
            <div id="divBusca">
                <input type="text" id="txtBusca" placeholder="Buscar..."/>
            </div>
            
            {this.renderTabela()}
        </div>
    )
  }
 
}

export default Projetos;
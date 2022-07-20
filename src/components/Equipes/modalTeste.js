import React from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";
import { AiTwotoneFilter} from "react-icons/ai";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { AiFillPlusSquare, AiOutlineOrderedList } from "react-icons/ai";

class modalEquipe extends React.Component {

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
    render () {
        return(
            <div>
                
            </div>
        );
    }
    render () {
        return(
            <div>
                
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
            
            <div id="iconsgeral">
                <div id="add">
                    <AiFillPlusSquare type="submit" onClick={this.abrirModal}/>
                </div>

                <div id="ordemalfa">
                    <AiOutlineOrderedList/>
                </div>

                <div id="filtrobusca">
                    <AiTwotoneFilter/>
                </div>
            </div>

            </div>
        );
    }
}
export default modalEquipe;
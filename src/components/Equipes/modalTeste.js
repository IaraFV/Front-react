import React from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";

class Projetos extends React.Component {

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
}
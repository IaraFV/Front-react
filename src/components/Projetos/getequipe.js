/*import axios from "axios";

function getequipe (){
 const equip  = axios.create({
    baseURL: 'https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/'
 })

}
export default getequipe;*/
import React from "react";

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
}
export default Equipes;
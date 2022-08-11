import './InspecionarEqui.css'
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Avatar from '@mui/material/Avatar';

function InspecionarEquipe() {

    const [equipe,setequipe] = useState([])
    const { id_equipe } = useParams()

    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/${id_equipe}`)
            .then((response) => {
                setequipe(response.data)
                console.log('deu certo Men')
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )
    
    /**função de 'slice' que pega a inicial do nome */
    function stringAvatar(name) {
        return {
            sx: {
                //bgcolor: stringToColor(name),
                width: '14rem', height: '14rem', fontSize: '8rem'
            },
            children: `${name.split(' ')[0][0]}`,
        };
    }

    function voltar() {
        window.history.back();
    }

    /**manipulação do array de geral de equipe */
    const nome = equipe.nome_equipe;
    console.log(nome);

    return (
        <div id="geral-card-inspecionar_equipe">
            <div id="card-inspecionar_equipe">
                <div id="card-header">
                    <Avatar {...stringAvatar(`${nome}`)} />
                </div>
                <div id="h1-insp">
                    <h1>{equipe.nome_equipe}</h1>
                </div>
            </div>
        </div>
    )
}
export default InspecionarEquipe;
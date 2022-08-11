import './InspecionarEqui.css'
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';

function InspecionarEquipe() {

    const [equipe, setequipe] = useState([])
    const [pessoa, setpessoa] = useState([])
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
    useEffect(() => {
        axios.get("https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/")
            .then((response) => {
                setpessoa(response.data)
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
    const getId_equipe = equipe.id_equipe;
    var INTid_equipe = parseInt(getId_equipe);
   
    /**manipulação do array de geral de equipe/ filtando o nome dos membros da equipe */
    const ArrGeral_pessoas = pessoa;
    /**nessa parte filtra as pessoas com base no id da equipe oriundo do "INTid_equipe" */
    const filtrandoPessoas = ArrGeral_pessoas.filter(pessoa_eque => pessoa_eque.equipe_id === INTid_equipe);
    console.log(filtrandoPessoas);
    
    
    return (
        <div id="geral-card-inspecionar_equipe">
            <div id="card-inspecionar_equipe">
                <div id="card-header">
                    <Avatar {...stringAvatar(`${nome}`)} />
                </div>
                <div id="h1-insp">
                    <h1>{equipe.nome_equipe}</h1>
                </div>
                <div className="line-insp-doiss"></div>
                <div>
                    <div id='tituloinsp'>
                        <h2>membros</h2>
                        <h2>5</h2>
                    </div>
                    <div className='avatares_Equipe'>
                    <Avatar  aria-label="recipe">
                        <Link to="/PostT">
                            <AiOutlinePlus id="corr"/>
                        </Link>
                    </Avatar>
                    {
                        filtrandoPessoas.map((nomepessoa) => {
                            return(
                                <div>
                                    <Avatar sx={{ }} aria-label="recipe">{nomepessoa.nome_pessoa}</Avatar>
                                </div>
                            )
                        })
                    }

                    </div>
                </div>
            </div>
        </div>
    )
}
/**<Avatar sx={{ }} aria-label="recipe"></Avatar> */
export default InspecionarEquipe;
import './InspecionarEqui.css'
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';
/**icons */
import { BsArrowLeft } from "react-icons/bs";
//import { Mensageok} from './components/Equipes/inspecionar/Mensageok'

function InspecionarEquipe() {

    const [projetos, setpro] = useState([])
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
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/'+id_equipe+'/'+projetos)
            .then((response) => {
                setpro(response.data)
                console.log('deu certo Men pro')
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )

console.log(setpro);
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

    function deleteEquipe(id_equipe) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/${id_equipe}`)
        setequipe(equipe.filter(post => post.id_equipe !== id_equipe))


    }

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
    const inicialLetra = filtrandoPessoas.map((letraini) => letraini.nome_pessoa);
    const recebe = inicialLetra.map((l) => l.charAt(0));
    /**este codigo vai pegar o total de membros (como um contador) */
    const totalmember = inicialLetra.length;

    /**manipulação dos dados oriundos de pessoas 
     * Percorre os dados de pessoa e retorna as que nao tem equipe */
    //const filtrandoPesssoa = pessoa.filter(semEquipe => semEquipe.equipe_id === null);
    //console.log(valuPessoa);

    /**nao apagar codigo do ADD novos membros a equipe
     * 
     * <Avatar aria-label="recipe">
            <Link to="/Post">
                <AiOutlinePlus id="corr" />
            /Link>
        </Avatar>
                                
     */

    function alentsuccess() {
        alert("Excluido com sucesso")
    }

    return (
        <div>
            <div id="geral-card-inspecionar_equipe">
                <div id="card-inspecionar_equipe">
                    <div>
                        <BsArrowLeft onClick={voltar} id="seta" />
                    </div>
                    <div id="card-header">
                        <Avatar {...stringAvatar(`${nome}`)} />
                    </div>
                    <h1 style={{ color: 'red' }}>{projetos.nome_projeto}</h1>
                    <div id="h1-insp" >
                        <h1 >{equipe.nome_equipe}</h1>

                    </div>
                    <div className="line-insp-doiss"></div>
                    <div>
                        <div id='tituloinsp'>
                            <h2>membros</h2>
                            <h2>{totalmember}</h2>
                        </div>
                        <div className='avatares_Equipe'>
                            <Avatar aria-label="recipe">
                                <Link to="/Post">
                                    <AiOutlinePlus id="corr" />
                                </Link>
                            </Avatar>
                            {
                                recebe.map((nomepessoa) => {
                                    return (
                                        <div>
                                            <Avatar sx={{}} aria-label="recipe">{nomepessoa}</Avatar>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="line-insp-doiss"></div>
                        <div id='btn-opition'>
                            <button id="btn-edit">
                                <Link to={{ pathname: `/EditarEquipe/${equipe.id_equipe}` }}> Editar
                                </Link>
                            </button>
                            <button type="submit" onClick={() => { deleteEquipe(equipe.id_equipe); alentsuccess() }} id="btn-excluir">Excluir

                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
/**<Avatar sx={{ }} aria-label="recipe"></Avatar> */
export default InspecionarEquipe;
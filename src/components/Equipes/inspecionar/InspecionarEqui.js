import './InspecionarEqui.css'
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';
/**icons */
import { BsArrowLeft } from "react-icons/bs";
import { Progress } from 'rsuite';
//import { Mensageok} from './components/Equipes/inspecionar/Mensageok'
import "rsuite/dist/rsuite.css";

function InspecionarEquipe() {


    const [equipe, setequipe] = useState([])
    const [pessoa, setpessoa] = useState([])
    const [projeto, setprojeto] = useState([])
    const { id_equipe } = useParams()
    const [percent, setPercent] = React.useState(50);
    const status = percent === 100 ? 'success' : null;

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
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes' + id_equipe + '/projetos')
            .then((response) => {
                setprojeto(response.data)
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

    function alentsuccess() {
        alert("Excluido com sucesso")
    }

    return (
        <div id='just-cards-geral-inspequipe'>
            <div id="geral-card-inspecionar_equipe">
                <div id="card-inspecionar_equipe">
                    <div>
                        <BsArrowLeft onClick={voltar} id="seta" />
                    </div>
                    <div id="card-header">
                        <Avatar {...stringAvatar(`${nome}`)} />
                    </div>
                    <div id="h1-inspeq" >
                        <div>{equipe.nome_equipe}</div>
                    </div>


                    <div>
                        <div id='icon-plus-inspequi'>
                            <Link to="/Post">
                                <AiOutlinePlus id="corr" />
                            </Link>
                        </div>


                        <div id='tituloinsp'>
                            <div>Membros</div>
                            <div>{totalmember}</div>
                        </div>
                        <div className='avatares_Equipe'>

                            {
                                recebe.map((nomepessoa) => {
                                    return (
                                        <div>
                                            <Avatar sx={{}} aria-label="recipe">{nomepessoa}</Avatar>
                                            <div className="line-insp-doiss"></div>
                                        </div>
                                    )
                                })
                            }
                        </div>



                        <div id='btn-opition'>
                            <div>
                                <Link className="link-inspequi" to={{ pathname: `/EditarEquipe/${equipe.id_equipe}` }}>
                                    <button id="btn-edit-inspequi" to={{ pathname: `/EditarEquipe/${equipe.id_equipe}` }}>
                                        Editar
                                    </button>
                                </Link>

                            </div>
                            <div>
                                <button type="submit" onClick={() => { deleteEquipe(equipe.id_equipe); alentsuccess() }} id="btn-excluir">Excluir</button>
                            </div>

                        </div>
                    </div>
                </div>





                <div id='insp-card-dois-pagina-inspequipe'>
                    <div style={{ width: 120, marginTop: 10 }}>
                        <Progress.Circle percent={percent} strokeColor={'#00DB99'} status={status} />
                    </div>
                </div>
            </div>

        </div>
    )
}
/**<Avatar sx={{ }} aria-label="recipe"></Avatar> */
export default InspecionarEquipe;
import './InspecionarEqui.css'
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';
/**icons */
import { BsArrowLeft } from "react-icons/bs";
/**componentes do modal */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    const inicialLetra = filtrandoPessoas.map((letraini) => letraini.nome_pessoa);
    const recebe = inicialLetra.map((l) => l.charAt(0));
    /**este codigo vai pegar o total de membros (como um contador) */
    const totalmember = inicialLetra.length;

    function deleteEquipe(id_equipe) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/${id_equipe}`)
        setequipe(equipe.filter(post => post.id_equipe !== id_equipe))
    }

    /**nao apagar codigo do ADD novos membros a equipe
     * 
     * <Avatar aria-label="recipe">
            <Link to="/PostT">
                <AiOutlinePlus id="corr" />
            /Link>
        </Avatar>
                                
     */
    /**variaveis do modal */
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    /**formatação CSS do modal */
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
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
                    <div id="h1-insp">
                        <h1>{equipe.nome_equipe}</h1>
                    </div>
                    <div className="line-insp-doiss"></div>
                    <div>
                        <div id='tituloinsp'>
                            <h2>membros</h2>
                            <h2>{totalmember}</h2>
                        </div>
                        <div className='avatares_Equipe'>
                            <Button onClick={handleOpen}>adicionar <br/> membros </Button>
                            <Modal
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                        Text in a modal
                                    </Typography>
                                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                    </Typography>
                                    
                                    <Button onClick={handleClose}>Close Child Modal</Button>
                                    
                                </Box>
                            </Modal>
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
                            <button onClick={deleteEquipe} id="btn-excluir">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
/**<Avatar sx={{ }} aria-label="recipe"></Avatar> */
export default InspecionarEquipe;
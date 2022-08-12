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
/**componentes seletor */
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

/**função de verificação de dados par aefetuar o envio */
const validacaoPostE = yup.object().shape({
    id_pessoa:  yup.string().required("Campo é obrigatorio!")
})
function InspecionarEquipe() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacaoPostE)
    })

    /**funcao de POST */
    const atualizaequipe = data => axios.put(`https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/${id_equipe}`, data)
        .then(() => {
            console.log("foi")
            
        })
        .catch(() => {
            console.log("n foi")
        })
    /*FIM */
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

    /**variavesi do seletor */
    const [valuPessoa, setvalue] = React.useState('');

    /**funçoes de evento das variaves do seletor */
    const handleChange = (event) => {
        setvalue(event.target.value);
    };
    console.log(valuPessoa);
    /**manipulação dos dados oriundos de pessoas 
     * Percorre os dados de pessoa e retorna as que nao tem equipe */
     const filtrandoPesssoa = pessoa.filter(semEquipe => semEquipe.equipe_id === null);
   

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
                            <Button onClick={handleOpen}><AiOutlinePlus id="corr"/></Button>
                            <Modal
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                <FormControl fullWidth>
                                        <InputLabel id_pessoa="demo-simple-select-label"></InputLabel>
                                        <Select
                                            {...register("id_pessoa")}
                                            labelId="demo-simple-select-label"
                                            id_pessoa="demo-simple-select"
                                            value={valuPessoa}
                                            label="Age"
                                            sx={{ bgcolor: '#fff', borderRadius: '1rem' }}
                                            onChange={handleChange}>
                                            {filtrandoPesssoa.map((pessoas) =>
                                                <MenuItem value={pessoas.id_pessoa} key={pessoas.id_pessoa}>{pessoas.nome_pessoa}</MenuItem>
                                            )}
                                        </Select>
                                        <p className="error-message">{errors.nivel?.message} </p>
                                    </FormControl>
                                    
                                    <Button  onClick={atualizaequipe}>Enviar dados</Button>
                                    
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
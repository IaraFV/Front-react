import React, { useEffect, useState } from "react";
import './InspProjeto.css'
import { useParams } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import imagemerro from './img/itensNaoencontrados.png';
import api from "../../../services/api"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import { AiOutlineMore } from "react-icons/ai";
import { IoEllipseSharp } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

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

function InspProjeto() {

    //variaves das requisições GET
    const [projetos, setprojetos] = useState([])
    const { id_projeto } = useParams()
    const [tasks, settasks] = useState([])
    const [initialtasks, setInitialtasks] = useState([])

    //get do array geral de projetos, sendo passado um parametro para busca com base no id passado
    useEffect(() => {
        api.get(`/projetos/${id_projeto}`)
            .then((response) => {
                setprojetos(response.data)

            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )

    //get do array geral de tasks
    useEffect(() => {
        api.get("/tasks/")
            .then((response) => {
                settasks(response.data)
                setInitialtasks(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )

    //função de delete
    function deleteprojetos(id_projeto) {
        api.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/${id_projeto}`)
        setprojetos(projetos.filter(projetos => projetos.id_projeto !== id_projeto))
    }

    //filter pesquisa
    const handlechange = ({ target }) => {
        if (!target.value) {
            setInitialtasks(initialtasks)
            return;
        }
        const filter = tasks.filter(({ descricao_task }) =>
            descricao_task.toUpperCase().includes(target.value.toUpperCase()))

        setInitialtasks(filter);
    }

    function Deletetask() {
        api.delete(`/tasks/${getid}`)
        settasks(tasks.filter(task => task.id_task !== getid))
        console.log('foi')
    }

    /**pega o id do projeto selecionado e converte para inteiro*/
    const pegaid = parseInt(id_projeto);
    /**filtra as taks com basa no id do projeto */
    const gettask = tasks.filter((get) => get.projeto_id === pegaid);

    /**divide as taks vindas da pimeira filtragem e as filtra novamento com base no status */
    const filtFazer = gettask.filter((get) => get.status === "A fazer");
    const filtFazendo = gettask.filter((get) => get.status === "Em desenvolvimento");
    const filtFeito = gettask.filter((get) => get.status === "Concluído");

    //const teste = (gettask.filter((get) => get.status === "Concluído")).length;

    var totalTaskAfazer = filtFazer.length;
    var totalTaskEmdesenvolvimento = filtFazendo.length;
    var totalTaskConcluído = filtFeito.length;

    //modal 1 função que pega o id da task
    function handleOpen(id_task) {
        if (id_task !== 0) {
            setOpen(true)
            Setteste(id_task)
        } else {
            console.log('n foi true')
        }
    }
    //modal 1
    function PutStatus() {
        if (valutask !== '') {
            api.put(`/tasks/${getid}/status`,
                { status: valutask })
            alert("Cadastrado com Sucess");
            window.location.reload(true);

        } else {
            alert("Não cadastrou");
        }
    }

    //modal 2 função que pega o id da task
    function handleOpenn(id_task) {
        if (id_task !== 0) {
            setOpenn(true)
            Setteste(id_task)
            console.log(id_task);
        } else {
            console.log('n foi true')
        }
    }

    //variavel de recebimento do id da task
    var [getid, Setteste] = React.useState();

    //variavel da manipulação do modal 1
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    //variavel da manipulação do modal 2
    const [openn, setOpenn] = React.useState(false);
    const handleClosen = () => setOpenn(false);

    //variaveis do seletor modal 1 
    var [valutask, setvalue] = React.useState('');
    const handleChange = (event) => {
        setvalue(event.target.value);
    };


    function CorpoModal() {
        return (
            <>
                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            Mudar Status
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <NativeSelect
                                        defaultValue={valutask}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'uncontrolled-native',
                                        }}>
                                        <option >status</option>
                                        <option value={'A fazer'}>A fazer</option>
                                        <option value={'Em desenvolvimento'}>Em desenvolvimento</option>
                                        <option value={'Concluído'}>Concluído</option>
                                    </NativeSelect>
                                </FormControl>
                            </Box>

                        </Typography>
                        <Button variant="outlined" onClick={PutStatus}>Mudar status</Button>
                    </Box>
                </Modal>
            </>
        )
    }
    const validacaoPostT = yup.object().shape({
        descricao_task: yup.string().required("A descrição é obrigatoria!"),
        nivel: yup.string().required("O nivel é obrigatoria!"),
        projeto_id: yup.number(),
        pessoa_id: yup.number(),
    })

    function ModaldoMenu() {


        const { register, handleSubmit, formState: { errors }, reset } = useForm({
            resolver: yupResolver(validacaoPostT)
        })

        const addPost = data => api.put(`/tasks/${getid}`, data)
            .then(() => {
                console.log("foi")

            })
            .catch(() => {
                console.log("n foi")
            })
        return (
            <>
                <Modal
                    keepMounted
                    open={openn}
                    onClose={handleClosen}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            Edições
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                            <form onSubmit={handleSubmit(addPost)}>
                                <div className="fields">
                                    <label>descricao_task</label>
                                    <input type="text" name="nome_equipe" {...register("nome_equipe")} className="inputgeral" />
                                    <p className="error-message">{errors.nome_equipe?.message} </p>
                                </div>
                                <div className="fields">
                                    <label>nivel</label>
                                    <input type="text" name="nome_equipe" {...register("nome_equipe")} className="inputgeral" />
                                    <p className="error-message">{errors.nome_equipe?.message} </p>
                                </div>
                                <div className="fields">
                                    <label>projeto_id</label>
                                    <input type="text" name="nome_equipe" {...register("nome_equipe")} className="inputgeral" />
                                    <p className="error-message">{errors.nome_equipe?.message} </p>
                                </div>
                                <div className="fields">
                                    <label>pessoa_id</label>
                                    <input type="text" name="nome_equipe" {...register("nome_equipe")} className="inputgeral" />
                                    <p className="error-message">{errors.nome_equipe?.message} </p>
                                </div>
                            </form>
                        </Typography>
                        <Button variant="outlined">Editar</Button>
                        <Button variant="outlined" onClick={Deletetask}>Deletar</Button>
                    </Box>
                </Modal>
            </>
        );
    }

    function VerificaAfazer() {
        if (totalTaskAfazer === 0) {
            return (
                <h2><img src={imagemerro} alt=" " width={'53%'} style={{ marginLeft: '28%', marginTop: '50%' }} /></h2>
            )
        } else {
            return (
                <>
                    {
                        filtFazer.map((projetos, key) => {
                            return (
                                <div className="dropzone">
                                    <Card id="card-desenvolvimento-t" className='card-color' >
                                        <div className="menu-dos-filtros-statusTask">
                                            <div className="menu-dos-filtros-statusTask">
                                                <button onClick={() => handleOpen(projetos.id_task)} className='btn-muda-status'></button>
                                                <Card.Text className="header-task-mudastatus">{projetos.status}</Card.Text>
                                            </div>
                                            <AiOutlineMore onClick={() => handleOpenn(projetos.id_task)} className="cor-menu-pontos" />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="name-task-inpprojeto" key={key}>{projetos.descricao_task}</Card.Title>
                                            <Card.Title className="render-footer-card-task">
                                                <FaUser className="people-task" />
                                                <div className="header-nome-pessoa">{projetos.nome_pessoa}</div>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })
                    }
                    <ModaldoMenu />
                    <CorpoModal />
                </>
            )
        }
    }

    /**Esta função faz uma verificação de erro. Caso o Array velha vazio ele retorna uma imagem 
     * de "nenhum item encontrado".
    */
    function VerificaDesenvolvimento() {
        if (totalTaskEmdesenvolvimento === 0) {
            return (
                <h2><img src={imagemerro} alt=" " width={'53%'} style={{ marginLeft: '28%', marginTop: '50%' }} /></h2>
            )
        } else {
            return (
                <>
                    {
                        filtFazendo.map((projetos, key) => {
                            return (
                                <div className="dropzone">
                                    <Card id="card-desenvolvimento" className='card-color' >
                                        <div className="menu-dos-filtros-statusTask">
                                            <div className="menu-dos-filtros-statusTask">
                                                <button onClick={() => handleOpen(projetos.id_task)} className='btn-muda-status'></button>
                                                <Card.Text className="header-task-mudastatus">{projetos.status}</Card.Text>
                                            </div>
                                            <button onClick={() => handleOpenn(projetos.id_task)} className='btn-muda-status'>
                                                <AiOutlineMore className="cor-menu-pontos" />
                                            </button>
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="name-task-inpprojeto" key={key}>{projetos.descricao_task}</Card.Title>
                                            <Card.Title className="render-footer-card-task">
                                                <FaUser className="people-task" />
                                                <div className="header-nome-pessoa">{projetos.nome_pessoa}</div>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })
                    }
                    <ModaldoMenu />
                    <CorpoModal />
                </>
            )
        }
    }
    /**Esta função faz uma verificação de erro. Caso o Array velha vazio ele retorna uma imagem 
     * de "nenhum item encontrado".
    */
    function VerificaConcluído() {
        if (totalTaskConcluído === 0) {
            return (
                <h2><img src={imagemerro} alt=" " width={'53%'} style={{ marginLeft: '28%', marginTop: '50%' }} /></h2>
            )
        } else {
            return (
                <>
                    {
                        filtFeito.map((projetos, key) => {
                            return (
                                <div className="dropzone">
                                    <Card id="card-concl" className='card-color' >
                                        <div className="menu-dos-filtros-statusTask">
                                            <div className="menu-dos-filtros-statusTask">
                                                <button onClick={() => handleOpen(projetos.id_task)} className='btn-muda-status'></button>
                                                <Card.Text className="header-task-mudastatus">{projetos.status}</Card.Text>
                                            </div>
                                            <button onClick={ModaldoMenu} className='btn-muda-status'> <AiOutlineMore className="cor-menu-pontos" /></button>
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="name-task-inpprojeto" key={key}>{projetos.descricao_task}</Card.Title>
                                            <Card.Title className="render-footer-card-task">
                                                <FaUser className="people-task" />
                                                <div className="header-nome-pessoa">{projetos.nome_pessoa}</div>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })
                    }
                    <ModaldoMenu />
                    <CorpoModal />
                </>
            )
        }
    }

    return (
        <div>
            <div id="cabecario-geral-pagina-insp-projeto">
                <div id="iconvoltar-pesquisa">
                    <div>
                        <Link to='/ProjetosConcluidos'>
                            <BsArrowLeft id="icon-voltar-projetosconcluidos" />
                        </Link>
                    </div>
                    <div>
                        <input type="text" id="input-insp-projeto" placeholder="Meu nome é Zé" onChange={handlechange}></input>
                    </div>
                </div>
                <div id="botoes-page-inp-projetos">
                    <div className="btn-editar-pagina-projeto">
                        <Link to={{ pathname: `/Idetiprojeto/${projetos.id_projeto}` }}>
                            <button type="submit">Editar</button>
                        </Link>
                    </div>
                    <div className="btn-excluir-pagina-projeto">
                        <button onClick={() => deleteprojetos(projetos.id_projeto)} aria-label="share" type="submit" to='/pessoas'>Deletar</button>
                    </div>
                </div>
            </div>
            <div>
                <div >
                    <p style={{ color: '#fff' }}>Username:  {projetos.nome_projeto} </p>
                </div>
            </div>
            <div className="d-flex ">
                <div className="col-12 d-flex justify-content-around" style={{ height: "720px" }}>
                    <div className="col-3 d-flex flex-column align-items-center" id="BarraRolagem" >
                        <div id="header-status-afazer" >
                            <IoEllipseSharp id="icon-redondo-status-afazer" />
                            A fazer
                            <Link to={{ pathname: `/PostTasks/${projetos.id_projeto}` }}>
                                <FiPlus id="icon-add-task" />
                            </Link>
                        </div>
                        <VerificaAfazer />
                    </div>
                    <div className="col-3 d-flex flex-column align-items-center" id="BarraRolage"  >
                        <div id="header-status-desenv">
                            <IoEllipseSharp id="icon-redondo-status-desenv" />
                            Em desenvolvimento
                        </div>
                        <VerificaDesenvolvimento />
                    </div>
                    <div className="col-3 d-flex flex-column align-items-center" id="BarraRolag">
                        <div id="header-status-con">
                            <IoEllipseSharp id="icon-redondo-status-con" />
                            Concluídos
                        </div>
                        <VerificaConcluído />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InspProjeto;
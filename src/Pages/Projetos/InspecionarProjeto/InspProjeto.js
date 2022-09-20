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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import 'antd/dist/antd.css';
import { BsTrash } from "react-icons/bs";
import { message } from "antd";
import { RiChat3Line } from "react-icons/ri";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-40%, -40%)',
    width: 400,
    bgcolor: 'rgba(16, 16, 20, 0.5)',
    border: '2px solid #000',
    p: 4,
    color: '#fff'
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
    
    // --------------------------------------- FUNÇÕES DE DELETE ------------------------------
    //função de delete projeto
    function deleteprojetos(id_projeto) {
        api.delete(`/projetos/${id_projeto}`)
        setprojetos(projetos.filter(projetos => projetos.id_projeto !== id_projeto))
    }
    //função de delete task
    function Deletetask() {
        api.delete(`/tasks/${getid}`)
        settasks(tasks.filter(task => task.id_task !== getid))
        console.log('foi')
    }

    // ----------------------- FUNÇÃO DE VERIFICAÇÃO PARA REALIZAR O PUT DE STATUS PROJ -------------------------
    //funtion put de status projeto
    function PutStatusproj() {

        const getstatus = projetos.status
        const [openst, setOpenst] = React.useState(true);
        const handleClosest = () => setOpenst(false);
        var statucucl = 'Concluído'

        const putprojstatus = () => {
            api.put(`/projetos/${id_projeto}/status/`,
                { status: statucucl 
                })
                .then(() => {
                    setOpenst(false)
                    window.location.reload(true);
                });
        }
        if (totalTaskAfazer === 0 && totalTaskEmdesenvolvimento === 0 && getstatus != 'Concluído' && totalTaskConcluído != 0 ) {
            return (
                <>
                    <Modal
                        open={openst}
                        onClose={handleClosest}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Você quer marca esse Projeto como concluido?
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div>
                                    <button className="btn-modal-put-status" onClick={putprojstatus}> Sim </button>
                                    <button className="btn-modal-put-status" onClick={handleClosest}> Não </button>
                                </div>
                            </Typography>
                        </Box>
                    </Modal>
                </>
            )
        }
    }

    // --------------------------------------- FUNÇÃO DE FILTRO ------------------------------
    //filtro de task( função de pesquisa de task)
    const handlechange = ({ target }) => {
        if (!target.value) {
            setInitialtasks(initialtasks)
            return;
        }
        const filter = tasks.filter(({ descricao_task }) =>
            descricao_task.toUpperCase().includes(target.value.toUpperCase()))

        setInitialtasks(filter);
    }

    // -------------------------------- MANIPULAÇÃO DOS DADOS DOS GETs GERAIS --------------------

    //pega o id do projeto selecionado e converte para inteiro
    const pegaid = parseInt(id_projeto);

    //filtra as taks com basa no id do projeto 
    const gettask = tasks.filter((get) => get.projeto_id === pegaid);

    //filtro de taks com base no status 
    const filtFazer = gettask.filter((get) => get.status === "Em planejamento");
    const filtFazendo = gettask.filter((get) => get.status === "Em desenvolvimento");
    const filtFeito = gettask.filter((get) => get.status === "Concluído");

    const testeidp = tasks.map((pegaid) => pegaid.pessoa_id)
    //const teste = (gettask.filter((get) => get.status === "Concluído")).length;

    //contadores de tasks com base no status
    var totalTaskAfazer = filtFazer.length;
    var totalTaskEmdesenvolvimento = filtFazendo.length;
    var totalTaskConcluído = filtFeito.length;

    // -------------------------------- FUNÇÕES DE MUDANÇA DE CORES -------------------------
    //função de mudar a cor da fonte com base no nivel
    function MudacorNivel(nivel) {
        if (nivel === 'facil') {
            return '#00DB99'
        }
        else if (nivel === 'medio') {
            return '#E9C46A'
        } else if (nivel === 'dificil') {
            return '#EB5757'
        }
    }
    //função de mudar a cor da fonte com base no status
    function MudacorStatus(status) {
        if (status === 'Em planejamento') {
            return '#EB5757'
        }
        else if (status === 'Em desenvolvimento') {
            return '#E9C46A'
        } else if (status === 'concluido') {
            return '#00DB99'
        }

    }

    // -------------------------------- FUNÇÕES DOS MODAIS -------------------------
    //variavel geral de recebimento do id da task selecionada (onClick)
    var [getid, Setteste] = React.useState();

    // -------------------------------- MODAL 1 -------------------------
    //variavel da manipulação do modal 1
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    //variaveis do seletor modal 1 
    var [valutask, setvalue] = React.useState('');
    const handleChange = (event) => {
        setvalue(event.target.value);
    };

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
            message.success('Cadastrado com Sucesso!')
            window.location.reload(true);

        } else {
            alert("Não cadastrou");
        }
    }
    //modal para realizar o PUT do status de tasks (modal 1)
    function Modaldeputstatus() {
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

    // -------------------------------- MODAL 2 -------------------------
    function Editetask() {
        setOpenn(true)
        setabrir(false)
    }

    //variavel da manipulação do modal 2
    const [openn, setOpenn] = React.useState(false);
    const handleClosen = () => setOpenn(false);
   
    //modal de ediçoes de task (modal 2)
    function ModaldeEdicaoTask() {

        var [vofdesc, setdesc] = useState('');
        console.log(vofdesc)
        const lucas = (e) => {
            setdesc(e.target.value);
        };
        //variaves do modal de ediçoes de task (modal 2)
    var [vofNivel, setAge] = useState('');
    const handleChangeg = (event) => {
        setAge(event.target.value);
    };

    const taskget = tasks.filter((get) => get.id_task === getid);
    const idpessoa = taskget.map((get) => get.pessoa_id)

        const Putdetask = () => {
            api.put(`/tasks/${getid}`, {
                descricao_task: vofdesc,
                nivel: vofNivel,
                pessoa_id: parseInt(idpessoa),
                projeto_id: parseInt(id_projeto),
            })
            window.location.reload(true);
        }
        const handleClosen = () => setOpenn(false);

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
                            <div className="fields">
                                <label>Descrição Task</label>
                                <input type={"text"} placeholder='Digite aqui...' className="inputgeral" onChange={lucas} ></input>
                            </div>
                            <div className="fields">
                            <label>Nivel</label>
                            <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel projeto_id="demo-simple-select-label"></InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                projeto_id="demo-simple-select"
                                                value={vofNivel}
                                                label="Age"
                                                sx={{ bgcolor: 'rgba(33, 34, 45, 0.5)', border: '1px solid #D9D9D9' }}
                                                onChange={handleChangeg}>
                                                <MenuItem value={'facil'} key={'facil'}>facil</MenuItem>
                                                <MenuItem value={'medio'} key={'medio'}>medio</MenuItem>
                                                <MenuItem value={'dificil'} key={'dificil'}>dificil</MenuItem>

                                            </Select>
                                            <p className="error-message"></p>
                                        </FormControl>
                                    </Box>
                            </div>
                        </Typography>
                        <div className="div-btn-modalEdit">
                            <Button variant="outlined" onClick={handleClosen}>Cancelar</Button>
                            <Button variant="outlined" onClick={Putdetask}>Editar</Button>
                        </div>
                    </Box>
                </Modal>
            </>
        );
    }

    // -------------------------------- MODAL 3 -------------------------
    //variaveis modal 3
    const [abrir, setabrir] = React.useState(false);
    const handlefechar = () => setabrir(false);
    //modal 3 
    function lol(id_task) {
        if (id_task !== 0) {
            setabrir(true)
            Setteste(id_task)
            console.log(id_task);
        } else {
            console.log('n foi true')
        }
    }
    //modal de teste para o novo loud (3)
    function Modaldeinformaçoes() {
        const getpeople = tasks.filter((nome) => nome.id_task === getid)
        const nomepeople = getpeople.map((getn) => getn.nome_pessoa)
        const datatesk = getpeople.map((getdata) => getdata.created_at.slice(0, 10))

        function Datanew(data) {
            let Data = new Date(data);
            return Data.toLocaleDateString("pt-BR")
        }
        return (
            <>
                <Modal
                    open={abrir}
                    onClose={handlefechar}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Informações
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <p className="pteste">Responsavel</p>
                            <div style={{ display: 'flex' }}>
                                <FaUser className="people-task" />
                                <div className="header-nome-pessoa" >{nomepeople}</div>
                            </div>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <p className="pteste">Data de inicio</p>
                            <div style={{ display: 'flex' }}>
                                <div className="header-nome-pessoa" >{Datanew(datatesk)}</div>
                            </div>
                        </Typography>
                        <Typography>
                            <div>
                                <button className="btn-novo-style" onClick={Deletetask}> Deletar </button>
                                <button className="btn-novo-style" onClick={Editetask}> Editar </button>
                            </div>
                        </Typography>
                    </Box>
                </Modal>
            </>
        )
    }

    // -------------------------------- FUNÇÃO DE COMENTARIO -------------------------
    //modal comentario função que pega o id da task
    function handleOpeny(id_task) {
        if (id_task !== 0) {
            setOpeny(true)
            Setteste(id_task)
        } else {
            console.log('n foi true')
        }
    }
    const [openy, setOpeny] = React.useState(false);
    const handleClosey = () => setOpeny(false);

    //função de add comentario
    function Comentario() {

    var [comentTasks, setcomentTasks] = useState([])

    var [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    console.log(value)
    useEffect(() => {
        api.get(`/tasks/${getid}/comentarios`)
            .then((response) => {
                setcomentTasks(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )

    function atualiza() {
        api.get(`/tasks/${getid}/comentarios`)
        .then((response) => {
            setcomentTasks(response.data)
        })
        .catch(() => {
            console.log("deu errado")
        })
    }

    function PutcomentTask(){
        if(value != ''){
            api.post(`tasks/${getid}/comentarios`, {
                comentario: value
            })
            .then(() => {
                atualiza()
            })
        }else{ message.error('Campo de vazio') }
    }
    

    //Delete comentario
    function Deletetaskcoment(id_comentario) {
    api.delete(`/tasks/${getid}/comentarios/${id_comentario}`)
    setcomentTasks(comentTasks.filter(comentario => comentario.id_comentario !== id_comentario))
    }

    function Datanew(data) {
        let Data = new Date(data);
        return Data.toLocaleDateString("pt-BR")
    }
        return (
            <>
                <Modal
                    open={openy}
                    onClose={handleClosey}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Comentarios
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div className='stilo-card-coment' >
                                {
                                    comentTasks?.map((pegacoment) => {
                                        return (
                                            <>
                                                <div id='cardtsk'>
                                                    <div>
                                                        <p style={{fontSize:'8px'}} >{Datanew(pegacoment.created_at)}</p>
                                                        <h6  > {pegacoment.comentario}</h6>
                                                    </div>
                                                   <button onClick={() => Deletetaskcoment(pegacoment.id_comentario)} style={{background:'none', fontSize:'12px'}}><BsTrash/></button>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </Typography>
                        <Typography>
                            <div>
                                <input type={"text"} placeholder='digite aqui....' id="input-coment" onChange={handleChange}></input>
                            </div>
                            <div className='btn-put-coment'>

                                <button onClick={PutcomentTask} style={{ background: 'none' }} id='btn-put-coment-post'>Comentar</button>
                                <button onClick={handleClosey} style={{ background: 'none' }} id='btn-put-coment-cancel'>Cancelar</button>

                            </div>
                        </Typography>
                    </Box>
                </Modal>
            </>
        )
    }
    // --------------------------------FUNÇÕES DE VERIFICAÇÃO DE ERROS
    //---------------------------------RENDERIZAÇÃO DOS CARDS DAS TASKS -------------------------
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
                                                <button onClick={() => handleOpen(projetos.id_task)} className='stilo-btn'>
                                                    <div className='btn-muda-status'></div>
                                                    <Card.Text className="header-task-mudastatus">{projetos.status}</Card.Text>
                                                </button>
                                            </div>
                                            <AiOutlineMore onClick={() => lol(projetos.id_task)} className="cor-menu-pontos" />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="name-task-inpprojeto" key={key}>{projetos.descricao_task}</Card.Title>
                                            <Card.Title className="name-task-inpprojeto"><span style={{ color: MudacorNivel(projetos.nivel) }}>{projetos.nivel}</span></Card.Title>
                                            <div>
                                                <button style={{background:'none'}} onClick={() => handleOpeny(projetos.id_task)}>comentarios <RiChat3Line /> </button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })
                    }
                </>
            )
        }
    }
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
                                                <button onClick={() => handleOpen(projetos.id_task)} className='stilo-btn'>
                                                    <div className='btn-muda-status'></div>
                                                    <Card.Text className="header-task-mudastatus">{projetos.status}</Card.Text>
                                                </button>
                                            </div>
                                            <AiOutlineMore onClick={() => lol(projetos.id_task)} className="cor-menu-pontos" />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="name-task-inpprojeto" key={key}>{projetos.descricao_task}</Card.Title>
                                            <Card.Title className="name-task-inpprojeto"><span style={{ color: MudacorNivel(projetos.nivel) }}>{projetos.nivel}</span></Card.Title>
                                            <div>
                                            <button style={{background:'none'}} onClick={() => handleOpeny(projetos.id_task)}>comentarios <RiChat3Line /></button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })
                    }
                </>
            )
        }
    }
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
                                                <button onClick={() => handleOpen(projetos.id_task)} className='stilo-btn'>
                                                    <div className='btn-muda-status'></div>
                                                    <Card.Text className="header-task-mudastatus-conclu">{projetos.status}</Card.Text>
                                                </button>
                                            </div>
                                            <AiOutlineMore onClick={() => lol(projetos.id_task)} className="cor-menu-pontos" />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="name-task-inpprojeto" key={key}>{projetos.descricao_task}</Card.Title>
                                            <Card.Title className="name-task-inpprojeto"><span style={{ color: MudacorNivel(projetos.nivel) }}>{projetos.nivel}</span></Card.Title>
                                            <div>
                                            <button style={{background:'none'}} onClick={() => handleOpeny(projetos.id_task)}>comentarios <RiChat3Line /></button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })
                    }
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

            </div>
            <div>
                <div >
                    <p style={{ color: '#fff', marginTop: '2rem', marginLeft: '50px', fontSize: '25px' }}>{projetos.nome_projeto} </p>
                    <p style={{ color: '#fff', marginBottom: '2rem', marginLeft: '50px' }}>
                        <span style={{ color: MudacorStatus(projetos.status) }}>{projetos.status}</span>
                    </p>
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
            <div className="d-flex ">
                <div className="col-12 d-flex justify-content-around" style={{ height: "720px" }}>
                    <div className="col-3 d-flex flex-column align-items-center" id="BarraRolagem" >
                        <div id="header-status-afazer" >
                            <p>
                                <IoEllipseSharp id="icon-redondo-status-afazer" />
                                Em planejamento
                            </p>
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
                        <PutStatusproj />
                    </div>
                </div>
            </div>
            <Modaldeinformaçoes/>
            <Comentario />
            <ModaldeEdicaoTask />
            <Modaldeputstatus />
        </div>
    )
}
export default InspProjeto;
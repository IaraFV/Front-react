import axios from "axios";
import React from "react";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import './Projetos.css';
import { Link } from 'react-router-dom';
import { FiMoreVertical } from "react-icons/fi";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { BsAlarm } from "react-icons/bs";
import { BsCheckSquare } from "react-icons/bs";
import { BsHourglassSplit } from "react-icons/bs";

function Projetos() {
    function voltar() {
        window.history.back();
    }
    const actions = [
        { icon: <Link to="/ProjetosConcluidos"><BsCheckSquare/></Link>, name: 'Concluido' },
        { icon: <Link to="/Emplanejamento"><BsAlarm /></Link>, name: 'Em planejamento' },
        { icon: <Link to="/Emdesenvolvimento"><BsHourglassSplit/></Link>, name: 'Em desenvovimento' },
       
    ];

    const [post, setpost] = useState([])
    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/projetos/')
            .then((response) => {
                setpost(response.data)
            }).catch(() => {
                console.log("Deu BO Men")
            })
    }, [])

    const meuNovopost = post.filter((valorAtual) => {
        return valorAtual.status.includes("Em planejamento")
    })

    console.log(meuNovopost)
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    return (

        <>

            <div id="informativo">
                <h1 id="titlepessoa" style={{ color: '#fff', marginLeft: '5%', marginTop: '4%' }}>Cadastro de Projetos</h1>

                <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon />}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </SpeedDial>
                </Box>


                <Link to="/AddProjeto">
                    <button id="adicionar">Adicionar Projeto</button>
                </Link>


            </div>



            <div className="geralprojetoc">

                {post.map((post, key) => {
                    return (

                        <>

   
                                <div style={{ width: '18rem', height: '9rem', marginRight: '2%', background: '#21222D', borderRadius: '2rem' }} key={key}>
                                    <div id="header" style={{ color: '#A9DFD8' }}>
                                        <div className="poststatus">{post.status}</div>

                                        <FiMoreVertical style={{ color: '#CCCCCC', display: 'flex', justifyContent: 'flex-end', marginLeft: '95%', marginTop: '-1%' }} />

                                    </div>

                                    <Card.Body>
                                        <h4 style={{ color: '#fff' }}>{post.nome_projeto}</h4>
                                    </Card.Body>
                                </div>
                       


                        </>


                    );

                })}



            </div>
        </>
    );

}

export default Projetos;
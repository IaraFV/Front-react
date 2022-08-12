/*
teste nao mecher IARA!!

import React, {useEffect, useState} from "react";

function Filter (){
    
    const [pessoa, setPessoa] = useState([])

    useEffect(() => {
        const fetchpessoa = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/');
                const data = await response.json();
                
                setPessoa(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchpessoa();
    }, []);
    
    const nome = posts.nome_pessoa
    const lu = nome.map(luc => luc.charAt(0));
    

    return(
        <div>
            
            <ul>
                {lu.map((repo) =>
                <li key={pessoa.id_pessoa}>{repo} </li>
                )}
            </ul>
            
        </div>
);
}
export default Filter;*/

/*/import React, {useEffect, useState} from "react";

function Filter (){
    
    const [pessoa, setPessoa] = useState([])

    useEffect(() => {
        const fetchpessoa = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/');
                const data = await response.json();
                setPessoa(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchpessoa();
    }, []);
    
    const nome = pessoa.nome_pessoa
    
    console.log(nome.charAT(0));

    return(
        <div>
            
            lucas
            
        </div>
);
}
export default Filter;*/
/**
 * onst [initialpessoa, setInitialpessoa] = useState([])
    const [pessoa, setPessoa] = useState([])

    useEffect(() => {
        const fetchpessoa = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/');
                const data = await response.json();
                setInitialpessoa(data);
                setPessoa(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchpessoa();
    }, []);
    const handlechange = ({target}) =>{
        if(!target.value) {
            setPessoa(initialpessoa)
            return
        }
        const filterepo = pessoa.filter(({nome_pessoa}) =>
        nome_pessoa.includes(target.value.toUpperCase()))

        setPessoa(filterepo);
    }

    return(
        <div>
            <div>
                <input type={"text"} onChange={handlechange}></input>
            </div>
            <div>
            <ul>
                {pessoa.map((repo) =>
                <li key={pessoa.id_pessoa}>{repo.nome_pessoa} </li>
                )}
            </ul>
            </div>
        </div>
);
}
export default Filter;
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * import React, {useEffect, useState} from "react";
import Avatar from '@mui/material/Avatar';



function lucas(){

const [initialpessoa, setInitialpessoa] = useState([])
const [pessoa, setPessoa] = useState([])

useEffect(() => {
    const fetchpessoa = async () => {
        try {
            const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/');
            const data = await response.json();
            setInitialpessoa(data);
            setPessoa(data);

        } catch (error) {
            console.log(error);
        }
    };
    fetchpessoa();
}, []);

    return(
        <div>
            {
                pessoa.map(test)
                <Avatar sx={{ bgcolor: [500] }} aria-label="recipe">i</Avatar>
            }
            
        </div>
    )

}
export default lucas;
/*const materials = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium'
  ];
  
  console.log(materials.map(material => material.charAt(0))); 
  */ 
 /**modal codigo bom
  * 
  * /**componentes do modal 
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
/**componentes seletor 
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
  * 
  * /**variavesi do seletor 
  var [valuPessoa, setvalue] = React.useState('');

  /**funçoes de evento das variaves do seletor 
  const handleChange = (event) => {
      setvalue(event.target.value);
  };

  * 
  * /**variaveis do modal 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  * 
  * /**formatação CSS do modal 
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
  *             /*RETORNO
  *         Button onClick={handleOpen}><AiOutlinePlus id="corr" /></Button>
                            <Modal
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                    <form onSubmit={handleSubmit(atualizaequipe)}>
                                        <FormControl fullWidth>
                                            <InputLabel id_pessoa="demo-simple-select-label"></InputLabel>
                                            <Select
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

                                        <Button  type="submit">Enviar dados</Button>
                                    </form>
                                </Box>
                            </Modal>
  */
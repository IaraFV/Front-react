import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom'
import axios from "axios";

export default function ChamaEquipe() {
    const [age, setAge] = React.useState('');
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const [initialequipe, setInitialequipe] = useState([])
    const [equipe, setequipe] = useState([])

    useEffect(() => {
        const fetchequipe = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/');
                const data = await response.json();
                setInitialequipe(data);
                setequipe(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchequipe();
    }, []);
    const handlechange = ({target}) =>{
        if(!target.value) {
            setequipe(initialequipe)
            return
        }
        const filterepo = equipe.filter(({id_equipe}) =>
        id_equipe.includes(target.value))

        setequipe(filterepo);
    }
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id_equipe="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}>
                { equipe.map((repo) =>
            <MenuItem value={10} key={equipe.id_equipe}>{repo.id_equipe}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    );
  }
  /**
   * const getequipe = axios.create({
        baseURL:'https://sistema-aprendizes-brisanet-go.herokuapp.com/equipes/'
    });
  */
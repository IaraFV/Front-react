import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom'
import axios from "axios";

export default function ChamaEquipe(Props) {
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
    
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth onChange={(e) => Props.childToParent(e.target.value)}>
          <InputLabel id_equipe="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id_equipe="demo-simple-select"
            value={age}
            label=""
            onChange={handleChange}>
                { equipe.map((equipe) =>
            <MenuItem value={equipe.id_equipe} key={equipe.id_equipe}>{equipe.id_equipe}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    );
  }
  
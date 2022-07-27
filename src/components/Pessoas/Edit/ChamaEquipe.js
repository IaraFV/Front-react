import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Form from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ChamaEquipe(Props) {
    const [age, setAge] = React.useState('');
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const [ setInitialequipe] = useState([])
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
        <Form fullWidth onChange={(e) => Props.childToParent(e.target.value)}>
          <InputLabel id_equipe="demo-simple-select-label"></InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id_equipe="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}>
                { equipe.map((equipe) =>
            <MenuItem value={equipe.id_equipe} key={equipe.id_equipe}>{equipe.nome_equipe}</MenuItem>
            )}
          </Select>
        </Form>
      </Box>
    );
  }
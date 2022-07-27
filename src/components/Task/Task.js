import React, {useState, useEffect} from "react";
import './Task.css';
import axios  from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


function Task() {

    const [ posts, setPosts ] = useState([])
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [value, setValue] = React.useState(2);

    useEffect(() => {
            axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/tasks/')
            .then((response) => {
                setPosts(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )

return(
      <div >
         <div> 
            <div id="informativo">
                <Link to="/Post">
                    <button className="btn-adicionar">Adicionar Pessoa</button>
                </Link>
            </div>
            <div id="geraltasks">
         {
            posts.map((posts,key) => {

            return (
            <div className="cardtask">
            <Card container spacing={2}  sx={{ width: 345, bgcolor: '#21222D', color: 'white', borderRadius: '1.5rem' }} key={key} >
                <CardHeader className="titlecinco"


                action={
                    <IconButton aria-label="settings">
                    <Checkbox {...label} style={{color:'#CCCCCC', border: '#444444', display: 'flex', justifyContent:'flex-end', marginTop: '-13.5%', marginRight: '3%'}} defaultChecked />
                    </IconButton>
                }
                
                title={
                posts.descricao_task
                }
                />
            
                <CardContent sx={{color: 'white' }}>
                <Typography variant="body2" color="white">
                {posts.nome_pessoa}
                </Typography>
                </CardContent>
                <div className="line-task"></div>
               
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                        color: '#E9C46A',
                    }}
                    >
                    <Rating
                        
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                    />  
                </Box>
                
            </Card>
            </div>
                )
              })
            }
            </div>
</div>
        </div>
)
}

export default Task;
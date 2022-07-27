import React, {useState, useEffect} from "react";
import './inspecionar.css';
import axios  from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';
;

function Inspecionar() {

    const [ posts, setPosts ] = useState([])
    const { id_pessoa } = useParams()

    useEffect(() => {
            axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
            .then((response) => {
                setPosts(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )


return( 
        <div id="geralpessoas">
         {
            posts.map((posts,key) => {

            return (
                <div className="cardpessoas">

                <Card container spacing={2}  sx={{ width: 345, bgcolor: '#21222D', color: 'white' }} key={key} >
                    <CardHeader className="titlecinco"
                    avatar={<Avatar sx={{ bgcolor: [500] }} aria-label="recipe">i</Avatar>}

                    title={
                    posts.nome_pessoa
                    }
                    />
                
                    <CardContent sx={{color: 'white' }}>
                    <Typography variant="body2" color="white">
                    {posts.funcao_pessoa}
                    </Typography>
                    </CardContent>
                    
                </Card>
                </div>
                )
              })
            }
        </div>
   
        
)
}

export default Inspecionar;
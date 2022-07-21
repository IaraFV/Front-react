import React, {useState, useEffect} from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";
import './Pessoas.css';
import { AiFillPlusSquare, AiOutlineOrderedList } from "react-icons/ai";
import { AiTwotoneFilter} from "react-icons/ai";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import usuario from './img/usuario.png'
import axios  from "axios";
import CardGroup from 'react-bootstrap/CardGroup';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, yellow } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function Pessoas() {

    const [ posts, setPosts ] = useState([])


    useEffect(() => {
            axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/')
            .then((response) => {
                setPosts(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, [])

return(
      <div>
         <div> 
         {
            posts.map((posts,key) => {
            return (
            <Card sx={{ width: 345, bgcolor: '#21222D', color: 'white' }} key={key} id="geralcards">
                <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: [500] }} aria-label="recipe">
                    i
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings"  sx={{color: 'white'}}>
                    <MoreVertIcon />
                    </IconButton>
                }
                title={posts.nome_pessoa}

                subheader= {posts.data_contratacao}
                />
                <CardContent sx={{color: 'white' }}>
                <Typography variant="body2" color="white">
                {posts.funcao_pessoa}
                </Typography>
                </CardContent>
                
                <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" sx={{color: 'white'}} >
                    <ModeEditIcon />
                </IconButton>

                <IconButton aria-label="share" sx={{color: 'white'}} >
                    <ShareIcon />
                </IconButton>
                </CardActions>
            </Card>
                )
              })
            }
            </div>
        </div>
)
}
        
            
    
export default Pessoas;
import React, {useState, useEffect} from "react";
import './Task.css';
import axios  from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';

function Task() {

    const [ posts, setPosts ] = useState([])
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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


    function deletePost (id_pessoa) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
        setPosts(posts.filter(post => post.id_pessoa !== id_pessoa))
    }


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
                <CardActions disableSpacing>
                <IconButton> 
                     <Link to={{ pathname: `/Edit/${posts.id_pessoa}` }}>
                        <ModeEditIcon sx={{color: '#E9C46A'}}/>
                     </Link>
                </IconButton>

                <IconButton onClick={() => deletePost(posts.id_pessoa) } aria-label="share" sx={{color: '#E9C46A'}} >
                    <DeleteIcon  />
                </IconButton>
                </CardActions>
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
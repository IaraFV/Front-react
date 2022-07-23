import React, {useState, useEffect} from "react";
import './Pessoas.css';
import axios  from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

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
    }, []
    )


    function deletePost (id) {
        axios.delete(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id}`)
    }


return(
      <div >
         <div> 
            <div id="informativo">
                <h1 id="titlepessoa" style={{color: '#fff', marginLeft: '5%', marginTop: '4%'}}>Cadastro de Pessoas</h1>
                <div id="usuarios">
                <Avatar sx={{ bgcolor: [500] }} aria-label="recipe">
                    i
                </Avatar>
                <Avatar sx={{ bgcolor: [500] }} aria-label="recipe">
                    f
                </Avatar>
                <Avatar sx={{ bgcolor: [500] }} aria-label="recipe">
                    v
                </Avatar>
                </div>
                <Link to="/Post">
                    <button className="btn-adicionar">Adicionar Pessoa</button>
                </Link>
                
                <p style={{color: '#fff', display: 'flex', justifyContent: 'flex-end', marginTop: '-2%', marginRight: '1%'}}></p>
            </div>
            <div id="geralpessoas">
         {
            posts.map((posts,key) => {

            return (
            <div className="cardpessoas">
            <Card container spacing={2}  sx={{ width: 345, bgcolor: '#21222D', color: 'white' }} key={key} >
                <CardHeader className="titlecinco"
                avatar={<Avatar sx={{ bgcolor: [500] }} aria-label="recipe">i</Avatar>}

                action={
                    <IconButton aria-label="settings">
                    <Link to="/Inspecionar"><SearchIcon  sx={{color: '#E9C46A'}}/></Link>
                    </IconButton>
                }
                
                title={
                posts.nome_pessoa
                }
                />
            
                <CardContent sx={{color: 'white' }}>
                <Typography variant="body2" color="white">
                {posts.funcao_pessoa}
                </Typography>
                </CardContent>
                
                <CardActions disableSpacing>
                <IconButton> 
                     <Link to={{ pathname: `/Edit/${posts._id}` }}>
                        <ModeEditIcon sx={{color: '#E9C46A'}}/>
                     </Link>
                </IconButton>

                <IconButton onClick={() => deletePost(posts._id) } aria-label="share" sx={{color: '#E9C46A'}} >
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

export default Pessoas;
import React, {useState, useEffect} from "react";
import './inspecionar.css';
import axios  from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

function Inspecionar() {

    const { id_pessoa } = useParams()

    const [ posts, setPosts ] = useState([])
    

   
    useEffect(() => {
        axios.get(`https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/${id_pessoa}`)
        .then((response) => {
            setPosts(response.data)
        })
    }, [])



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
                      <Link to={{ pathname: `/Inspecionar/${posts.id_pessoa}` }}><SearchIcon  sx={{color: '#E9C46A'}}/></Link>
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
                       <Link to={{ pathname: `/Edit/${posts.id_pessoa}` }}>
                          <ModeEditIcon sx={{color: '#E9C46A'}}/>
                       </Link>
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

export default Inspecionar;
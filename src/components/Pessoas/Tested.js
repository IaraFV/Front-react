/*import React, {useState, useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import axios from "axios";

function Tested(){

    const [pessoa, setPessoa] = useState([])

    useEffect(() => {
        axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/')
            .then((response) => {
                setPessoa(response.data)
               
                
            })
            .catch(() => {
                console.log("deu errado")
            })
    }, []
    )

    var nome = pessoa.map((lucas) => lucas.nome_pessoa);
    var letra = nome.map((ini) => ini.charAt(0));
    
return(
    <div>
        { 
        letra.map((lucas) => {
            return(
                <Avatar sx={{ bgcolor: [500] }} aria-label="recipe">{lucas}</Avatar>
            )
        })
            
        }
    </div>
    )
}
export default Tested;*/
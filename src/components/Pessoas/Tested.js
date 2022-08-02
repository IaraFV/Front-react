import React, {useState, useEffect} from "react";
import Avatar from '@mui/material/Avatar';

function Tested(){

    const [pessoa, setPessoa] = useState([])

    useEffect(() => {
        const fetchpessoa = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/');
                const data = await response.json();
                setPessoa(data);
                

            } catch (error) {
                console.log(error);
            }
        };
        fetchpessoa();
    }, []);
    var nome = pessoa.map((lucas) => lucas.nome_pessoa);
    var letra = nome.map((ini) => ini.charAt(0));
    
return(
    <div>
        {
            letra.map((ld) => {
                return(
                    <Avatar  sx={{ width: '14rem', height: '14rem', fontSize: '8rem' }} aria-label="recipe">{ld}</Avatar>
                    
                )
            })
        
   
    }
        </div>
    )
}
export default Tested;
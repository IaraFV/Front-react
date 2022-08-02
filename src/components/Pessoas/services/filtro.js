import React, {useEffect, useState} from "react";

function Filter (){
    
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
    
    const nome = posts.nome_pessoa
    const lu = nome.map(luc => luc.charAt(0));
    

    return(
        <div>
            
            <ul>
                {lu.map((repo) =>
                <li key={pessoa.id_pessoa}>{repo} </li>
                )}
            </ul>
            
        </div>
);
}
export default Filter;

import React, {useEffect, useState} from "react";

/*function Filter (){
    
    const [pessoa, setPessoa] = useState([])

    useEffect(() => {
        const fetchpessoa = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/');
                const data = await response.json();
                setPessoa(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchpessoa();
    }, []);
    
    const nome = pessoa.nome_pessoa
    
    console.log(nome.charAT(0));

    return(
        <div>
            
            lucas
            
        </div>
);
}
export default Filter;*/
/**
 * onst [initialpessoa, setInitialpessoa] = useState([])
    const [pessoa, setPessoa] = useState([])

    useEffect(() => {
        const fetchpessoa = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/');
                const data = await response.json();
                setInitialpessoa(data);
                setPessoa(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchpessoa();
    }, []);
    const handlechange = ({target}) =>{
        if(!target.value) {
            setPessoa(initialpessoa)
            return
        }
        const filterepo = pessoa.filter(({nome_pessoa}) =>
        nome_pessoa.includes(target.value.toUpperCase()))

        setPessoa(filterepo);
    }

    return(
        <div>
            <div>
                <input type={"text"} onChange={handlechange}></input>
            </div>
            <div>
            <ul>
                {pessoa.map((repo) =>
                <li key={pessoa.id_pessoa}>{repo.nome_pessoa} </li>
                )}
            </ul>
            </div>
        </div>
);
}
export default Filter;
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * import React, {useEffect, useState} from "react";
import Avatar from '@mui/material/Avatar';



function lucas(){

const [initialpessoa, setInitialpessoa] = useState([])
const [pessoa, setPessoa] = useState([])

useEffect(() => {
    const fetchpessoa = async () => {
        try {
            const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/');
            const data = await response.json();
            setInitialpessoa(data);
            setPessoa(data);

        } catch (error) {
            console.log(error);
        }
    };
    fetchpessoa();
}, []);

    return(
        <div>
            {
                pessoa.map(test)
                <Avatar sx={{ bgcolor: [500] }} aria-label="recipe">i</Avatar>
            }
            
        </div>
    )

}
export default lucas;
/*const materials = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium'
  ];
  
  console.log(materials.map(material => material.charAt(0))); 
  */ 
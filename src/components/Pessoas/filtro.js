import React, {useEffect, useState} from "react";

function Filter (){
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
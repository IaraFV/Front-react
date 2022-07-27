import React, { useEffect, useState } from "react";

import './inspecionar.css'
function Inspecionar() {

    const [pessoa, setpessoa] = useState([])

    useEffect(() => {
        const fetchequipe = async () => {
            try {
                const response = await fetch('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/');
                const data = await response.json();
                setpessoa(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchequipe();
    }, []);

    return (
        <div>
            <main>
                <div className="card-insp">
                    <h1>Perfil </h1>
                    <div className="line-post"></div>

                    <div className="body-post">
                    { pessoa.map(() =>{
                        <form>

                        <div className="fields">
                            <label>
                            {pessoa.nome_pessoa}
                            </label>
                            <input type="text" name="nome_pessoa"  />
                            <p className="error-message"> </p>
                        </div>

                        <div className="fields">
                            <label>Função</label>
                            <input type="text" name="funcao_pessoa"  />
                            <p className="error-message"> </p>
                        </div>

                       
                        <div className="btn-post">
                            <button type="submit">Sair</button>
                        </div>
                    </form>

                    })
                        
}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Inspecionar;

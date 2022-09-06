import React, { useState } from 'react';
import 'antd/dist/antd.css';
import "./login.css"
import api from "../../services/api"


export default function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const PostEmail = (e) => {
        e.preventDefault()
        api.post('/login/', {
            email: email,
            senha: senha
        })
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                api.defaults.headers.Authorization = `Bearer ${res.data.token}`
                window.location.href = '/Home'
            })
            .catch(err => alert(err))
    }


    return (
        <>


            <div class="container text-center">
                <div class="col">
                    <div class="row"  >
                        <div class='col align-self-center' >

                            <div className="site-input-group-wrapper" id='Login' >
                                <div id="card-login">
                                    <div id='Header-cadastro-login'>Login</div>
                                    <div id="input-email">
                                        <div id='Text-email'>Email</div>
                                        <div class="input-group flex-nowrap" >
                                            <input
                                                value={email}
                                                id='email'
                                                name='email'
                                                type="text"
                                                class="form-control"
                                                placeholder="Username"
                                                aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => setEmail(e.target.value)} />

                                        </div>
                                    </div>
                                    <div>
                                        <div id='Text-senha'>Senha</div>
                                        <div class="input-group flex-nowrap">
                                            <input type="password" class="form-control" placeholder="Senha" aria-label="Senha" id="input-senha-login" aria-describedby="addon-wrapping" onChange={(e) => setSenha(e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <button id="btn-Login" type="submit" onClick={(e) => PostEmail(e)}>Entrar</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
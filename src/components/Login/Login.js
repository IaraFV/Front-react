import React from 'react';
import 'antd/dist/antd.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space, AutoComplete } from 'antd';
import "./login.css"

function Login() {







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
                                            <input id='slaaa' type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />

                                        </div>
                                    </div>
                                    <div>
                                        <div id='Text-senha'>Senha</div>
                                        <div class="input-group flex-nowrap">
                                            <input type="password" class="form-control" placeholder="Senha" aria-label="Senha" id="input-senha-login" aria-describedby="addon-wrapping" />
                                        </div>
                                    </div>
                                    <div>
                                        <button id="btn-Login" type="submit">Entrar</button>
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
export default Login;
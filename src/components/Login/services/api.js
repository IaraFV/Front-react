import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sistema-aprendizes-brisanet-go.herokuapp.com'
});

const token = localStorage.getItem('token')
if (token){
  api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
}

export default api;
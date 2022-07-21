import axios from "axios";

const api = axios.create({
    baseUrl: 'https://sistema-aprendizes-brisanet-go.herokuapp.com/',
});

export default api;
import axios from "axios";

const api = axios.create({
    url: 'https://sistema-aprendizes-brisanet-go.herokuapp.com/',
});

export default api;
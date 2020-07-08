import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://burger-my-app-good.firebaseio.com/'
});

export default instance;
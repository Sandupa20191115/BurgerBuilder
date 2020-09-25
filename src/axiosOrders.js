import axios from 'axios';

const instance = axios.create(  //creating inscatnces
    {
        baseURL : "https://burgerbuilder-67798.firebaseio.com/"
    }
);

export default instance;
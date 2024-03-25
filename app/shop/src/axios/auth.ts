import axios from 'axios';

const auth = axios.create({
    baseURL: 'http://localhost:5001/api/v1', // TODO: User environmental variable via process.
    timeout: 1000,
});

export default auth;

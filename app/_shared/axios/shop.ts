import axios from "axios";

const shop = axios.create({
    baseURL: "http://localhost:5000/api/v1", // TODO: User environmental variable via process.
    timeout: 1000,
});

export default shop;

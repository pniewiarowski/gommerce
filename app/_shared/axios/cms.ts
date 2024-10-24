import axios from "axios";

const cms = axios.create({
    baseURL: "http://localhost:1120/api/v1", // TODO: User environmental variable via process.
    timeout: 1000,
});

export default cms;

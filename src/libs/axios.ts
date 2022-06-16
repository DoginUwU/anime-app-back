import axios from "axios";

const api = axios.create({
    timeout: 10000,
});

export { api };
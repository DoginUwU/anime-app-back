import axios from "axios";
import AppError from "../errors/AppError";

const api = axios.create({
    timeout: 10000,
});

//add X-Requested-With header
api.interceptors.response.use(
    (config) => {
        return config;
    }
    , (error) => {
        console.log(error.response);
        throw new AppError(error.message, 500);
    }
);

export { api };
import axios from "axios";
import AppError from "../errors/AppError";

const api = axios.create({
    baseURL: 'https://still-brushlands-24168.herokuapp.com/',
    timeout: 10000,
});

// log headers
api.interceptors.request.use(config => {
    console.log(config.headers);
    return config;
}
    , error => {
        console.log(error);
        return Promise.reject(error);
    }
);
api.interceptors.response.use(config => {
    console.log(config.headers);
    return config;
}
    , error => {
        console.log(error);
        return Promise.reject(error);
    }
);

export { api };
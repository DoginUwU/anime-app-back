import axios from "axios";
import AppError from "../errors/AppError";

const api = axios.create({
    baseURL: "https://still-brushlands-24168.herokuapp.com/",
    timeout: 10000,
});

//add X-Requested-With header
api.interceptors.request.use(
    (config) => {
        // @ts-ignore
        config.headers["X-Requested-With"] = "XMLHttpRequest";
        return config;
    }
    , (error) => {
        throw new AppError(error.message, 500);
    }
);

export { api };
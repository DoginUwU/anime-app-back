import axios from "axios";
import AppError from "../errors/AppError";

const api = axios.create({
    baseURL: "https://still-brushlands-24168.herokuapp.com/",
});

//intercep 403 error
api.interceptors.response.use(
    (response) => {
        return response;
    }
    , (error) => {
        if (error.response.status === 403) {
            throw new AppError(error.response.data.message, 403);
        }
        return Promise.reject(error);
    }
);

export { api };
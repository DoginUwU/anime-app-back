import axios from "axios";
import AppError from "../errors/AppError";

const api = axios.create({
    baseURL: "https://still-brushlands-24168.herokuapp.com/",
    timeout: 10000,
});

export { api };
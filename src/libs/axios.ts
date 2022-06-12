import axios from "axios";
import AppError from "../errors/AppError";

const api = axios.create({
    timeout: 10000,
});

export { api };
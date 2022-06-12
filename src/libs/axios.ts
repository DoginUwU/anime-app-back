import axios from "axios";

const api = axios.create({
    baseURL: "https://still-brushlands-24168.herokuapp.com/",
});

export { api };
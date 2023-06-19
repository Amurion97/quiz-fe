import axios from "axios";

export const customAPIv1 = () => axios.create({
    baseURL: 'http://127.0.0.1:8001/v1/',
    headers: {
        Authorization: `Bearer ${(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).token : ""}`
    }
})


import axios from "axios";

export const customAPIv1 = () => {
    console.log("process.env.BE:", process.env.BE)
    return axios.create({
        baseURL: process.env.BE ? process.env.BE : 'http://127.0.0.1:5000/v1/',
        headers: {
            Authorization: `Bearer ${(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).token : ""}`
        }
    })
}


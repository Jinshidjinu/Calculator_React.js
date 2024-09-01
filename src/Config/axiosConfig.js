import axios from "axios";

const axiosInsatance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    withCredentials:true
})

export default axiosInsatance
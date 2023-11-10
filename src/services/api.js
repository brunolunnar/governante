import axios from "axios"

const api = axios.create({
    baseURL: "https://governante.vercel.app",
})

export default api
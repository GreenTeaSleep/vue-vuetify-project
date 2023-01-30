import axios from "axios"
import config from "@/config"

const axiosClient = axios.create({
  baseURL: config.baseAPI,
})

export default axiosClient

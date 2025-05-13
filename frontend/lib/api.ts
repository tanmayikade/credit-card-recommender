import axios from "axios"
import { getCookie } from "./auth"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  // Allow self-signed certificates in development
  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: process.env.NODE_ENV === "production",
  }),
})

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const token = getCookie("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api

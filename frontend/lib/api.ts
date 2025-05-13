import axios from "axios"
import { getCookie } from "./auth"
import toast from "react-hot-toast"

// Create axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle error responses
    const errorMessage = error.response?.data?.detail || "An unexpected error occurred"

    // Don't show toast for 401 errors (handled by the components)
    if (error.response?.status !== 401) {
      toast.error(errorMessage)
    }

    // Handle authentication errors
    if (error.response?.status === 401) {
      // If on a protected route, redirect to login
      if (typeof window !== "undefined" && !window.location.pathname.includes("/callback")) {
        // Don't redirect if already on the home page
        if (window.location.pathname !== "/") {
          window.location.href = "/"
        }
      }
    }

    return Promise.reject(error)
  },
)

export default api
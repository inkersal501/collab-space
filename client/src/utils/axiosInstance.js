import axios from "axios";
import { api_endpoint } from "./config";

const api = axios.create({
  baseURL: api_endpoint, 
  withCredentials: true,  
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;

      // prevent infinite loop if already on /login
      if (currentPath !== "/login") {
        // Clear auth storage if needed
        // localStorage.removeItem("accessToken");
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
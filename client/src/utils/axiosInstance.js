import axios from "axios";
import { api_endpoint } from "./config";

const api = axios.create({
  baseURL: api_endpoint, 
  withCredentials: true,  
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
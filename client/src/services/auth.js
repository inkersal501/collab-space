import { toast } from "react-toastify"; 
import api from "@utils/axiosInstance";

const login = async (data) => { 
    try {
        const result = await api.post(`/auth/login`, data);
        if(result.status === 200){
            toast.success(result.data.message);        
            return result.data.user;
        }            
    } catch (error) {  
        toast.error(error.response.data.message);
        return false;
    }
};

const google_auth = async (idToken) => {
    try {
        const result = await api.post(`/auth/google_auth`, {idToken}); 
        if(result.status === 200){
            toast.success(result.data.message);
           return result.data.user;
        }            
    } catch (error) {
        toast.error(error.response.data.message);
        return false;
    }
};

const register = async (data) => {
    try {
        const result = await api.post(`/auth/register`, data); 
        if(result.status === 201){
            toast.success(result.data.message);
            return true;
        }            
    } catch (error) {
        toast.error(error.response.data.message);
        return false;
    }
};

const refresh = async () => {
    try {
        await api.get(`/auth/refresh`);    
    } catch (error) {   
        console.error(error); 
    }
};

const me = async () => {
    try {
        const result = await api.get(`/auth/me`);
        if(result.status === 200){     
            return {status: true, data : result.data.user};
        } else {
            return {status: false};
        }        
    } catch (error) {   
        console.error(error);
        return {status: false};
    }
};

export default { login, register, google_auth, refresh, me };
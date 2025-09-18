import { toast } from "react-toastify"; 
import api from "@utils/axiosInstance";

const getIdeas = async ({ page, limit }) => {
    try {
        const result = await api.get(`/idea?page=${page}&limit=${limit}`);
        return result.data;
    } catch (error) {
        console.error(error.response.data.message);
    }
};

const postIdea = async (idea) => {
    try {
        const result = await api.post("/idea", {idea});
        toast.success("Your idea posted successfully.");
        return result.status === 201;
    } catch (error) {
        // console.error(error.response.data.message);
        toast.error(error.response.data.message);
    }
};

const likeIdea = async (id)=>{
    try {
        const result = await api.post(`/idea/${id}/like`); 
        return result.data.likes;
    } catch (error) {
        // console.error(error.response.data.message);
        throw new Error(error.response.data.message)
    }
}; 

const commentIdea = async (id, comment) => {
    try {
        const result = await api.post(`/idea/${id}/comment`, {comment}); 
        return result.data;
    } catch (error) {
        // console.error(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export default { getIdeas, postIdea, likeIdea, commentIdea };
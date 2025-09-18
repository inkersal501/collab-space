import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ideaService } from "@services";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@store/authSlice";

function Like({ ideaId, ideaLikes }) {

    const { user } = useSelector((state) => state.auth);        
    const [userLike, setUserLike] = useState(false);
    const [likes, setLikes] = useState(ideaLikes || 0);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (user?.likedIdeas?.includes(ideaId)) {
            setUserLike(true);
        } else {
            setUserLike(false);
        }
    }, [user, ideaId]);

    const handleLike = async () => {
        const isLiking = !userLike;
        setUserLike(isLiking);
        try {
            const updatedLikes = await ideaService.likeIdea(ideaId);
            let likedIdeas = [...(user?.likedIdeas || [])];
            if (isLiking) {
                if (!likedIdeas.includes(ideaId)) likedIdeas.push(ideaId);
            } else {
                likedIdeas = likedIdeas.filter((id) => id !== ideaId);
            }

            dispatch(login({ ...user, likedIdeas }));
            setLikes(updatedLikes);
        } catch (error) {
            console.error("Failed to like:", error); 
            setUserLike(!isLiking); 
        }
    };

    return (
        <button
            onClick={handleLike}
            className={`flex items-center gap-1 ${
            userLike ? "text-red-500" : "hover:text-red-500"
            }`}
        >
            <FaHeart /> <span>{likes}</span>
        </button>
    );
}

export default Like;

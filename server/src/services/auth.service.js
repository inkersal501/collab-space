import {ideaModel, userModel} from "../models/index.js";
import {OAuth2Client} from "google-auth-library"; 
import config from "../config.js";
import axios from "axios";
import { ideaService } from "./index.js";
 
const google_client = new OAuth2Client(config.googleClientid);

const login = async (data) => { 
    const {email, password} = data;
    if(email === "" || password === ""){
        throw new Error("Email or Password is empty.");
    }else{
        try {
            const user = await userModel.findOne({email});
            if(!user)
                throw new Error("Login failed. User not found.");
            if(user && user.isGoogleAuth)
                throw new Error("Please Continue login with Google.");
            if(user && !(await user.isPasswordMatch(password)))
                throw new Error("Login failed. Incorrect password.");              
            // await loginModel.create({email, token});
            const { username, _id, avatar } = user; 
            const likedIdeas = await ideaService.getMyLikes(user._id);
            return {_id, username, email, avatar, likedIdeas};
        } catch (error) {
            throw new Error(`${error.message}.`);
        }
    }
};

const register = async (data) => { 
    const emailCheck = await userModel.findOne({email: data.email}); 
    if(emailCheck)
        throw new Error("Email already exists."); 
    if(data.password.length<8)
        throw new Error("Register failed. Password must contain at least 8 characters.");

    try {
        const user = await userModel.create({...data});
        // await chatModel.create({participants: [user._id], lastMessage: null, isSelfChat: true});    
        // const welcome = await welcomeEmail(user);   
        // console.log(welcome?"Welcome Mailto: "+ user.email:"Error sending welcome :"+welcome);

        return true;
    } catch (error) {
        throw new Error(`Register failed. ${error.message}.`);
    }  
};

const google_auth = async (idToken) => {
    try { 
        
        const ticket = await google_client.verifyIdToken({idToken, audience: config.google_client_id});
        const payload = ticket.getPayload(); 
        const {email, name, picture} =  payload;  

        let user = await userModel.findOne({email});
        let avatarBase64 = user?.avatar!=="" || null;

        if (!avatarBase64 && picture) {
            try {
                const response = await axios.get(picture, { responseType: "arraybuffer" });
                avatarBase64 = `data:image/jpeg;base64,${Buffer.from(response.data, "binary").toString("base64")}`;
            } catch (err) {
                console.error("Failed to fetch Google avatar:", err);
                avatarBase64 = "";  
            }
        }
        
        if(!user) {
            user = await userModel.create({email, username: name, isGoogleAuth : true, avatar: avatarBase64 || ""}); 
        } else{ 
            if(user.username !== name) user.username = name;
            if(!user.avatar && avatarBase64) user.avatar = avatarBase64 || "";
            await user.save();
        }
        const { _id } = user; 
        const likedIdeas = await ideaService.getMyLikes(user._id);
        return {_id, username : name, email, avatar: user.avatar, likedIdeas};
    } catch (error) {
        throw new Error(`Google SignIn failed. ${error.message}.`);
    }
};
 

export default { login, register, google_auth };
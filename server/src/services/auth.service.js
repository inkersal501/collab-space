import {userModel} from "../models/index.js";
import {OAuth2Client} from "google-auth-library"; 
import config from "../config.js";

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
            const { username, _id } = user; 
            return {_id, username, email};
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

const google_auth = async () => {

};
 ;

export default { login, register, google_auth };
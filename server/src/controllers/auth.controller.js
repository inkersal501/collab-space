import config from "../config.js";
import { authService, tokenService } from "../services/index.js";

const login = async (req, res) => { 
    try {
        const user = await authService.login(req.body);  
        const accessToken = tokenService.generateAccessToken(user);
        const refreshToken = tokenService.generateRefreshToken(user);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: config.node_env === "production",
            sameSite: config.node_env === "production"?"none": "lax",
            maxAge: 24 * 60 * 1000, // 24 mins
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config.node_env === "production",
            sameSite: config.node_env === "production"?"none": "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        }); 
        const {username, email, avatar, likedIdeas} = user;
        res.json({message: "Sign In succesfull.", user:{username, email, avatar, likedIdeas} });
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const register = async (req, res) => {
    try { 
        await authService.register(req.body);   
        res.status(201).send({message: "Sign Up successfully."});
    } catch (error) {
        res.status(500).send({message: error.message});
    } 
};

const google_auth = async (req, res) => {
    const { idToken } = req.body;
    try {
        const user = await authService.google_auth(idToken);  
        const accessToken = tokenService.generateAccessToken(user);
        const refreshToken = tokenService.generateRefreshToken(user);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: config.node_env === "production",
            sameSite: config.node_env === "production"?"none": "lax",
            maxAge: 24 * 60 * 1000, // 24 mins
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config.node_env === "production",
            sameSite: config.node_env === "production"?"none": "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        }); 
        const {username, email, avatar, likedIdeas} = user;
        res.json({message: "Sign In succesfull.", user:{username, email, avatar, likedIdeas} });
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const refresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: "No refresh token" });

        const decoded = tokenService.verifyRefreshToken(token);
        if(!decoded){ 
            return res.status(403).json({ message: "Invalid refresh token" });
        }         
        const accessToken = tokenService.generateAccessToken({_id: decoded.id, email: decoded.email});
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: config.node_env === "production",
            sameSite: config.node_env === "production"?"none": "lax",
            maxAge: 24 * 60 * 1000, // 24 mins
        });
        res.json({ message: "Access token refreshed" });      
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const me = async (req, res) => {
    const {username, email, avatar, likedIdeas} = req.user;
    res.json({message: "User fetching succesfull.", user: {username, email, avatar, likedIdeas} });
};

const logout = async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Sign out successfully" });
};


export default { login, register, google_auth, refresh, me, logout };
import { userModel } from "../models/index.js";
import { tokenService } from "../services/index.js";

const authenticate = async (req, res, next) => {
  try {
    let token = req.cookies.accessToken;
 
    let decoded = tokenService.verifyAccessToken(token);

    if (!decoded) { 
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ message: "No token provided" });
      }

      const refreshDecoded = tokenService.verifyRefreshToken(refreshToken);
      if (!refreshDecoded) {
        return res.status(401).json({ message: "Invalid or expired refresh token" });
      }
  
      const user = await userModel.findById(refreshDecoded.id).select("_id username email");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newAccessToken = tokenService.generateAccessToken(user);

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 1000,
      });
      decoded = { id: user._id };
    }
 
    req.user = await userModel.findById(decoded.id).select("_id username email");
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default authenticate;

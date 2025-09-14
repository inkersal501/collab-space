import jwt from "jsonwebtoken";
import config from "../config.js";
  
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },  
    config.jwt_access_secret,
    { expiresIn: config.jwt_access_expire }
  );
};
 
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    config.jwt_refresh_secret,
    { expiresIn: config.jwt_refresh_expire }
  );
};
 
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.jwt_access_secret);
  } catch (error) {
    return null;  
  }
};
 
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.jwt_refresh_secret);
  } catch (error) {
    return null;
  }
};

export default {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken};
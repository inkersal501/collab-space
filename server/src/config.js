import dotenv from "dotenv";

dotenv.config();

const config =  {
    port : process.env.PORT,
    db_url : process.env.MONGODB_URI,
    jwt_access_secret : process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret : process.env.JWT_REFRESH_SECRET,
    jwt_access_expire : process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    jwt_refresh_expire : process.env.JWT_REFRESH_EXPIRATION_MINUTES,
    node_email : process.env.NODE_EMAIL,
    node_password : process.env.NODE_PASSWORD,
    app_url : process.env.APP_URL,
    google_client_id : process.env.GOOGLE_CLIENT_ID,
    redis_url : process.env.REDIS_URL,
    node_env : process.env.NODE_ENV
};

export default config;

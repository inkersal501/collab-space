import express from "express";
import compression from "compression";
import cors from "cors";
import routes from "./routes/index.js";
import mongoose from "mongoose"; 
import cookieParser from "cookie-parser"; 
import config from "./config.js";  

const app = express(); 

app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(cors({origin: config.app_url, credentials: true}));
 
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api", routes);
 

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});

mongoose
  .connect(config.db_url)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log("Error connecting to DB:", error));
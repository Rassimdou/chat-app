import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import { connect } from "mongoose";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import messagesRoutes from "./routes/message.route.js"
import cors from "cors";


dotenv.config()

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials :true
}));

const PORT = parseInt(process.env.PORT,10) || 5001 ;

app.use("/api/auth",authRoutes)
app.use("/api/message",messagesRoutes)
app.listen(PORT , ()=>{
    console.log("server is running  on PORT :" + PORT);
    connectDB();
})
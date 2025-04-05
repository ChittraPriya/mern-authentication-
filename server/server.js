import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000 
dotenv.config();
connectDB();

const allowedOrigins = ['http://localhost:5173']

app.use (express.json());
app.use (cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true, 
}));


//API Endpoint
app.get ('/', (req,res) => res.send ("API is Working Fine"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Server is Running on PORT : ${port}`));
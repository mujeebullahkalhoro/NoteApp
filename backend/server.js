import express from "express";
import connectDb from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import "./utils/reminderJob.js";
connectDb();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/user', userRoutes);
app.use('/note', noteRoutes); 

app.listen(5000, () => {
  console.log("server is running on port 5000");
});

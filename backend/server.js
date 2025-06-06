import express from "express";
import connectDb from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import { urlencoded } from "express";
import cookieParser from "cookie-parser";

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

app.listen(5000, () => {
  console.log("server is running on port 5000");
});

import express from "express";
import connectDb from "./config/db.js";
connectDb();
const app=express();

app.use(express.json())

app.listen(5000,()=>{
    console.log("server is running on port ", 5000);
    
});
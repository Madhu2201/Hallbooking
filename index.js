import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import hallrouter from "./Router/Booking.Router.js";
import connectDB from "./Database/dbconfig.js";
const app=express();
dotenv.config();
const port = process.env.PORT
app.use(cors());
connectDB();
app.use(express.json())
app.use("/apibooking",hallrouter)
app.listen(port,()=>{
 console.log("My app is listen",port);
})
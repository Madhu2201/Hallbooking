import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const mongoURL=process.env.MONGODBCONNECTIONSTRING;
console.log(mongoURL);
const connectDB=async()=>{
 const connection= await mongoose.connect(mongoURL)
 console.log("connected to mongoose");
 return connection 
}
export default connectDB;
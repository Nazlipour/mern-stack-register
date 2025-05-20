import mongoose from "mongoose";

const connectDB = async () => {
   console.log(process.env.MONGODB_URI)
   await mongoose.connection.on('connected', ()=> {
    console.log("Database Connected...")
   }) 
   await mongoose.connect( `${process.env.MONGODB_URI}/mern-register` )
}

export default connectDB;

   

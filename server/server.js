import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";


const app = express();
const port = process.env.PORT || 4000
connectDB();


app.use(express.json())
app.use(cookieParser())

app.use(cors({ origin:"http://localhost:5173", credentials: true }))

app.get('/', (req, res) => { res.send("API Working 🎊 🎉")})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


app.listen(port, ()=> console.log(`The server listen on port: ${port}`))



app.listen(port, ()=> console.log(`The server listen on port: ${port}`))

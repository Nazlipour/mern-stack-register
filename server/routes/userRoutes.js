import express from "express";
import { getUserData } from "../controllers/userController.js";
import userAuth from "../middleware/authmiddleware.js";


const userRouter = express();

userRouter.get('/data', userAuth ,getUserData)

export default userRouter;
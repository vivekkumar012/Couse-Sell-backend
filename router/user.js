import express from 'express';
import { userModel } from '../db.js';

const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

userRouter.post("/signin", (req, res) => {
    res.json({
        message: "Signin endpoint"
    })
})

userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

export default userRouter;
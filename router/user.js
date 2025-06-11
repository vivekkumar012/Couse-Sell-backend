import express from 'express';
import { userModel } from '../db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {z} from 'zod'
import { JWT_USER_SECRET } from '../config.js';

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    try {
        // const firstname = req.body.firstname;
        // const lastname = req.body.lastname;
        // const email = req.body.email;
        // const password = req.body.password;
        const {firstname, lastname, email, password} = req.body;
        //TODO Add zod validation

        if(!firstname || !lastname || !email || !password) {
            res.json({
                message: "All fields are required for signup"
            })
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await userModel.findOne({
            email: email
        })
        if(user) {
            return res.status(403).json({
                msg: "User already exist with this email"
            })
        }
        await userModel.create({
            firstname: firstname,
            lastname:lastname,
            email: email,
            password: hashedPass
        })
        res.json({
            msg: "User Signup successfully"
        })
    } catch (error) {
        res.status(403).json({
            msg: "Error in user signup func",
            error: error.message
        })
    }
});

userRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email: email
        })
        if(!user) {
            return res.status(402).json({
                msg: "User not exist with this email"
            })
        }
        const decodePass = await bcrypt.compare(password, user.password);
        
        if(!decodePass) {
            return res.status(402).json({
                msg: "Password Not matched"
            })
        }
        const token = jwt.sign({
            userId : user._id
        }, JWT_USER_SECRET);
        res.json({
            msg:"Successfully Signin",
            token
        })
    } catch (error) {
        res.status(403).json({
            msg: "Error in User Signin endpoint",
            error: error.message
        })
    }
});

userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

export default userRouter;
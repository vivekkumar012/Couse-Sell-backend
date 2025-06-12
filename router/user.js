import express from 'express';
import { userModel } from '../db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {z} from 'zod'
import { JWT_USER_SECRET } from '../config.js';
import {userMiddleware} from '../middleware/user.js'

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

userRouter.get("/purchases",userMiddleware, async (req, res) => {
    const userId = req.userId;

    // Find all purchase records associated with the authenticated userId
    const purchases = await purchaseModel.find({
        userId: userId, // Querying purchases by user ID
    });

    // If no purchases are found, return a 404 error response to the client
    if (!purchases) {
        return res.status(404).json({
            message: "No purchases found", // Error message for no purchases found
        });
    }

    // If purchases are found, extract the courseIds from the found purchases
    const purchasesCourseIds = purchases.map((purchase) => purchase.courseId);

    // Find all course details associated with the courseIds
    const coursesData = await courseModel.find({
        _id: { $in: purchasesCourseIds }, // Querying courses using the extracted course IDs
    });

    // Send the purchases and corresponding course details back to the client
    res.status(200).json({
        purchases, // Include purchase data in the response
        coursesData, // Include course details in the response
    });
})

export default userRouter;
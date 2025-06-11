import express from 'express'
import { adminModel, courseModel, userModel } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { z } from 'zod';
import { JWT_ADMIN_SECRET } from '../config.js';
import { adminMiddleware } from '../middleware/admin.js';

const adminRouter = express.Router();

adminRouter.post("/signup", async (req, res) => {
    try {
        const {firstname, lastname, email, password} = req.body;

        if(!firstname || !lastname || !email || !password) {
            res.json({
                msg: "All fields are required for signup"
            })
        }

        const checkAdmin = await adminModel.findOne({
            email: email
        });
        if(checkAdmin) {
            return res.status(403).json({
                msg: "Email already exist"
            })
        }
        const hashPass = await bcrypt.hash(password, 10);
        await adminModel.create({
            firstname,
            lastname,
            email,
            password: hashPass
        })
        res.json({
            message: "Admin SignUp Successfully"
        })
    } catch (error) {
        res.status(403).json({
            msg: "Error in admin Signup",
            error: error.message
        })
    }
})

adminRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await userModel.findOne({
            email: email
        });
        if(!admin) {
            return res.status(403).json({
                msg: "Admin not Found with this email"
            })
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
            return res.status(403).json({
                msg: "Password Incorrect"
            })
        }
        const token = jwt.sign({
            adminId: admin._id
        }, JWT_ADMIN_SECRET);

        res.json({
            message: "Admin Signin Successfully",
            token
        })

    } catch (error) {
        res.status(403).json({
            message: "Error in Admin Signup",
            error: error.message
        })
    }
})

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;

    const { title, description, price, imageUrl } = req.body;
    if(!title || !description || !price || !imageUrl) {
        res.json({
            msg: "All fields are required"
        })
    }
    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })

    res.json({
        message: "Course Created",
        courseId: course._id
    })
})

adminRouter.put("/course", (req, res) => {
    res.json({
        msg: "Signup Admin endpoint"
    })
})

adminRouter.get("/bulk", (req, res) => {
    res.json({
        msg: "Signup Admin endpoint"
    })
})

export default adminRouter;
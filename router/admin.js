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
        //TODO - Zod validation
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
        //TODO - Zod validation

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
            message: "Error in Admin SignIn",
            error: error.message
        })
    }
})

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    //TODO - Zod validation
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

adminRouter.put("/course", adminMiddleware, async (req, res) => {
    try {
        const adminId = req.adminId;

        const { title, description, price, imageUrl, courseId } = req.body;

        const course = await courseModel.findOne({
            _id: courseId,
            creatorId: adminId
        });
        if(!course) {
            res.status(403).json({
                msg: "Course Not exist with this admin id"
            })
        }

        await courseModel.updateOne({
            _id: courseId,
            creatorId: adminId
        }, {
            title: title || course.title,
            description: description || course.description,
            price: price || course.price,
            imageUrl: imageUrl || course.imageUrl
        });

        res.status(200).json({
            msg: "Course Updated",
            courseId: course._id
        })
    } catch (error) {
        res.status(403).json({
            msg: "Error in admin course update",
            error: error.message
        })
    }
})

adminRouter.delete("/course", adminMiddleware, async (req, res) => {
    // Todo: Zod validation
    try {
        const adminId = req.adminId;

        const { courseId } = req.body;

        const course = await courseModel.findOne({
            _id: courseId,
            creatorId: adminId
        })
        if(!course) {
            res.status(403).json({
                msg: "Course not exist with this admin id"
            })
        }
        await courseModel.deleteOne({
            _id: courseId,
            creatorId: adminId
        });

        res.status(200).json({
            msg: "Course Deleted"
        })
    } catch (error) {
        res.status(403).json({
            msg: "Error in course deletion",
            error: error.message
        })
    }
})

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    const courses = await courseModel.find({
        creatorId: adminId
    })
    res.json({
        msg: "All courses",
        courses: courses
    })
})

export default adminRouter;
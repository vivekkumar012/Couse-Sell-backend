import express from 'express';
import { courseModel, purchaseModel, userModel } from '../db.js';
import { userMiddleware } from '../middleware/user.js';

const courseRouter = express.Router();

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    const userId = req.userId;

    const courseId = req.body.courseId;

    const alreadyPurchase = await purchaseModel.findOne({
        courseId: courseId,
        userId: userId
    })
    if(alreadyPurchase) {
        res.status(402).json({
            msg: "You already purchase this course"
        })
    }

    await purchaseModel.create({
        courseId: courseId,
        userId: userId
    })
    res.status(201).json({
        message: "You have successfully bought the course", // Success message after purchase
    });
})

courseRouter.get("/preview", async (req, res) => {
    const courses = await courseModel.find({});

    res.status(200).json({
        courses: courses, 
    });
})

export default courseRouter;

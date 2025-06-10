import express from 'express';
import { courseModel } from '../db.js';

const courseRouter = express.Router();

courseRouter.post("/purchase", (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

courseRouter.get("/preview", (req, res) => {
    res.json({
        message: "courses endpoint"
    })
})

export default courseRouter;

import express from 'express'
import { adminModel } from '../db.js';

const adminRouter = express.Router();

adminRouter.post("/signup", (req, res) => {
    res.json({
        msg: "Signup Admin endpoint"
    })
})

adminRouter.post("/signin", (req, res) => {
    res.json({
        msg: "Signup Admin endpoint"
    })
})

adminRouter.post("/course", (req, res) => {
    res.json({
        msg: "Signup Admin endpoint"
    })
})

adminRouter.put("/course", (req, res) => {
    res.json({
        msg: "Signup Admin endpoint"
    })
})

adminRouter.get("/course/bulk", (req, res) => {
    res.json({
        msg: "Signup Admin endpoint"
    })
})

export default adminRouter;
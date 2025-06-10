import express from 'express'
import mongoose from 'mongoose'

const app = express();

app.post("/user/signup", (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

app.post("/user/signin", (req, res) => {
    res.json({
        message: "Signin endpoint"
    })
})

app.get("/user/purchases", (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

app.post("/course/purchase", (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

app.get("/courses", (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

app.listen(3000);
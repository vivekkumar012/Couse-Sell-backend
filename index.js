import express from 'express'
import mongoose from 'mongoose'
import userRouter from './router/user.js';
import courseRouter from './router/course.js';

const app = express();

app.use("/user", userRouter);
app.use("/courses", courseRouter);


app.listen(3000);
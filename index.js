import express from 'express'
import mongoose from 'mongoose'
import userRouter from './router/user.js';
import courseRouter from './router/course.js';
import adminRouter from './router/admin.js';

const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/courses", courseRouter);

async function main() {
    await mongoose.connect("mongodb+srv://vivekofficial8434:Vivek%4012345@cluster0.jhmtwk9.mongodb.net/course-selling");
    app.listen(3000);   
}

main();
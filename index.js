import express from 'express'
import mongoose from 'mongoose'
import userRouter from './router/user.js';
import courseRouter from './router/course.js';
import adminRouter from './router/admin.js';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);   
}

main();
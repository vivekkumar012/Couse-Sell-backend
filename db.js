import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
console.log("Connected to DB");


const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const adminSchema = new mongoose.Schema({
    firstname:{
        type: String,
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const courseSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    imageUrl: String,
    creatorId: ObjectId
})

const purchaseSchema = new mongoose.Schema({
    userId: ObjectId,
    courseId: ObjectId
})

export const userModel = mongoose.model("users", userSchema);
export const adminModel = mongoose.model("admins", adminSchema);
export const courseModel = mongoose.model("courses", courseSchema);
export const purchaseModel = mongoose.model("purchases", purchaseSchema);
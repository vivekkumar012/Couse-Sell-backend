import express from 'express';
const courseRouter = express.Router();

courseRouter.post("/purchase", (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

courseRouter.get("/courses", (req, res) => {
    res.json({
        message: "courses endpoint"
    })
})

export default courseRouter;

import jwt from 'jsonwebtoken'
import { JWT_USER_SECRET } from '../config.js';


export function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodeData = jwt.verify(token, JWT_USER_SECRET);

    if(decodeData) {
        req.userId = decodeData.id;
        next();
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}
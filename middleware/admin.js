import jwt from 'jsonwebtoken'
import { JWT_ADMIN_SECRET } from '../config.js';


export function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodeData = jwt.verify(token, JWT_ADMIN_SECRET);

    if(decodeData) {
        req.adminId = decodeData.adminId;
        next();
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}
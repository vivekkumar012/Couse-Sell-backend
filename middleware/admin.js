import jwt from 'jsonwebtoken'
import { JWT_ADMIN_SECRET } from '../config.js';


export function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
     try {
        // Verify the token using the JWT Admin Password to ensure it is valid
        const decoded = jwt.verify(token, JWT_ADMIN_SECRET);

        // Set the adminId in the request object from the decoded token for later use
        req.adminId = decoded.adminId;

        // Call the next middleware in the stack to proceed with the request
        next();
    } catch (error) {
        // If the token is invalid or an error occurs during verification, send an error message to the client
        return res.status(403).json({
            message: "You are not Signed in!", // Inform the user that they are not authorized
        });
    }
}
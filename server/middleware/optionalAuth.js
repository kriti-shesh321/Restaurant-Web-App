import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({path: './.env.prod'});
const JWT_SECRET = process.env.JWT_SECRET;

const optionalAuth = (req, res, next) => {
    const token = req.header("Authorization");

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded.id;
        } catch (error) {
            console.warn("Optional auth: Invalid token, continuing as guest.");
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
};

export default optionalAuth;
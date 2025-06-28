import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadProfile.js";
import { signup, login, getUser, updateProfile, deleteUser } from "../controllers/UserController.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get("/", authenticate, getUser);
router.put("/", authenticate, upload.single('profileImage'), updateProfile);
router.delete("/", authenticate, deleteUser); 

export default router;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import { formatImageUrl } from "../utils/imageUrlFormatter.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc user signup
// @route POST api/v1/user/signup
export const signup = async (req, res, next) => {

    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) return res.status(400).json({ message: 'Username, Email and password are required!' });

        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) return res.status(400).json({ message: "User with this email already exists." });

        var usr = {
            name: name,
            email: email,
            password: password
        };

        const created_user = await User.create(usr);

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc user login
// @route POST api/v1/user/login
export const login = async (req, res, next) => {

    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required!' });

        const usr = await User.findOne({ where: { email: email } });
        if (!usr) return res.status(404).json({ message: "User not found." });

        const validPassword = await bcrypt.compare(password, usr.password);
        if (!validPassword) return res.status(400).json({ message: "Password invalid." });

        const token = jwt.sign({ id: usr.id, role: usr.role }, JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({
            message: "Login successful.",
            token: token,
            user: {
                id: usr.id,
                role: usr.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

};

// @desc update user profile
// @route PUT api/v1/user
export const updateProfile = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword } = req.body;

        const currentUser = await User.findOne({ where: { id: req.user } });
        if (!currentUser) return res.status(404).json({ message: "User not found." });

        // updating name
        if (name) currentUser.name = name;

        // updating email
        if (email && email !== currentUser.email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) return res.status(409).json({ message: "Email already in use." });

            currentUser.email = email;
        }

        // updating profile image
        if (req.file) {
            if (currentUser.profileImage) {
                const oldPath = path.join(__dirname, "..", currentUser.profileImage);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            currentUser.profileImage = `/uploads/profile/${req.user}/${req.file.filename}`;
        }

        // updating password
        if (currentPassword && newPassword) {
            const match = await bcrypt.compare(currentPassword, currentUser.password);

            if (!match) return res.status(400).json({ message: "Current password is incorrect!" });
            currentUser.password = newPassword;
        }

        await currentUser.save();

        const { password: _, ...userWithoutPassword } = currentUser.toJSON();

        res.status(200).json({ message: "Profile update successful.", user: userWithoutPassword });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc get logged in user
// @route GET api/v1/user
export const getUser = async (req, res, next) => {
    try {
        const userId = req.user;

        const user = await User.findOne({ where: { id: userId } });

        if (!user) return res.status(404).json({ message: "User not found." });

        const userData = user.toJSON();

        if (userData.profileImage) userData.profileImage = formatImageUrl(userData.profileImage, req);

        delete userData.password;
        if (!userData.googleId) delete userData.googleId;

        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc delete logged in user
// @route DELETE api/v1/user
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.destroy({ where: { id: req.user } });

        if (!user) return res.status(404).json({ message: "User not found." });
        res.status(200).json({ message: "User deleted!" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
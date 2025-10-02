import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/index.js";
import cloudinary from "../config/cloudinary.js";
import { formatImageUrl } from "../utils/imageUrlFormatter.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

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

        const user = await User.create(usr);

        res.status(201).json({ message: "User registered successfully.", user: { id: user.id, name: user.name, email: user.email } });
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

        // updating profile image -> upload to Cloudinary
        if (req.file && req.file.buffer) {
            // create a deterministic public_id so we can delete later
            const publicId = `profile/${req.user}/avatar-${Date.now()}`;

            // upload buffer via upload_stream
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { public_id: publicId, folder: undefined, overwrite: true, resource_type: "image" },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result);
                        }
                    );
                    stream.end(buffer);
                });
            };

            // delete previous cloudinary image if we have stored public id
            if (currentUser.profileImagePublicId) {
                try {
                    await cloudinary.uploader.destroy(currentUser.profileImagePublicId, { resource_type: "image" });
                } catch (err) {
                    console.error("Cloudinary delete failed:", err);
                }
            } else if (currentUser.profileImage) {
                // fallback: try to extract public_id from URL (best-effort). If this fails, skip deletion.
                try {
                    const url = currentUser.profileImage;
                    const parts = url.split("/upload/")[1];
                    if (parts) {
                        // remove file extension and possible version prefix
                        const afterUpload = parts.replace(/\.[a-zA-Z0-9]+(\?.*)?$/, "");
                        const afterVersionRemoved = afterUpload.replace(/^v\d+\//, "");
                        const possiblePublicId = afterVersionRemoved;
                        // attempting destroy - may fail, ignoring errors
                        await cloudinary.uploader.destroy(possiblePublicId, { resource_type: "image" });
                    }
                } catch (err) {
                    console.warn("Could not parse/deleted old cloudinary image - skipping. Err:", err.message || err);
                }
            }

            // Upload new image
            const result = await streamUpload(req.file.buffer);

            // store URL and public id on user
            currentUser.profileImage = result.secure_url;
            currentUser.profileImagePublicId = result.public_id;
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
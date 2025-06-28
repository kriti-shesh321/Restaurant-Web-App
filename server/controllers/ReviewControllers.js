import { Reviews, User } from "../models/index.js";
import { formatImageUrl } from "../utils/imageUrlFormatter.js";

export const getReviews = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const reviews = await Reviews.findAll({
            attributes: { exclude: ['userId'] },
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'profileImage']
            }],
            limit: (limit && limit),
            order: [['createdAt', 'DESC']]
        });

        reviews.forEach(review => {
            if (review.user.profileImage) review.user.profileImage = formatImageUrl(review.user.profileImage, req);
        });

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addReview = async (req, res, next) => {
    const user = req.user;
    const { name, rating, comment } = req.body;

    if (!user && !name) {
        return res.status(401).json({ message: "Please login or enter name." });
    }

    if (!rating) {
        return res.status(400).json({ message: "Please add a rating." });
    }

    try {
        const newReview = new Reviews({
            userId: user ? user : null,
            name,
            rating,
            comment
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteReview = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Review ID is required" });
    }

    try {
        const review = await Reviews.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateReview = async (req, res) => {
    const { id } = req.params;
    const { name, rating, comment } = req.body;

    if (!id || !name || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const updatedReview = await Reviews.findByIdAndUpdate(id, {
            name,
            rating,
            comment
        }, { new: true });

        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
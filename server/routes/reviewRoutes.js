import {Router} from 'express';
import authenticate from '../middleware/authMiddleware.js';
import { getReviews, addReview, updateReview, deleteReview } from '../controllers/ReviewControllers.js';

const router = Router();

router.get('/', getReviews);
router.post('/', authenticate, addReview);

export default router;
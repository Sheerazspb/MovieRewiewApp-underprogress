import express from 'express';
import ReviewController from '../controllers/reviewController.js';
import { isAuth } from '../middlewares/isAuth.js';
import { validate, validateRatings } from '../middlewares/validator.js';
const router = express.Router();

router.post('/add/:movieId',isAuth,validateRatings,validate,ReviewController.addReview)
router.patch('/update/:reviewId',isAuth,validateRatings,validate,ReviewController.updateReview)
router.delete('/delete/:reviewId',isAuth,ReviewController.removeReview)
router.get('/get-reviews-by-movie/:movieId',ReviewController.getReviewsByMovie)



export default router;
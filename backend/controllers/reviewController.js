// import actorModel from "../models/Actor.js";
import movieModel from "../models/Movie.js";
import reviewModel from "../models/Review.js";
// import { v2 as cloudinary } from 'cloudinary';
// import dotenv from "dotenv";
// dotenv.config();
import { sendError } from "../utils/sendError.js";
import mongoose from "mongoose";


class ReviewController {
  static addReview = async (req, res) => {
    try {
      const {movieId} = req.params
      const {content,rating} = req.body
      const userId = req.user._id

      if(!mongoose.isValidObjectId(movieId)) return sendError(res,"Invalid Movie!");
      const movie = await movieModel.findOne({_id:movieId,status:'public'})
      if (!movie) return sendError(res, "Movie not found!",404);
      
      const isAlreadyReviewd = await reviewModel.findOne({ owner: userId, parentMovie: movie._id })
      if (isAlreadyReviewd) return sendError(res, "Sorry you have already reviewed this movie!");

      // Create Review 
      const newReview = new reviewModel({
        owner: userId,
        parentMovie: movie._id,
        content,
        rating,
      })
      // updating movie with review
      movie.reviews.push(newReview._id)
      await movie.save()
      // saving new review
      await newReview.save()
      res.status(201).json({ message:"Your review has been add!" })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static updateReview = async (req, res) => {
    try {
      const {reviewId} = req.params
      const {content,rating} = req.body
      const userId = req.user._id

      if (!mongoose.isValidObjectId(reviewId)) return sendError(res,"Invalid Review ID!");
      const review = await reviewModel.findOne({ _id: reviewId, owner: userId })
      if (!review) return sendError(res, "Review not found!",404);
      
      review.content = content
      review.rating = rating
      
      await review.save()
      res.status(201).json({ message:"Your review has been updated!" })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static removeReview = async (req, res) => {
    try {
      const {reviewId} = req.params
      const userId = req.user._id

      if (!mongoose.isValidObjectId(reviewId)) return sendError(res,"Invalid Review ID!");
      const review = await reviewModel.findOne({ _id: reviewId, owner: userId })
      if (!review) return sendError(res, "Review not found!",404);
      
      const movie = await movieModel.findById(review.parentMovie).select('reviews')
      movie.reviews = movie.reviews.filter((rId) => rId.toString() !== reviewId);

      await reviewModel.findByIdAndDelete(reviewId)
      await movie.save()
      res.status(201).json({ message:"Review removed successfully!" })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static getReviewsByMovie = async (req, res) => {
    try {
      const {movieId} = req.params
      
      if (!mongoose.isValidObjectId(movieId)) return sendError(res,"Invalid Movie ID!");
      
      const movie = await movieModel.findById(movieId).populate({
        path: 'reviews',
        populate:{path : 'owner',select:'name'}
        }).select('reviews')

        const reviews = movie.reviews.map((r) => {
          const {owner,content,rating} = r
          const {name} = owner
          return {
            id: r._id,
            content,
            rating,
            owner: {
              id: owner._id,
              name
            },
          }
        })

      res.status(201).json({reviews})
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

}

export default ReviewController;
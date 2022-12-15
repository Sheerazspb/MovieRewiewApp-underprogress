import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectID, ref: "user", required: true },
  parentMovie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  content: { type: String, trim: true },
  rating: { type: Number, required: true },
});

// Model
const reviewModel = mongoose.model('review', reviewSchema);

export default reviewModel;
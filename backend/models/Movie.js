import mongoose from "mongoose";
import genres from "../utils/genres.js";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  storyLine: { type: String, required: true, trim: true },
  director: { type: mongoose.Schema.Types.ObjectID, ref: "actor" },
  releseDate: { type: Date, required:true },
  status: { type: String, required:true ,enum:['public','private']},
  type: { type: String, required: true},
  genres: { type: [String], required: true,enum:genres},
  tags: { type: [String], required: true},
  cast: [{ actor: { type: mongoose.Schema.Types.ObjectID, ref: "actor" },roleAs:String,leadActor:Boolean}],
  writers: [{ type: mongoose.Schema.Types.ObjectID, ref: "actor" }],
  poster: { type: Object, url: { type: String, required: true }, public_id: { type: String, required: true },responsive:[URL],required:true },
  trailer: { type: Object, url: { type: String, required: true }, public_id: { type: String, required: true }, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectID, ref: "review" }],
  language: { type: String, required: true }
}, { timestamps: true });


// Model
const movieModel = mongoose.model('Movie', movieSchema);

export default movieModel;
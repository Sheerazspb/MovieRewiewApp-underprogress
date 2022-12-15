import actorModel from "../models/Actor.js";
import movieModel from "../models/Movie.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();
import { sendError } from "../utils/sendError.js";
import mongoose from "mongoose";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true
});

class ActorController {
  static createActor = async (req, res) => {
    try {
      const { name, about, gender } = req.body
      const file = req.file
      const newActor = new actorModel({ name, about, gender });
      if (file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { gravity: "face", height: 500, width: 500, crop: "thumb" });
        newActor.avatar = { url: secure_url, public_id }
      }
      await newActor.save()
      res.status(201).json({ actor: { id: newActor._id, name, about, gender, avatar: newActor.avatar?.url } })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static updateActor = async (req, res) => {
    try {
      const { name, about, gender } = req.body
      const file = req.file
      const { actorId } = req.params;
      if (!mongoose.isValidObjectId(actorId)) return sendError(res, "Invalid Request!")
      const actor = await actorModel.findById(actorId);
      if (!actor) return sendError(res, "Invalid request,Record not found!")

      const public_id = actor.avatar?.public_id;
      // remove old Image
      if (public_id && file) {
        const { result } = await cloudinary.uploader.destroy(public_id)
        if (result !== "ok") {
          return sendError(res, "Couldnot remove image from cloud!")
        }
      }
      // Update Actor
      if (file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { gravity: "face", height: 500, width: 500, crop: "thumb" });
        actor.avatar = { url: secure_url, public_id }
      }
      actor.name = name;
      actor.about = about;
      actor.gender = gender;
      await actor.save()
      res.status(201).send({ actor: { _id: actor._id, name, about, gender, avatar: actor.avatar } })

    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static deleteActor = async (req, res) => {
    try {
      let getError;
      const { actorId } = req.params;
      if (!mongoose.isValidObjectId(actorId)) return sendError(res, "Invalid Request!")
      const actor = await actorModel.findById(actorId);
      if (!actor) return sendError(res, "Invalid request,Record not found!", 404)

      const allMovies = await movieModel.find()

      allMovies.forEach(movie => {
        movie.cast.forEach(element => {
          if (actorId === element.actor.toString()) {
            getError = "Can't delete! Actor in use."
          }
        })
        movie.writers.forEach(writer => {
          if (actorId === writer.toString()) {
            getError = "Can't delete! Writer in use."
          }
        })
        if (actorId === movie.director.toString()) {
          getError = "Can't delete! Director in use."
        }
      });

      if (getError) return sendError(res, getError, 404)

      const public_id = actor.avatar?.public_id;
      // remove old Image
      if (public_id) {
        const { result } = await cloudinary.uploader.destroy(public_id)
        if (result !== "ok") {
          return sendError(res, "Couldnot remove image from cloud!")
        }
      }
      await actorModel.findByIdAndDelete(actorId)
      res.json({ message: "Record removed successfully!" })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static searchActor = async (req, res) => {
    try {
      const { query } = req;
      //  const resutl = await actorModel.find({$text:{$search:`"${query.name}"`}})
      if (!query.name.trim()) return sendError(res, 'Search field is empty!');
      const resutl = await actorModel.find({ name: { $regex: query.name, $options: 'i' } })
      res.json({ results: resutl })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static getLatestActor = async (req, res) => {
    try {
      const resutl = await actorModel.find().sort({ createdAt: '-1' }).limit(12)
      res.json(resutl)
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static getSingleActor = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) return sendError(res, "Invalid Request!")
      const actor = await actorModel.findById(id);
      if (!actor) return sendError(res, "Invalid request,Record not found!", 404)
      res.json(actor)
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static getActors = async (req, res) => {
    try {
      const { pageNo = 0, limit = 16 } = req.query;
      // console.log(pageNo);
      const allActors = (await actorModel.find()).length
      // console.log(totalPages);
      const actors = await actorModel.find({}).sort({ createdAt: -1 }).skip(parseInt(pageNo) * parseInt(limit)).limit(parseInt(limit));

      res.json({ profiles: actors, allActors })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

}

export default ActorController;
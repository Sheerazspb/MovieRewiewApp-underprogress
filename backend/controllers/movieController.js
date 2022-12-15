import movieModel from "../models/Movie.js";
import reviewModel from "../models/Review.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();
import { sendError } from "../utils/sendError.js";
import mongoose from "mongoose";
import { averageRatingAggregation, relatedMovieAggregation, topRatedMoviesAggregation } from "../utils/movieAggregationPipeline.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true
});

class MovieController {
  static uploadTrailer = async (req, res) => {
    try {
      const file = req.file
      console.log("file", file)
      if (!file) return sendError(res, "Video file is missing!");
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(file.path, { resource_type: "video" });
      res.status(201).json({ url, public_id })

    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static createMovie = async (req, res) => {
    try {
      const { file, body } = req;
      const { title, storyLine, director, releseDate, status, type, genres, tags, cast, writers, trailer, language } = body
      const newMovie = new movieModel(
        { title, storyLine, releseDate, status, type, genres, tags, cast, trailer, language }
      )
      if (director) {
        if (!mongoose.isValidObjectId(director)) return sendError(res, "Invalid director id")
        newMovie.director = director
      }
      if (writers) {
        for (let writerId of writers) {
          if (!mongoose.isValidObjectId(writerId)) return sendError(res, "Invalid writer ID")
        }
        newMovie.writers = writers
      }
      // uploading poster
      if (file) {
        const { secure_url: url, public_id, responsive_breakpoints } = await cloudinary.uploader.upload(file.path, {
          transformation: { width: 1280, height: 720 },
          responsive_breakpoints: { create_derived: true, max_width: 640, max_images: 3 }
        });
        const poster = { url, public_id, responsive: [] }
        const { breakpoints } = responsive_breakpoints[0]
        if (breakpoints.length) {
          for (let imgObj of breakpoints) {
            const { secure_url } = imgObj;
            poster.responsive.push(secure_url)
          }
        }
        newMovie.poster = poster;
      }

      await newMovie.save();
      res.status(201).json({ id: newMovie._id, title })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static updateMovieWithoutPoster = async (req, res) => {
    try {
      const { movieId } = req.params;
      if (!mongoose.isValidObjectId(movieId)) return sendError(res, "Invalid movie ID")
      const movie = await movieModel.findById(movieId)
      if (!movie) return sendError(res, "Movie not found", 404)

      const { title, storyLine, director, releseDate, status, type, genres, tags, cast, writers, trailer, language } = req.body

      movie.title = title
      movie.storyLine = storyLine
      movie.tags = tags
      movie.releseDate = releseDate
      movie.status = status
      movie.type = type
      movie.genres = genres
      movie.cast = cast
      movie.trailer = trailer
      movie.language = language

      if (director) {
        if (!mongoose.isValidObjectId(director)) return sendError(res, "Invalid director id")
        movie.director = director
      }
      if (writers) {
        for (let writerId of writers) {
          if (!mongoose.isValidObjectId(writerId)) return sendError(res, "Invalid writer ID")
        }
        movie.writers = writers
      }
      await movie.save();
      res.json({ message: "Movie is updated", movie })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static updateMovie = async (req, res) => {
    try {
      const { movieId } = req.params;
      const { file } = req;
      if (!mongoose.isValidObjectId(movieId)) return sendError(res, "Invalid movie ID")
      // if (!req.file) {
      //   sendError(res, "Movie poster is missing!")
      // }
      const movie = await movieModel.findById(movieId)
      if (!movie) return sendError(res, "Movie not found", 404)

      const { title, storyLine, director, releseDate, status, type, genres, tags, cast, writers, language } = req.body

      movie.title = title
      movie.storyLine = storyLine
      movie.tags = tags
      movie.releseDate = releseDate
      movie.status = status
      movie.type = type
      movie.genres = genres
      movie.cast = cast
      // movie.trailer = trailer
      movie.language = language

      if (director) {
        if (!mongoose.isValidObjectId(director)) return sendError(res, "Invalid director id")
        movie.director = director
      }
      if (writers) {
        for (let writerId of writers) {
          if (!mongoose.isValidObjectId(writerId)) return sendError(res, "Invalid writer ID")
        }
        movie.writers = writers
      }

      // update poster

      if (file) {
        const posterId = movie.poster?.public_id;
        if (posterId) {
          // removing old poster from cloud
          const { result } = await cloudinary.uploader.destroy(posterId)
          if (result !== 'ok') {
            sendError(res, "Could not update poster at the moment!")
          }
        }
        // uploading image 
        const { secure_url: url, public_id, responsive_breakpoints } = await cloudinary.uploader.upload(req.file.path, {
          transformation: { width: 1280, height: 720 },
          responsive_breakpoints: { create_derived: true, max_width: 640, max_images: 3 }
        });
        const poster = { url, public_id, responsive: [] }
        const { breakpoints } = responsive_breakpoints[0]
        if (breakpoints.length) {
          for (let imgObj of breakpoints) {
            const { secure_url } = imgObj;
            poster.responsive.push(secure_url)
          }
        }
        movie.poster = poster;
      }

      await movie.save();
      res.json({ message: "Movie is updated!", movie:{
        _id: movie._id,
        title: movie.title,
        language: movie.language,
        poster:movie.poster,
        genres: movie.genres,
        status: movie.status,
      }})
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static deleteMovie = async (req, res) => {
    try {
      const { movieId } = req.params;
      if (!mongoose.isValidObjectId(movieId)) return sendError(res, "Invalid movie ID")
      const movie = await movieModel.findById(movieId)
      if (!movie) return sendError(res, "Movie not found", 404)

      const posterId = movie.poster?.public_id;
      if (posterId) {
        // removing old poster from cloud
        const { result } = await cloudinary.uploader.destroy(posterId)
        if (result !== 'ok') {
          sendError(res, "Could not remove poster from cloud!")
        }
      }
      const trailerId = movie.trailer?.public_id;
      if (!trailerId) sendError(res, "Could not remove trailer from cloud!")

      const { result } = await cloudinary.uploader.destroy(trailerId, { resource_type: 'video' })
      if (result !== 'ok') {
        sendError(res, "Could not remove trailer from cloud!")
      }
      await movieModel.findByIdAndDelete(movieId)
      res.json({ message: "Movie removed successfully" })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };
  static getMovies = async (req, res) => {
    try {
      const { pageNo = 0, limit = 16 } = req.query;
      // console.log(pageNo);
      const allMovies = (await movieModel.find()).length
      const movies = await movieModel.find({}).sort({ createdAt: -1 }).skip(parseInt(pageNo) * parseInt(limit)).limit(parseInt(limit));
      // console.log(allMovies);
      res.json({ movies, allMovies })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };
  static getMovieForUpdate = async (req, res) => {
    try {
      const { movieId } = req.params;
      if (!mongoose.isValidObjectId(movieId)) return sendError(res, "Invalid movie ID")
      const movie = await movieModel.findById(movieId).populate("director writers cast.actor")
      if (!movie) return sendError(res, "Movie not found", 404)

      res.json({
        movie: {
          _id: movie._id,
          title: movie.title,
          storyLine: movie.storyLine,
          poster: movie.poster?.url,
          releseDate: movie.releseDate,
          status: movie.status,
          type: movie.type,
          language: movie.language,
          genres: movie.genres,
          tags: movie.tags,
          director: movie.director,
          writers: movie.writers.map(w => { return { _id: w._id, name: w.name, about: w.about, gender: w.gender, avatar: w.avatar } }),
          cast: movie.cast.map(c => {
            return {
              _id: c._id,
              profile: { _id: c.actor._id, name: c.actor.name, about: c.actor.about, gender: c.actor.gender, avatar: c.actor.avatar },
              roleAs: c.roleAs,
              leadActor: c.leadActor
            }
          })
        }
      })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static searchMovies = async (req, res) => {
    try {
      const { title } = req.query;
      if (!title.trim()) return sendError(res, 'Search field is empty!');
      const movies = await movieModel.find({title: {$regex: title, $options: 'i'}});
      res.json({ results: movies.map(movie => {
        return {
          _id: movie._id,
          title: movie.title,
          poster: movie.poster,
          genres: movie.genres,
          status: movie.status,
          language: movie.language,
        }
     }) })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static getLatestUploads = async (req, res) => {
    try {
      const { limit = 5 } = req.query;
      const results = await movieModel.find({status:'public'}).sort("-createdAt").limit(parseInt(limit));
      const movies =results.map(movie => {
        return {
          _id: movie._id,
          title: movie.title,
          poster: movie.poster?.url,
          storyLine: movie.storyLine,
          trailer: movie.trailer?.url,
        }
     })
      res.json({ movies })
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static getSingleMovie  = async (req, res) => {
    try {
      const { movieId } = req.params;
      if (!mongoose.isValidObjectId(movieId)) return sendError(res, "Invalid movie ID")
      const movie = await movieModel.findById(movieId).populate("director writers cast.actor")
      if (!movie) return sendError(res, "Movie not found", 404)

      const [aggregatedResponse] = await reviewModel.aggregate(averageRatingAggregation(movie._id))
      const reviews = { ratingAvg:0, reviewCount:0 }

      if (aggregatedResponse) {
        const { ratingAvg, reviewCount } = aggregatedResponse
        reviews.ratingAvg = Number(parseFloat(ratingAvg).toFixed(1))
        reviews.reviewCount = reviewCount
      }
      
      res.json({
        movie: {
          _id: movie._id,
          title: movie.title,
          storyLine: movie.storyLine,
          poster: movie.poster?.url,
          releseDate: movie.releseDate,
          status: movie.status,
          type: movie.type,
          language: movie.language,
          genres: movie.genres,
          tags: movie.tags,
          director: {_id: movie.director._id, name: movie.director.name},
          trailer: movie.trailer?.url,
          reviews: {...reviews},
          writers: movie.writers.map(w => { return { _id: w._id, name: w.name,} }),
          cast: movie.cast.map(c => {
            return {
              _id: c._id,
              profile: { _id: c.actor._id, name: c.actor.name, avatar: c.actor?.avatar },
              roleAs: c.roleAs,
              leadActor: c.leadActor
            }
          })
        }
      })
      
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static getRelatedMovies  = async (req, res) => {
    try {
      const { movieId } = req.params;
      if (!mongoose.isValidObjectId(movieId)) return sendError(res, "Invalid movie ID")
      const movie = await movieModel.findById(movieId)
      if (!movie) return sendError(res, "Movie not found", 404)

      const movies = await movieModel.aggregate(relatedMovieAggregation(movie.tags,movie._id))

      const relatedMovies = await Promise.all(movies.map(async (m) => {
        const [aggregatedResponse] = await reviewModel.aggregate(averageRatingAggregation(m._id))
        const reviews = { ratingAvg: 0, reviewCount: 0 }

        if (aggregatedResponse) {
          const { ratingAvg, reviewCount } = aggregatedResponse
          reviews.ratingAvg = Number(parseFloat(ratingAvg).toFixed(1))
          reviews.reviewCount = reviewCount
        }
        return {
          _id: m._id,
          title: m.title,
          poster: m.poster,
          reviews: { ...reviews }
        }
      })) 

      res.json({ relatedMovies })
      
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

  static getTopRatedMovies   = async (req, res) => {
    try {
      const {type ='Film'} = req.query;
      

      const movies = await movieModel.aggregate(topRatedMoviesAggregation(type))

      const topRatedMovies = await Promise.all(movies.map(async (m) => {
        const [aggregatedResponse] = await reviewModel.aggregate(averageRatingAggregation(m._id))
        const reviews = { ratingAvg: 0, reviewCount: 0 }

        if (aggregatedResponse) {
          const { ratingAvg, reviewCount } = aggregatedResponse
          reviews.ratingAvg = Number(parseFloat(ratingAvg).toFixed(1))
          reviews.reviewCount = reviewCount
        }
        return {
          _id: m._id,
          title: m.title,
          poster: m.poster,
          reviews: { ...reviews }
        }
      })) 

      res.json({movies:topRatedMovies})
      
    } catch (error) {
      sendError(res, error.message || error, 500)
    }
  };

}

export default MovieController;
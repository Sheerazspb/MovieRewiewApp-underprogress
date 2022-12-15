import express from 'express';
const router = express.Router();
import { isAuth, isAdmin } from '../middlewares/isAuth.js';
import { uploadImage, uploadTrailer } from '../middlewares/multer.js';
import MovieController from "../controllers/movieController.js";
import { validate, movieValidator, validateTrailer } from '../middlewares/validator.js';
import parseData from "../utils/parseDataHelper.js";

router.post("/upload-trailer", isAuth, isAdmin, uploadTrailer.single("video"),MovieController.uploadTrailer );
router.post("/create-movie", isAuth, isAdmin, uploadImage.single("poster"), parseData, movieValidator,validateTrailer, validate,MovieController.createMovie );
// TODO (add parseData "/update-movie-without-poster/:movieId")
// router.patch("/update-movie-without-poster/:movieId", isAuth, isAdmin,  movieValidator, validate,MovieController.updateMovieWithoutPoster );
router.patch("/update-movie/:movieId", isAuth, isAdmin, uploadImage.single("poster"), parseData, movieValidator, validate, MovieController.updateMovie);
router.delete("/delete-movie/:movieId", isAuth, isAdmin,MovieController.deleteMovie);
router.get("/movies", isAuth, isAdmin,MovieController.getMovies);
router.get("/for-update/:movieId", isAuth, isAdmin,MovieController.getMovieForUpdate);
router.get("/search-movies", isAuth, isAdmin,MovieController.searchMovies);

// for public users
router.get("/latest-uploads", MovieController.getLatestUploads);
router.get("/single-movie/:movieId", MovieController.getSingleMovie);
router.get("/related-movies/:movieId", MovieController.getRelatedMovies);
router.get("/top-rated-movies", MovieController.getTopRatedMovies);



export default router;
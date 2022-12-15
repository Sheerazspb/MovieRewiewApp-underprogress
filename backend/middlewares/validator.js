import { check, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import genres from '../utils/genres.js';

const userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password").trim().not().isEmpty().withMessage("password is missing!").isLength({ min: 6, max: 32 }).withMessage("Password must be 6 to 32 chracters long!"),
]

const validate = async (req, res, next) => {
  // console.log(req.body.trailer)
  const error = validationResult(req).array();
  if (error.length) {
    return res.status(401).json({ status: "failed", message: error[0].msg })
  }
  next()
}

const passwordValidator = [
  check("newPassword").trim().not().isEmpty().withMessage("password is missing!").isLength({ min: 6, max: 32 }).withMessage("Password must be 6 to 32 chracters long!"),
]

const signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password").trim().not().isEmpty().withMessage("password is missing!"),
]

const actorInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("about").trim().not().isEmpty().withMessage("About is required field!"),
  check("gender").trim().not().isEmpty().withMessage("Gender is required field!"),
]

const movieValidator = [
  check("title").trim().not().isEmpty().withMessage("Movie title is missing!"),
  check("storyLine").trim().not().isEmpty().withMessage("Storyline is an important field!"),
  check("language").trim().not().isEmpty().withMessage("Language title is missing!"),
  check("releseDate").trim().isDate().withMessage("Relese date is missing!"),
  check("status").isIn(["public", "private"]).withMessage("Movie status must be public or private!"),
  check("type").trim().not().isEmpty().withMessage("Movie type is missing!"),
  check("genres").isArray().withMessage("Genres must be an array of strings!").custom((value) => {
    for (let gen of value) {
      if (!genres.includes(gen)) throw Error("Invalid genres!")
    }
    return true;
  }),
  check("tags").isArray({min:1}).withMessage("Tags must be an array of strings!").custom((tags) => {
    for (let tag of tags) {
      if (typeof tag !== 'string')throw Error("Tags must be an array of strings!")
    }
    return true;
  }),
  check("cast").isArray().withMessage("Cast must be an array of Objects!").custom((value) => {
    for (let cast of value) {
      if (!mongoose.isValidObjectId(cast.actor)) throw Error("Invalid cast id!") 
      if (!cast.roleAs?.trim()) throw Error("Role as is  issing in cast field!") 
      if (typeof cast.leadActor !== 'boolean') throw Error("Only boolean values are accepted!") 
    }
    return true;
  }),
  // check("trailer").isObject().withMessage("Trailer info must be an  object with url and public_id!").custom(({ url,public_id }) => {
  //   try {
  //    const result = new URL(url)
  //     if (!result.protocol.includes('http')) throw Error("Invalid trailer url!")
  //     const arr = url.split('/')
  //     const publicId = arr[arr.length - 1].split('.')[0];
  //     if (public_id !== publicId) throw Error("Invalid trailer url!");
  //     return true;
  //   } catch (error) {
  //     throw Error("Invalid trailer url!")
  //   }
  // }),
  // check("poster").custom((_,{req}) => {
  //   if (!req.file) throw Error("Poster file is missing!");
  //   return true;
  // })
]

const validateTrailer = check("trailer").isObject().withMessage("Trailer info must be an  object with url and public_id!").custom(({ url, public_id }) => {
  try {
    const result = new URL(url)
    if (!result.protocol.includes('http')) throw Error("Invalid trailer url!")
    const arr = url.split('/')
    const publicId = arr[arr.length - 1].split('.')[0];
    if (public_id !== publicId) throw Error("Invalid trailer url!");
    return true;
  } catch (error) {
    throw Error("Invalid trailer url!")
  }
})

const validateRatings = check("rating","Rating must be a number between 0 and 10").isFloat({min:0,max:10})


// const passwordValidate = async (req, res, next) => {
//   const error = validationResult(req).array();
//   if (error.length) {
//     return res.status(401).json({ status: "failed", message: error[0].msg })
//   }
//   next()
// }

export { userValidator, validate, passwordValidator, signInValidator, actorInfoValidator, movieValidator, validateTrailer, validateRatings };
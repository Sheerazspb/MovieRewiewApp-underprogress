import mongoose from "mongoose";
import passwordResetModel from "../models/passwordReset.js";
import { sendError } from "../utils/sendError.js";
const isValidPassResetToken = async (req,res,next) => {
  try {
    const { token, userId } = req.body;
    console.log("token",token);
    if (!token  || !mongoose.isValidObjectId(userId)) {
      return sendError(res,"Invalid request!")
    }else {
      const resetToken = await passwordResetModel.findOne({owner:userId})
      if (!resetToken) {
        return sendError(res, "Invalid request or token expired!")
      } else {
        if (token.trim() === resetToken.token && { owner: userId } ) {
          // res.json({ valid:true })
          req.resetToken = resetToken;
          next();
        } else {
          return sendError(res, "Unauthorized access,Invalid request!")
        }
      }
    }
  } catch (error) {
    console.log(error);
    return sendError(res, "Internal error!",error.message,500)
  }
}

export { isValidPassResetToken };
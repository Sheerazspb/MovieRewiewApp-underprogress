import { sendError } from '../utils/sendError.js';
import userModel from '../models/User.js';
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    if (!token) return sendError(res, "Invalid token or token expired!")
    const jwtToken = token.split('Bearer ')[1];
    console.log(jwtToken)
    if (!jwtToken) return sendError(res, "Invalid token")
    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const { userId } = decode;
    const user = await userModel.findById(userId);
    if (!user) return sendError(res, "Invalid token User not found", 404)
    // res.json({ user: { id: user._id, name: user.name, email: user.email } });
    req.user = user;
    next();
  } catch (error) {
    return sendError(res, error.message)
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const {user} = req;
    if (user.role !== 'admin') return sendError(res, "Invalid token User not found", 404)
    next();
  } catch (error) {
    return sendError(res, error.message)
  }
}

export {isAuth,isAdmin} 

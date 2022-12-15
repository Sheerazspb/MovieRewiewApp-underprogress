import userModel from "../models/User.js";
import tokenModel from "../models/emailVerification.js";
import passwordResetModel from "../models/passwordReset.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
import mongoose from "mongoose";
import { generateMailTranporter, generateOtp } from "../utils/mail.js";
import { sendError } from "../utils/sendError.js";

class UserController {
  static home = (req, res) => {
    res.send("This is index page");
  };
  static userRegistration = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      return sendError(res, "This email is already in use!")
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const doc = new userModel({
          name: name,
          email: email,
          password: hashPassword,
        });
        await doc.save();

        // generate 6 digit otp for email verifivation
        let OTP = generateOtp();
        // store otp to db
        const saved_user = await userModel.findOne({ email: email })
        const hashOtp = await bcrypt.hash(OTP, salt);
        const newEmailVerificationToken = new tokenModel({ owner: saved_user._id, token: hashOtp })
        await newEmailVerificationToken.save();

        // sending verification email with otp token to user mailbox
        let transport = generateMailTranporter();
        transport.sendMail({
          from: 'verification@movieapp.com',
          to: saved_user.email,
          subject: 'Email Verification',
          html:
            `<h2>Movie Review App</h2>
             <p>Your verification OTP</p>
             <h2>${OTP}</h2>`
        })
        return res.status(201).json({
          user: {
            id: saved_user._id,
            name: saved_user.name,
            email: saved_user.email
          }
        });
      } catch (error) {
        sendError(res, error.message, 500)
      }
    }
  }

  static emailVerify = async (req, res) => {
    try {
      const { userId, OTP } = req.body;
      // console.log(OTP)
      if (mongoose.isValidObjectId(userId)) {
        const user = await userModel.findById(userId)
        // console.log(user)
        if (user) {
          if (user.isVerified) {
            return sendError(res, "User is already verified!")
          } else {
            const getToken = await tokenModel.findOne({ owner: userId })
            // console.log("token",getToken);
            if (!getToken) {
              return sendError(res, "Token expired or not found!", 404)
            } else {
              const isMatch = await bcrypt.compare(OTP, getToken.token)
              if (({ userId: user._id }) && isMatch) {
                user.isVerified = true;
                await user.save();
                await tokenModel.findByIdAndDelete(getToken._id);
                // sending welcome email to user mailbox
                let transport = generateMailTranporter();
                transport.sendMail({
                  from: 'verification@movieapp.com',
                  to: user.email,
                  subject: `Welcome ${user.name}`,
                  html:
                    `<h2>Welcome ${user.name} to our MOVIE Review App,Thanks for choosing us!</h2>`
                })
                const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
                res.json({
                  user: { id: user._id, name: user.name, email: user.email, token: jwtToken, isVerified: user.isVerified, role: user.role },
                  message: ` Hi ${user.name} Your email is veirfied!`,
                });
              } else {
                return sendError(res, "Invalid OTP!")
              }
            }
          }
        } else {
          return sendError(res, "User not found!", 404)
        }
      } else {
        return sendError(res, "Invalid User!")
      }
    } catch (error) {
      sendError(res, error.message, 500)
    }
  }

  static resendEmailVerificationToken = async (req, res) => {
    try {
      const { userId } = req.body;
      if (mongoose.isValidObjectId(userId)) {
        const user = await userModel.findById(userId)
        if (user) {
          if (user.isVerified === true) {
            return sendError(res, "User is already verified!")
          } else {
            const hasToken = await tokenModel.findOne({ owner: user._id })
            if (hasToken) {
              return sendError(res, `OTP already has been sent to ${user.email}`)
            } else {
              // regenerate 6 digit otp for email reverifivation
              let OTP = generateOtp();
              // store otp to db
              const salt = await bcrypt.genSalt(10);
              // const user = await userModel.findOne({ userId })
              const hashOtp = await bcrypt.hash(OTP, salt);
              const newEmailVerificationToken = new tokenModel({ owner: user._id, token: hashOtp })
              await newEmailVerificationToken.save();
              // sending verification email with otp token to user mailbox
              let transport = generateMailTranporter();
              transport.sendMail({
                from: 'verification@movieapp.com',
                to: user.email,
                subject: 'Email Verification',
                html:
                  `<h2>Movie Review App</h2>
             <p>Your verification OTP.The OTP is valid for 1 hour!</p>
             <h2>${OTP}</h2>`
              })
              return res.status(201).json({ message: `OTP has been sent to ${user.email}` });
            }
          }
        } else {
          return sendError(res, "User not found!", 404)
        }
      } else {
        return sendError(res, "Invalid User!")
      }
    } catch (error) {
      sendError(res, error.message, 500);
    }
  }

  static forgetPsswordStatus = async (req, res) => {
    res.json({ valid: true })
  }

  static forgetPassword = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return sendError(res, "Email is missing!")
      } else {
        const user = await userModel.findOne({ email })
        if (!user) {
          return sendError(res, "User not found!", 404)
        } else {
          const hasToken = await passwordResetModel.findOne({ owner: user._id })
          if (hasToken) {
            return sendError(res, "Only after 1 hour you can request for a new Link!")
          } else {
            // JWT Token
            const token = jwt.sign({ owner: user._id }, process.env.JWT_SECRET_KEY);
            const newPasswordResetToken = new passwordResetModel({ owner: user._id, token: token })
            await newPasswordResetToken.save();
            const resetPasswordUrl = `http://localhost:3000/forget-password-status?token=${token}&id=${user._id}`
            // sending verification email with otp token to user mailbox
            let transport = generateMailTranporter();
            transport.sendMail({
              from: 'security@movieapp.com',
              to: user.email,
              subject: 'Reset Password',
              html:
                `
             <p>Hello ${user.name},Please click here to reset your password.Link is valid for 1 hour</p>
             <a href='${resetPasswordUrl}'>Change Password</a>`
            })
            return res.status(201).json({ message: "Link has been sent to your email account!" });
          }
        }
      }
    } catch (error) {
      sendError(res, error.message, 500);
    }
  }

  static resetPassword = async (req, res) => {
    try {
      const { newPassword, userId } = req.body;
      const user = await userModel.findById(userId);
      const isMatchPassword = await bcrypt.compare(newPassword, user.password);
      if (isMatchPassword) {
        return sendError(res, "The new password must be diffrent from the old password!")
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashPassword;
        await user.save();
        await passwordResetModel.findByIdAndDelete(req.resetToken._id);
        let transport = generateMailTranporter();
        transport.sendMail({
          from: 'security@movieapp.com',
          to: user.email,
          subject: 'Password Reset Successfully',
          html:
            `<h1>Password Reset Successfully</h1>
            <p>Hello ${user.name},Now you can use your new password</p>`
        })
        return res.status(201).json({ message: "Password Reset Successfully" });
      }

    } catch (error) {
      sendError(res, error.message, 500);
    }
  }

  static signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return sendError(res, "Email/Password mismatch!", 404)
      } else {
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return sendError(res, "Email/Password mismatch!");
        } else {
          const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
          res.json({ user: { id: user._id, name: user.name, email: user.email,role:user.role, token: jwtToken, isVerified: user.isVerified,role:user.role } })
        }
      }
    } catch (error) {
      sendError(res, error.message, 500);
    }
  }
}

export default UserController;

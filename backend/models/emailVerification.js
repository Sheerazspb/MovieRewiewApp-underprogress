import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectID, ref:"user", required:true},
  token: {type:String, required:true},
  createdAt: {type:Date, expires:3600, default:Date.now} 
});

// emailVerificationSchema.index({ expireAfterSeconds: 60});

// Model
const tokenModel = mongoose.model('emailVerificationToken', emailVerificationSchema);

export default tokenModel;
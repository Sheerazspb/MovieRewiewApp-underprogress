import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  isVerified: { type: Boolean, required: true, default: false },
  role: { type: String, required: true, default: 'user', enum:['admin','user'] },
  join: { type: Date, default: Date.now },
});

// Model
const userModel = mongoose.model('user', userSchema);

export default userModel;
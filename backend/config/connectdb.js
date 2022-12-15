import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "movieApp"
    }
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("DB Connected Successfully...");
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDB;
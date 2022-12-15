import express from "express";
const app = express();
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/connectdb.js";
import userRoutes from "./routes/userRoutes.js";
import actorRoutes from "./routes/actorRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { handleNotFound } from "./utils/sendError.js";

// Morgan for info
app.use(morgan("dev"))
// PORT
const port = process.env.PORT;
// CORS policy
app.use(cors());
// Database url
const DATABASE_URL = process.env.DATABASE_URL;
// Database connection
connectDB(DATABASE_URL);
// middleware to send data from FORM   (MUST WRITE AFTER DB CONNECTION)
// app.use(express.urlencoded({ extended: true }));
// set Template Engine
// app.set('view engine', 'ejs')
// JSON
app.use(express.json());
// Load Routes
app.use('/', userRoutes)
app.use('/actor', actorRoutes)
app.use('/movie', movieRoutes)
app.use('/review', reviewRoutes)



app.use("/*", handleNotFound)



app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));

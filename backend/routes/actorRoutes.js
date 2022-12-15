import express from 'express';
const router = express.Router();
import ActorController from "../controllers/actorController.js"
import { actorInfoValidator, validate } from '../middlewares/validator.js';
import {uploadImage} from '../middlewares/multer.js';
import { isAuth, isAdmin } from '../middlewares/isAuth.js';

router.post("/create",isAuth,isAdmin, uploadImage.single("avatar"), actorInfoValidator, validate,ActorController.createActor);
router.post("/update/:actorId", isAuth, isAdmin, uploadImage.single("avatar"), actorInfoValidator, validate,ActorController.updateActor);
router.delete("/delete/:actorId", isAuth, isAdmin, ActorController.deleteActor);
router.get("/search", isAuth, isAdmin, ActorController.searchActor);
router.get("/latest-uploads", isAuth, isAdmin, ActorController.getLatestActor);
router.get("/actors", isAuth, isAdmin, ActorController.getActors);
router.get("/single/:id", ActorController.getSingleActor);

export default router;
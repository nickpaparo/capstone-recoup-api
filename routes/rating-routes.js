import express from "express";
import * as ratingController from "../controllers/rating-controller.js";
const ratingRouter = express.Router();

ratingRouter.route("/").post(ratingController.newRating);

export default ratingRouter;

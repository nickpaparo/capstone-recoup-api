import express from "express";
import * as reservationController from "../controllers/reservation-controller.js";
const reservationRouter = express.Router();

reservationRouter.route("/").post(reservationController.newReservation);
reservationRouter.route("/:reservation_id").get(reservationController.getOneReservation);

export default reservationRouter
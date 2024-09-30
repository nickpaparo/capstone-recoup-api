import express from "express";
import * as reservationController from "../controllers/reservation-controller.js";
const reservationRouter = express.Router();

reservationRouter.route("/").post(reservationController.newReservation);
reservationRouter
  .route("/:id")
  .get(reservationController.getOneReservation)
  .put(reservationController.updateReservation)
  .delete(reservationController.deleteReservation);
reservationRouter
  .route("/:id/product")
  .get(reservationController.findProductReservation);
reservationRouter.route("/delete").post(reservationController.deleteReservation);
export default reservationRouter;

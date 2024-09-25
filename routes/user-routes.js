import express from "express";
import * as userController from "../controllers/user-controller.js";
const userRouter = express.Router();

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.addUser);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);
userRouter.route("/:id/rental").get(userController.findUserReservations)
userRouter.route("/:id/owner").get(userController.findOwnerReservations)
userRouter.route("/:id/product").get(userController.findUserProduct);
export default userRouter;

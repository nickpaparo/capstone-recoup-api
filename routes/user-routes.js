import express from "express";
import * as userController from "../controllers/user-controller.js";
const userRouter = express.Router();

userRouter
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);
userRouter.route("/:id/rental").get(userController.findUserReservations);
userRouter.route("/:id/owner").get(userController.findOwnerReservations);
userRouter.route("/:id/product").get(userController.findUserProduct);
userRouter.route("/login").post(userController.userLogin);
userRouter.route("/signup").post(userController.addUser);
export default userRouter;

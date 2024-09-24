import express from "express";
import * as userController from "../controllers/user-controller.js";
const userRouter = express.Router();

userRouter.route("/").post(userController.addUser);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default userRouter;

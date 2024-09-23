import express from "express";
import * as userController from "../controllers/user-controller.js";
const userRouter = express.Router();

userRouter.route("/:user_id").get(userController.getUser);
userRouter.route("/").post(userController.addUser);

export default userRouter;
import express from "express";
import {
  getUserInfo,
  login,
  logout,
  refreshAccessToken,
  register,
} from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/refresh-token", refreshAccessToken);
userRouter.get("/logout", logout);
userRouter.get("/:id", verifyToken, getUserInfo);
export default userRouter;

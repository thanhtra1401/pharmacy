import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllCustomers,
  getUserInfo,
  login,
  logout,
  refreshAccessToken,
  register,
  resetPassword,
  updateUser,
  uploadAvatar,
} from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";
import isAdmin from "../middlewares/isAdmin.js";
import { uploadImage } from "../middlewares/uploadImage.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/refresh-token", refreshAccessToken);
userRouter.get("/logout", logout);
userRouter.get("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.put("/:id", verifyToken, updateUser);
userRouter.put(
  "/upload-avatar/:id",

  uploadImage("avatar"),
  uploadAvatar
);
userRouter.get("/:id", verifyToken, getUserInfo);
userRouter.delete("/:id", verifyToken, isAdmin, deleteUser);
userRouter.get("/", verifyToken, isAdmin, getAllCustomers);

export default userRouter;

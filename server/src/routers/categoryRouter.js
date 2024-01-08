import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/categoryController";
import isAdmin from "../middlewares/isAdmin";
import verifyToken from "../middlewares/verifyToken";

const express = require("express");

const categoryRouter = express.Router();
categoryRouter.get("/", getCategory);
categoryRouter.post("/", verifyToken, isAdmin, createCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;

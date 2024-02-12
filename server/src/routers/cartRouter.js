import {
  createCart,
  getCartByUserId,
  getCartSelectedByUserId,
  selectedAll,
  updateCart,
} from "../controllers/cartController";

const express = require("express");

const cartRouter = express.Router();
cartRouter.get("/selected", getCartSelectedByUserId);
cartRouter.get("/", getCartByUserId);
cartRouter.post("/", createCart);
cartRouter.put("/:id", updateCart);
cartRouter.put("/select-all/:id", selectedAll);

export default cartRouter;

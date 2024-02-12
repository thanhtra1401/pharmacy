import {
  addToCart,
  deleteCartDetail,
  updateAmountCartDetail,
  updateSelectedCartDetail,
} from "../controllers/cartDetailController";

const express = require("express");

const cartDetailRouter = express.Router();
cartDetailRouter.post("/add-to-cart", addToCart);
cartDetailRouter.put("/amount/:id", updateAmountCartDetail);
cartDetailRouter.put("/select/:id", updateSelectedCartDetail);
cartDetailRouter.delete("/:id", deleteCartDetail);
export default cartDetailRouter;

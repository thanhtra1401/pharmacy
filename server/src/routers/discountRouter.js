import {
  createDiscount,
  deleteDiscount,
  getDiscount,
  getDiscountById,
  updateDiscount,
} from "../controllers/discountController";

const express = require("express");

const discountRouter = express.Router();
discountRouter.get("/", getDiscount);
discountRouter.get("/:id", getDiscountById);
discountRouter.post("/", createDiscount);
discountRouter.put("/:id", updateDiscount);
discountRouter.delete("/:id", deleteDiscount);
export default discountRouter;

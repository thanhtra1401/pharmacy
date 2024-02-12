import {
  createDiscountDetail,
  deleteDiscountDetail,
  getDiscountDetail,
  updateDiscountDetail,
} from "../controllers/discountDetailController";

const express = require("express");

const discountDetailRouter = express.Router();
discountDetailRouter.get("/", getDiscountDetail);

discountDetailRouter.post("/", createDiscountDetail);
discountDetailRouter.put("/:id", updateDiscountDetail);
discountDetailRouter.delete("/:id", deleteDiscountDetail);
export default discountDetailRouter;

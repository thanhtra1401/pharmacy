import {
  createOrderDetail,
  getOrderDetailInDiscount,
} from "../controllers/orderDetailController";

const express = require("express");

const orderDetailRouter = express.Router();
orderDetailRouter.post("/", createOrderDetail);
orderDetailRouter.get("/in-discount/:discountId", getOrderDetailInDiscount);

export default orderDetailRouter;

import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  getOrdersByMonth,
  updateOrder,
} from "../controllers/orderController";

const express = require("express");

const orderRouter = express.Router();
orderRouter.get("/", getOrders);
orderRouter.get("/by-month", getOrdersByMonth);

orderRouter.get("/:id", getOrderById);
orderRouter.post("/", createOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;

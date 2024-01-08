import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController";

const express = require("express");

const productRouter = express.Router();
productRouter.get("/", getProducts);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
export default productRouter;

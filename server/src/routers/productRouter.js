import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductsDiscount,
  updateProduct,
  uploadMainImageProduct,
} from "../controllers/productController";
import { uploadImage } from "../middlewares/uploadImage";
import verifyToken from "../middlewares/verifyToken";

const express = require("express");

const productRouter = express.Router();
productRouter.get("/", getProducts);
productRouter.get("/discount", getProductsDiscount);
productRouter.post("/", createProduct);

productRouter.put(
  "/upload-main-image/:id",
  verifyToken,
  uploadImage("main-image-product"),
  uploadMainImageProduct
);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/:id", getProduct);
export default productRouter;

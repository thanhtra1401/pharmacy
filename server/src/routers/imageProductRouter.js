const express = require("express");
const {
  createImageProduct,
  updateImageProduct,
  getImageProduct,
} = require("../controllers/imageProductController");
const { uploadImage } = require("../middlewares/uploadImage");

const imageProductRouter = express.Router();
imageProductRouter.get("/", getImageProduct);
imageProductRouter.post("/", uploadImage("product-image"), createImageProduct);
imageProductRouter.put(
  "/:id",
  uploadImage("product-image", updateImageProduct)
);
export default imageProductRouter;

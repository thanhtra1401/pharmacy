import express from "express";
import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";
import productRouter from "./productRouter.js";
import imageProductRouter from "./imageProductRouter.js";
import discountRouter from "./discountRouter.js";
import discountDetailRouter from "./discountDetailRouter.js";
import cartRouter from "./cartRouter.js";
import cartDetailRouter from "./cartDetailRouter.js";
import addressRouter from "./addressRouter.js";
import orderRouter from "./orderRouter.js";
import orderDetailRouter from "./orderDetailRouter.js";

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/category", categoryRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/image-product", imageProductRouter);
rootRouter.use("/discount", discountRouter);
rootRouter.use("/discount-detail", discountDetailRouter);
rootRouter.use("/cart", cartRouter);
rootRouter.use("/cart-detail", cartDetailRouter);
rootRouter.use("/address", addressRouter);
rootRouter.use("/order", orderRouter);
rootRouter.use("/order-detail", orderDetailRouter);
export default rootRouter;

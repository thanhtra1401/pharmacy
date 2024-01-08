import express from "express";
import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";
import productRouter from "./productRouter.js";
import imageProductRouter from "./imageProductRouter.js";

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/category", categoryRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/image-product", imageProductRouter);
export default rootRouter;

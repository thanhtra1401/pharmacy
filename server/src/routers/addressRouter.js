import {
  createAddress,
  deleteAddress,
  getAddressById,
  getAddressByUserId,
  getdefaultAddressByUserId,
  updateAddress,
} from "../controllers/addressController";

const express = require("express");
const addressRouter = express.Router();
addressRouter.get("/get-by-user", getAddressByUserId);
addressRouter.get("/get-default-by-user", getdefaultAddressByUserId);
addressRouter.get("/:id", getAddressById);
addressRouter.post("/", createAddress);
addressRouter.put("/:id", updateAddress);
addressRouter.delete("/:id", deleteAddress);

export default addressRouter;

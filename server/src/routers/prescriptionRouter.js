import {
  createPrescription,
  deletePrescription,
  getPrescription,
  getPrescriptions,
  updatePrescription,
} from "../controllers/prescriptionController";
import { uploadImage } from "../middlewares/uploadImage";

const express = require("express");

const prescriptionRouter = express.Router();
prescriptionRouter.get("/", getPrescriptions);

prescriptionRouter.get("/:id", getPrescription);
prescriptionRouter.put(
  "/create-upload-image",
  uploadImage("prescription-image"),
  createPrescription
);
prescriptionRouter.put("/:id", updatePrescription);
prescriptionRouter.delete("/:id", deletePrescription);

export default prescriptionRouter;

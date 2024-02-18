import {
  createPrescriptionDetail,
  deletePrescriptionDetail,
  updatePrescriptionDetail,
} from "../controllers/prescriptionDetailController";

const express = require("express");

const prescriptionDetailRouter = express.Router();
prescriptionDetailRouter.post("/", createPrescriptionDetail);

prescriptionDetailRouter.put("/:id", updatePrescriptionDetail);
prescriptionDetailRouter.delete("/:id", deletePrescriptionDetail);

export default prescriptionDetailRouter;

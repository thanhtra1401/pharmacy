import { PrescriptionDetail } from "../models";

const createPrescriptionDetail = async (req, res, next) => {
  try {
    const { prescriptionId, productId, amount } = req.body;

    const prescriptionDetail = await PrescriptionDetail.create({
      prescriptionId,
      productId,
      amount,
    });
    if (prescriptionDetail) {
      res.status(200).json({
        success: true,
        message: "Tao chi tiet don thuoc thành công",
        data: {
          prescriptionDetail,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updatePrescriptionDetail = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const { id } = req.params;
    const prescriptionDetail = await PrescriptionDetail.findOne({
      where: {
        id,
      },
    });
    if (prescriptionDetail) {
      prescriptionDetail.amount = amount;
      await prescriptionDetail.save();
      res.status(200).json({
        success: true,
        message: "Thay doi so luong thanh cong",
        prescriptionDetail,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deletePrescriptionDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PrescriptionDetail.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Xoá thành công chi tiet đơn thuốc",
    });
  } catch (error) {
    next(error);
  }
};
export {
  createPrescriptionDetail,
  updatePrescriptionDetail,
  deletePrescriptionDetail,
};

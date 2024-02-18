import {
  Prescription,
  PrescriptionDetail,
  Product,
  DiscountDetail,
  Discount,
} from "../models";

const getPrescriptions = async (req, res, next) => {
  try {
    const { customerId } = req.query;
    if (customerId) {
      const prescriptions = await Prescription.findAll({
        where: { customerId },
      });
      if (prescriptions) {
        res.status(200).json({
          success: true,
          message: "Lấy danh sách đơn thuốc thành công",
          data: {
            prescriptions,
          },
        });
      }
    } else {
      const prescriptions = await Prescription.findAll();
      if (prescriptions) {
        res.status(200).json({
          success: true,
          message: "Lấy danh sách đơn thuốc thành công",
          data: {
            prescriptions,
          },
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getPrescription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prescription = await Prescription.findOne({
      where: { id },
      include: [
        {
          model: PrescriptionDetail,
          include: [
            {
              model: Product,
              include: [
                {
                  model: DiscountDetail,
                  as: "discountList",
                  attributes: ["minAmount", "maxAmount", "active", "id"],
                  include: [
                    {
                      model: Discount,
                      as: "discountProgram",
                      order: ["endAt", "desc"],
                      attributes: [
                        "discountPercent",
                        "startAt",
                        "endAt",
                        "id",
                        "name",
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    if (prescription) {
      res.status(200).json({
        success: true,
        message: "Lấy đơn thuốc thành công",
        data: {
          prescription,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const createPrescription = async (req, res, next) => {
  try {
    const { customerId } = req.query;
    const { file } = req;
    const urlImage = `http://localhost:8000/${file.path}`;
    const prescription = await Prescription.create({
      customerId,
      status: 0,
    });
    if (prescription) {
      prescription.image = urlImage;
      await prescription.save();
      res.status(200).json({
        success: true,
        message: "Tải lên đơn thuốc thành công",
        data: {
          prescription,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updatePrescription = async (req, res, next) => {
  try {
    const { note } = req.body;
    const { id } = req.params;
    const prescription = await Prescription.findOne({
      where: {
        id,
      },
    });
    if (prescription) {
      prescription.note = note;
      prescription.status = 1;
      await prescription.save();
      res.status(200).json({
        success: true,
        message: "Thêm thành công ghi chú",
        data: {
          prescription,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const deletePrescription = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Prescription.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Xoá thành công đơn thuốc",
    });
  } catch (error) {
    next(error);
  }
};
export {
  getPrescriptions,
  getPrescription,
  updatePrescription,
  createPrescription,
  deletePrescription,
};

import { Discount } from "../models";

const getDiscount = async (req, res, next) => {
  try {
    const discounts = await Discount.findAll();
    res.status(200).json({
      success: true,
      message: "Lấy danh sách khuyến mại thành công",
      data: {
        discounts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getDiscountById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const discount = await Discount.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Lấy khuyết mại thành công",
      data: {
        discount,
      },
    });
  } catch (error) {
    nexx(error);
  }
};
const createDiscount = async (req, res, next) => {
  try {
    const { name, description, discountPercent, startAt, endAt } = req.body;
    const discount = await Discount.create({
      name,
      description,
      discountPercent,
      startAt,
      endAt,
    });
    res.status(200).json({
      success: true,
      message: "Tạo thành công chương trình khuyết mại",
      data: {
        discount,
      },
    });
  } catch (error) {
    next(error);
  }
};
const updateDiscount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description, discountPercent, startAt, endAt } = req.body;
    const discount = await Discount.findOne({
      where: {
        id,
      },
    });
    discount.name = name;
    discount.description = description;
    discount.discountPercent = discountPercent;
    discount.startAt = startAt;
    discount.endAt = endAt;
    await discount.save();
    res.status(200).json({
      success: true,
      message: "Cập nhật thành công chương trình khuyến mại",
      data: { discount },
    });
  } catch (error) {
    next(error);
  }
};

const deleteDiscount = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Discount.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Xóa thành công chương trình khuyến mại",
    });
  } catch (error) {
    next(error);
  }
};
export {
  getDiscount,
  getDiscountById,
  createDiscount,
  updateDiscount,
  deleteDiscount,
};

import { Discount, DiscountDetail, Product, Category } from "../models";
import { Op } from "sequelize";
const getDiscount = async (req, res, next) => {
  try {
    const { page, size, valid } = req.query;
    const limit = size ? parseInt(size) : 12;
    const offset = page ? (parseInt(page) - 1) * parseInt(size) : 0;
    const getValid =
      valid === "true" ? { endAt: { [Op.gt]: new Date() } } : null;
    const { count, rows } = await Discount.findAndCountAll({
      where: {
        ...getValid,
      },
      include: [
        {
          model: DiscountDetail,
          include: {
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
        },
      ],
      limit: limit,
      offset: offset,
      distinct: true,
    });
    const totalPages = Math.ceil(count / limit);
    res.status(200).json({
      success: true,
      message: "Lấy danh sách khuyến mại thành công",
      data: {
        totalItems: count,
        discounts: rows,
        currentPage: page ? page : 1,
        totalPages: totalPages,
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
      include: [
        {
          model: DiscountDetail,
          include: {
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
              {
                model: Category,
                attributes: ["name"],
              },
            ],
          },
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: "Lấy khuyết mại thành công",
      data: {
        discount,
      },
    });
  } catch (error) {
    next(error);
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

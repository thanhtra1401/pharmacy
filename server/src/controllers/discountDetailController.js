import { DiscountDetail, Product, Discount } from "../models";
import { Op } from "sequelize";

// const getDiscountDetail = async (req, res, next) => {
//   try {
//     const discountDetails = await DiscountDetail.findAll();
//     res.status(200).json({
//       success: true,
//       message: "Lấy danh sách khuyến mại thành công",
//       discountDetails,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const getDiscountDetail = async (req, res, next) => {
  try {
    const { discountId } = req.params;
    const { page, size } = req.query;

    const limit = size ? parseInt(size) : 12;
    const offset = page ? (parseInt(page) - 1) * parseInt(size) : 0;

    const { count, rows } = await DiscountDetail.findAndCountAll({
      where: {
        active: true,
      },
      include: [
        {
          model: Discount,
          as: "discountProgram",
          where: {
            id: discountId,
            startAt: { [Op.lte]: new Date() },
            endAt: { [Op.gte]: new Date() },
          },
        },
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
        discountDetails: rows,
        currentPage: page ? page : 1,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};
const createDiscountDetail = async (req, res, next) => {
  try {
    const { minAmount, maxAmount, discountId, productId, active } = req.body;
    const discount = await Discount.findOne({
      where: {
        id: discountId,
      },
    });

    if (!productId) {
      const products = await Product.findAll({
        include: [
          {
            model: DiscountDetail,
            as: "discountList",
            include: [
              {
                model: Discount,
                as: "discountProgram",
                order: ["endAt", "desc"],
                attributes: ["discountPercent", "startAt", "endAt"],
              },
            ],
          },
        ],
      });

      await products.forEach(async (product) => {
        await DiscountDetail.create({
          minAmount: minAmount || 0,
          maxAmount: maxAmount || 10000,
          active: active,
          discountId,
          productId: product.id,
        });
        if (active) {
          const discountDetailsListOfProduct = await DiscountDetail.findAll({
            where: {
              productId: product.id,
            },
          });
          await discountDetailsListOfProduct.forEach(async (item) => {
            item.active = false;
            await item.save();
          });
          if (discount.endAt > new Date() && discount.startAt <= new Date())
            product.priceWithDiscount =
              (product.price * (100 - discount.discountPercent)) / 100;
          await product.save();
        }

        // if (discount.endAt > new Date() && discount.startAt <= new Date())
        //   product.priceWithDiscount =
        //     (product.price * (100 - discount.discountPercent)) / 100;
        // await product.save();
      });

      res.status(200).json({
        success: true,
        message:
          "Áp dụng thành công chương trình giảm giá cho toàn bộ sản phẩm",
      });
    } else {
      const product = await Product.findOne({
        where: {
          id: productId,
        },
      });

      if (active) {
        const discountDetailsListOfProduct = await DiscountDetail.findAll({
          where: {
            productId: product.id,
          },
        });
        await discountDetailsListOfProduct.forEach(async (item) => {
          item.active = false;
          await item.save();
        });

        if (discount.endAt > new Date() && discount.startAt <= new Date())
          product.priceWithDiscount =
            (product.price * (100 - discount.discountPercent)) / 100;
        await product.save();
      }
      const discountDetail = await DiscountDetail.create({
        minAmount: minAmount || 0,
        maxAmount: maxAmount || 10000,
        discountId,
        productId,
        active: active,
      });

      res.status(200).json({
        success: true,
        message: "Áp dụng thành công chương trình giảm giá",
        discountDetail,
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateDiscountDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { minAmount, maxAmount, discountId, productId, active } = req.body;

    const discountDetail = await DiscountDetail.findOne({
      where: {
        id,
      },
    });
    const discount = await Discount.findOne({
      where: {
        id: discountDetail.discountId,
      },
    });

    const product = await Product.findOne({
      where: {
        id: discountDetail.productId,
      },
    });

    if (active) {
      const discountDetailsListOfProduct = await DiscountDetail.findAll({
        where: {
          productId: product.id,
        },
      });
      await discountDetailsListOfProduct.forEach(async (item) => {
        item.active = false;
        await item.save();
      });
      if (discount.endAt > new Date() && discount.startAt <= new Date())
        product.priceWithDiscount =
          (product.price * (100 - discount.discountPercent)) / 100;
      await product.save();
    }

    discountDetail.minAmount = minAmount || 0;
    discountDetail.maxAmount = maxAmount || 10000;
    discountDetail.discountId = discountId;
    discountDetail.productId = productId;
    discountDetail.active = active;
    await discountDetail.save();

    res.status(200).json({
      success: true,
      message: "Cập nhật thành công chương trình giảm giá",
    });
  } catch (error) {
    next(error);
  }
};

const deleteDiscountDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    await DiscountDetail.destroy({
      where: { id },
    });
    res.status(200).json({
      success: true,
      message: "Bỏ áp dụng thành công chương trình giảm giá",
    });
  } catch (error) {
    next(error);
  }
};
export {
  createDiscountDetail,
  updateDiscountDetail,
  deleteDiscountDetail,
  getDiscountDetail,
};

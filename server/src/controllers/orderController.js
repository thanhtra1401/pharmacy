import {
  Order,
  OrderDetail,
  Product,
  ImageProduct,
  DiscountDetail,
  Discount,
  Address,
} from "../models";
const { Op, literal, Sequelize } = require("sequelize");

const getOrders = async (req, res, next) => {
  try {
    const { customerId, discountId } = req.query;
    if (discountId) {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderDetail,
            where: {
              discountId,
            },
            include: [
              {
                model: Product,
                include: [
                  {
                    model: ImageProduct,
                    as: "images",
                    attributes: ["url"],
                  },
                  {
                    model: DiscountDetail,
                    as: "discountList",
                    attributes: ["minAmount", "maxAmount", "active"],
                    include: [
                      {
                        model: Discount,
                        as: "discountProgram",

                        attributes: [
                          "discountPercent",
                          "startAt",
                          "endAt",
                          "id",
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
      if (orders) {
        res.status(200).json({
          success: true,
          message: "Lấy thành công danh sách đơn hàng",
          data: {
            orders,
          },
        });
      }
    } else if (customerId) {
      const orders = await Order.findAll({
        where: { customerId },
        include: [
          {
            model: OrderDetail,
            include: [
              {
                model: Product,
                include: [
                  {
                    model: ImageProduct,
                    as: "images",
                    attributes: ["url"],
                  },
                  {
                    model: DiscountDetail,
                    as: "discountList",
                    attributes: ["minAmount", "maxAmount", "active"],
                    include: [
                      {
                        model: Discount,
                        as: "discountProgram",
                        attributes: ["discountPercent", "startAt", "endAt"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      if (orders) {
        res.status(200).json({
          success: true,
          message: "Lấy thành công đơn hàng của khách hàng",
          data: {
            orders,
          },
        });
      }
    } else {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderDetail,
            include: [
              {
                model: Product,
                include: [
                  {
                    model: ImageProduct,
                    as: "images",
                    attributes: ["url"],
                  },
                  {
                    model: DiscountDetail,
                    as: "discountList",
                    attributes: ["minAmount", "maxAmount", "active"],
                    include: [
                      {
                        model: Discount,
                        as: "discountProgram",
                        attributes: ["discountPercent", "startAt", "endAt"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      if (orders) {
        res.status(200).json({
          success: true,
          message: "Lấy thành công danh sách đơn hàng",
          data: {
            orders,
          },
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getOrdersByMonth = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("Order.createdAt")), "month"],
        [Sequelize.fn("YEAR", Sequelize.col("Order.createdAt")), "year"],
        [Sequelize.fn("COUNT", Sequelize.col("*")), "totalOrders"],
      ],
      group: [
        Sequelize.fn("MONTH", Sequelize.col("Order.createdAt")),
        Sequelize.fn("YEAR", Sequelize.col("Order.createdAt")),
      ],
      order: [
        [Sequelize.fn("YEAR", Sequelize.col("Order.createdAt")), "ASC"],
        [Sequelize.fn("MONTH", Sequelize.col("Order.createdAt")), "ASC"],
      ],
      //group: ["status"],
    });
    if (orders) {
      res.status(200).json({
        success: true,
        message: "Lấy thành công danh sách đơn hàng",
        data: {
          orders,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: OrderDetail,
          include: [
            {
              model: Product,
              include: [
                {
                  model: ImageProduct,
                  as: "images",
                  attributes: ["url"],
                },
                {
                  model: DiscountDetail,
                  as: "discountList",
                  attributes: ["minAmount", "maxAmount", "active"],
                  include: [
                    {
                      model: Discount,
                      as: "discountProgram",
                      attributes: ["discountPercent", "startAt", "endAt"],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: Address,
        },
      ],
    });
    if (order) {
      res.status(200).json({
        success: true,
        message: "Lấy đơn hàng thành công",
        data: {
          order,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
const createOrder = async (req, res, next) => {
  try {
    const {
      payment,
      howReceive,
      totalPrice,
      createdAt,
      updatedAt,
      customerId,
      addressId,
      shipFee,
    } = req.body;
    const order = await Order.create({
      status: 0,
      customerId,
      payment,
      addressId,
      howReceive,
      totalPrice,
      shipFee: shipFee || 30000,
      createdAt,
      updatedAt,
    });
    if (order) {
      res.status(200).json({
        success: true,
        message: "Tạo thành công đơn hàng",
        data: {
          order,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status, payment, howReceive, addressId } = req.body;
    const order = await Order.findOne({
      where: {
        id,
      },
    });
    if (order && status) {
      order.status = status;
      await order.save();
      res.status(200).json({
        success: true,
        message: "Cập nhật thành công trạng thái đơn hàng",
        data: {
          order,
        },
      });
    } else if (order && payment) {
      order.payment = payment;
      await order.save();
      res.status(200).json({
        success: true,
        message: "Cập nhật thành công hình thức thanh toán đơn hàng",
        data: {
          order,
        },
      });
    } else if (order && howReceive) {
      order.howReceive = howReceive;
      await order.save();
      res.status(200).json({
        success: true,
        message: "Cập nhật thành công hình thức nhận hàng",
        data: {
          order,
        },
      });
    } else if (order && addressId) {
      order.addressId = addressId;
      await order.save();
      res.status(200).json({
        success: true,
        message: "Cập nhật thành công địa chỉ nhận hàng",
        data: {
          order,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Order.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Xóa thành công đơn hàng",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  getOrdersByMonth,
};

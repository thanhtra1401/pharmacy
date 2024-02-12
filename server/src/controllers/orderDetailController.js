import { OrderDetail, Product, Discount } from "../models";

const getOrderDetailInDiscount = async (req, res, next) => {
  try {
    const { discountId } = req.params;
    const orderDetails = await OrderDetail.findAll({
      include: [
        {
          model: Discount,
          where: {
            id: discountId,
          },
        },
        {
          model: Product,
        },
      ],
    });
    if (orderDetails) {
      res.status(200).json({
        success: true,
        message: "Lấy thành công chi tiết đơn hàng của chương trình khuyến mại",
        data: { orderDetails },
      });
    }
  } catch (error) {
    next(error);
  }
};
const createOrderDetail = async (req, res, next) => {
  try {
    const { orderId, productId, amount, price, discountId } = req.body;
    const orderDetail = await OrderDetail.create({
      orderId,
      productId,
      discountId,
      amount,
      price,
    });

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    product.sold += amount;
    product.quantity -= amount;
    await product.save();
    if (orderDetail) {
      res.status(200).json({
        success: true,
        message: "Tạo thành công chi tiết đơn hàng",
        data: { orderDetail },
      });
    }
  } catch (error) {
    next(error);
  }
};
export { createOrderDetail, getOrderDetailInDiscount };

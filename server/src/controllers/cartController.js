import {
  Cart,
  CartDetail,
  Product,
  ImageProduct,
  DiscountDetail,
  Discount,
} from "../models";
const getCartByUserId = async (req, res, next) => {
  try {
    const { customerId } = req.query;
    const cart = await Cart.findOne({
      where: {
        customerId,
      },
      include: [
        {
          model: CartDetail,
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
    if (cart)
      res.status(200).json({
        success: true,
        message: "Lấy giỏ hàng thành công",
        data: { cart },
      });
  } catch (error) {
    next(error);
  }
};

const getCartSelectedByUserId = async (req, res, next) => {
  try {
    const { customerId } = req.query;
    const cart = await Cart.findOne({
      where: {
        customerId,
      },
      include: [
        {
          model: CartDetail,
          where: {
            selected: true,
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
                      attributes: ["discountPercent", "startAt", "endAt", "id"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    if (cart)
      res.status(200).json({
        success: true,
        message: "Lấy giỏ hàng thành công",
        data: { cart },
      });
  } catch (error) {
    next(error);
  }
};

const createCart = async (req, res, next) => {
  try {
    const { customerId } = req.body;
    const cart = await Cart.create({
      customerId,
      totalPrice: 0,
    });
    if (cart)
      res.status(200).json({
        success: true,
        message: "Tạo thành công giỏ hàng",
        cart,
      });
  } catch (error) {
    next(error);
  }
};

const selectedAll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { selected } = req.body;
    const cart = await Cart.findOne({
      where: {
        id,
      },
      include: [
        {
          model: CartDetail,
        },
      ],
    });

    if (cart) {
      await cart.CartDetails.map(async (item) => {
        const cartDetail = await CartDetail.findOne({
          where: {
            id: item.id,
          },
        });
        cartDetail.selected = selected;
        await cartDetail.save();
      });
      res.status(200).json({
        success: true,
        message: "Chọn tất cả sản phẩm thành công",
        data: { cart },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({
      where: {
        id,
      },
      include: [
        {
          model: CartDetail,
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
    if (cart) {
      if (cart.CartDetails.length > 0) {
        const selectedItems = cart.CartDetails.filter((item) => item.selected);

        const totalPrice = selectedItems.reduce((total, item) => {
          if (item.Product.discountList.length > 0) {
            const discountUsed = item.Product.discountList.find((item) => {
              return (
                item.active &&
                item.discountProgram.endAt > new Date() &&
                item.discountProgram.startAt <= new Date()
              );
            });

            if (discountUsed) {
              return total + item.amount * item.Product.priceWithDiscount;
            }
          }
          return total + item.amount * item.Product.price;
        }, 0);

        cart.totalPrice = totalPrice;
        await cart.save();
        res.status(200).json({
          success: true,
          message: "Cập nhật giỏ hàng thành công",
          data: { cart },
        });
      } else {
        cart.totalPrice = 0;
        await cart.save();
        res.status(200).json({
          success: true,
          message: "Giỏ hàng đang trống",
          data: { cart },
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export {
  getCartByUserId,
  createCart,
  updateCart,
  getCartSelectedByUserId,
  selectedAll,
};

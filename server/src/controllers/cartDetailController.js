import { CartDetail, Cart, Product, DiscountDetail, Discount } from "../models";
const getCartDetails = async (req, res, next) => {
  try {
    const cartDetails = await CartDetail.findAll();
    if (cartDetails)
      res.status(200).json({
        success: true,
        message: "Lấy danh sách chi tiết giỏ hàng thành công",
        data: {
          cartDetails,
        },
      });
  } catch (error) {
    next(error);
  }
};
const addToCart = async (req, res, next) => {
  try {
    const { cartId, productId, amount } = req.body;
    const cartDetail = await CartDetail.findOne({
      where: { productId, cartId },
    });
    if (cartDetail) {
      cartDetail.amount += amount;
      cartDetail.selected = true;

      await cartDetail.save();
      res.status(200).json({
        success: true,
        message: "Thêm vào giỏ hàng thành công",
        data: {
          cartDetail,
        },
      });
    } else {
      const newCartDetail = await CartDetail.create({
        cartId,
        productId,
        amount: amount,
        selected: true,
      });

      res.status(200).json({
        success: true,
        message: "Thêm vào giỏ hàng thành công",
        data: {
          newCartDetail,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

// const createCartDetail = async (req, res, next) => {
//   try {
//     const { cartId, productId, amount } = req.body;
//     const cartDetail = await CartDetail.create({
//       cartId,
//       productId,
//       amount: amount || 1,
//     });
//     if (cartDetail)
//       res.status(200).json({
//         success: true,
//         message: "Tạo chi tiết giỏ hàng thành công",
//         data: {
//           cartDetail,
//         },
//       });
//   } catch (error) {
//     next(error);
//   }
// };

const updateAmountCartDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { amount } = req.body;
    const cartDetail = await CartDetail.findOne({
      where: {
        id,
      },
    });
    const product = await Product.findOne({
      where: {
        id: cartDetail.productId,
      },
    });
    if (product.quantity < amount) {
      res.status(400).json({
        success: false,
        message: "Sản phẩm không đủ hàng",
        data: {
          cartDetail,
        },
      });
    }

    if (cartDetail) {
      cartDetail.amount = amount;
      await cartDetail.save();
      res.status(200).json({
        success: true,
        message: "Cập nhật số lượng thành công",
        data: {
          cartDetail,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateSelectedCartDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { selected } = req.body;
    const cartDetail = await CartDetail.findOne({
      where: {
        id,
      },
    });
    if (cartDetail) {
      cartDetail.selected = selected;
      cartDetail.save();
      res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái được chọn thành công",
        data: { cartDetail },
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteCartDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    await CartDetail.destroy({
      where: { id },
    });
    res.status(200).json({
      success: true,
      message: "Xóa thành công chi tiết giỏ hàng",
    });
  } catch (error) {
    next(error);
  }
};
export {
  getCartDetails,
  addToCart,
  updateAmountCartDetail,
  updateSelectedCartDetail,
  deleteCartDetail,
};

import { ImageProduct } from "../models";

const getImageProduct = async (req, res, next) => {
  try {
    const imageProducts = await ImageProduct.findAll();
    res.status(200).json({
      success: true,
      message: "Lấy thành công",
      imageProducts,
    });
  } catch (error) {
    next(error);
  }
};

const createImageProduct = async (req, res, next) => {
  try {
    const { file } = req;

    const { productId } = req.query;
    const urlImage = `http://localhost:8000/${file.path}`;
    const imageProduct = await ImageProduct.create({
      url: urlImage,
      productId,
    });
    res.status(200).json({
      success: true,
      message: "Thêm ảnh thành công",
      imageProduct,
    });
  } catch (error) {
    next(error);
  }
};
const updateImageProduct = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const { file } = req;
    const { productId } = req.body;
    const urlImage = `http://localhost:8000/${file.path}`;
    const imageProduct = await ImageProduct.findOne({
      where: {
        id,
      },
    });
    imageProduct.url = urlImage;
    imageProduct.productId = productId;
    await imageProduct.save();
    res.status(200).json({
      success: true,
      message: "Thay đổi ảnh thành công",
    });
  } catch (error) {
    next(error);
  }
};
export { createImageProduct, updateImageProduct, getImageProduct };

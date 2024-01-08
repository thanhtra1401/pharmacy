import { Op } from "sequelize";
import { Product, ImageProduct } from "../models";

const getProducts = async (req, res, next) => {
  try {
    const { page, size, name } = req.query;
    const limit = size ? parseInt(size) : 3;
    const offset = page ? (parseInt(page) - 1) * parseInt(size) : 0;
    const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const { count, rows } = await Product.findAndCountAll({
      where: {
        ...condition,
      },
      include: [
        {
          model: ImageProduct,
          attributes: ["url"],
        },
      ],

      limit: limit,
      offset: offset,
      distinct: true,
    });
    const totalPages = Math.ceil(count / limit);
    res.status(200).json({
      success: true,
      message: "Lấy sản phẩm thành công",
      data: {
        totalItems: count,
        products: rows,
        currentPage: page ? page : 1,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      shortDes,
      description,
      price,
      amount,
      intendedUse,
      sideEffects,
      origin,
      lotNumber,
      manufactureDate,
      expiriedDate,
      unit,
      categoryId,
    } = req.body;
    const product = await Product.create({
      name,
      shortDes,
      description,
      price,
      amount,
      intendedUse,
      sideEffects,
      origin,
      lotNumber,
      manufactureDate,
      expiriedDate,
      unit,
      categoryId,
    });
    res.status(200).json({
      success: true,
      message: "Tạo sản phẩm thành công",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      name,
      shortDes,
      description,
      price,
      amount,
      intendedUse,
      sideEffects,
      origin,
      lotNumber,
      manufactureDate,
      expiriedDate,
      unit,
      categoryId,
    } = req.body;
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    product.name = name;
    product.shortDes = shortDes;
    product.description = description;
    product.price = price;
    product.amount = amount;
    product.intendedUse = intendedUse;
    product.sideEffects = sideEffects;
    product.origin = origin;
    product.lotNumber = lotNumber;
    product.manufactureDate = manufactureDate;
    product.expiriedDate = expiriedDate;
    product.unit = unit;
    product.categoryId = categoryId;
    await product.save();
    res.status(200).json({
      success: true,
      message: "Cập nhật thành công sản phẩm",
      product,
    });
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Product.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Xoá thành công sản phẩm",
    });
  } catch (error) {
    next(error);
  }
};
export { getProducts, createProduct, updateProduct, deleteProduct };

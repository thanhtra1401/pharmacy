import { Op } from "sequelize";
import {
  Product,
  ImageProduct,
  DiscountDetail,
  Discount,
  Order,
  Category,
} from "../models";
import { convertToSlug } from "../utils/function";

const getProducts = async (req, res, next) => {
  try {
    const {
      page,
      size,
      name,
      sort_by,
      order,
      category,
      slugCat,
      parentCatSlug,
    } = req.query;
    const limit = size ? parseInt(size) : 12;
    const offset = page ? (parseInt(page) - 1) * parseInt(size) : 0;
    const getByName = name ? { name: { [Op.like]: `%${name}%` } } : null;
    const getByCategory = category
      ? { name: { [Op.like]: `%${category}%` } }
      : null;
    const getBySlugCat = slugCat ? { slug: slugCat } : null;
    const getByParentCat = parentCatSlug ? { slug: parentCatSlug } : null;
    const orderArray = [];

    if (sort_by && order) {
      const validAttributes = ["price", "createdAt", "sold"];
      if (
        validAttributes.includes(sort_by) &&
        (order === "asc" || order === "desc")
      ) {
        orderArray.push([sort_by, order]);
      }
    }

    const { count, rows } = await Product.findAndCountAll({
      where: {
        ...getByName,
      },
      order: orderArray,
      include: [
        {
          model: ImageProduct,
          as: "images",
          attributes: ["url"],
        },
        {
          model: DiscountDetail,
          as: "discountList",
          attributes: ["minAmount", "maxAmount", "active", "id"],
          include: [
            {
              model: Discount,
              as: "discountProgram",
              order: ["endAt", "desc"],
              attributes: ["discountPercent", "startAt", "endAt", "id", "name"],
            },
          ],
        },
        {
          model: Category,
          include: [
            {
              model: Category,
              as: "parent",

              where: {
                ...getByParentCat,
              },
            },
          ],
          where: {
            ...getByCategory,
            ...getBySlugCat,
          },
          attributes: ["name"],
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
      sold,
      quantity,
      intendedUse,
      howToUse,
      ingredient,
      country,
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
      slug: convertToSlug(name),
      shortDes,
      description,
      price,
      sold,
      quantity,
      ingredient,
      country,
      intendedUse,
      howToUse,
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
      data: { product },
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
      sold,
      quantity,
      intendedUse,
      howToUse,
      ingredient,
      country,
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
              attributes: ["discountPercent", "startAt", "endAt", "id", "name"],
            },
          ],
        },
      ],
    });

    if (product) {
      if (product.discountList.length > 0) {
        const checkDiscount = product.discountList.forEach((item) => {
          if (
            item.active &&
            item.discountProgram.endAt > new Date() &&
            item.discountProgram.startAt <= new Date()
          )
            return item.discountProgram.discountPercent;
        });
        if (checkDiscount)
          product.priceWithDiscount =
            (product.price * (100 - checkDiscount)) / 100;
      }
    }

    product.name = name;
    product.slug = convertToSlug(name);
    product.shortDes = shortDes;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.sold = sold;
    product.ingredient = ingredient;
    product.intendedUse = intendedUse;
    product.sideEffects = sideEffects;
    product.origin = origin;
    product.howToUse = howToUse;
    product.country = country;
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
const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ImageProduct,
          as: "images",
          attributes: ["url"],
        },
        {
          model: DiscountDetail,
          as: "discountList",
          attributes: ["minAmount", "maxAmount", "active", "id"],
          include: [
            {
              model: Discount,
              as: "discountProgram",
              order: ["endAt", "desc"],
              attributes: ["discountPercent", "startAt", "endAt", "id", "name"],
            },
          ],
        },
        {
          model: Category,

          attributes: ["name"],
        },
      ],
    });
    if (product)
      res.status(200).json({
        success: true,
        message: "Lấy sản phẩm thành công",
        data: {
          product,
        },
      });
  } catch (error) {
    next(error);
  }
};

const uploadMainImageProduct = async (req, res, next) => {
  try {
    const { file } = req;
    const urlImage = `http://localhost:8000/${file.path}`;
    const id = req.params.id;
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    product.image = urlImage;
    await product.save();
    res.status(200).json({
      success: true,
      message: "Tải ảnh sản phẩm thành công",
      product,
    });
  } catch (error) {
    next(error);
  }
};
export {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  uploadMainImageProduct,
};

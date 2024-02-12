import { Category, Product } from "../models";
import { convertToSlug } from "../utils/function";

const getCategory = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [
        { model: Category, as: "children", include: [{ model: Product }] },
        {
          model: Product,
        },
      ],
      where: {
        parentId: null,
      },
    });
    if (categories)
      res.status(200).json({
        success: true,
        message: "Lấy danh mục thành công",

        categories: categories,
      });
  } catch (error) {
    next(error);
  }
};
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id },
      include: [
        { model: Category, as: "children", include: [{ model: Product }] },
        { model: Category, as: "parent", include: [{ model: Product }] },
        {
          model: Product,
        },
      ],
    });
    if (category) {
      res.status(200).json({
        success: true,
        message: "Lấy danh mục thành công",
        data: {
          category,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const getChildCategory = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: ["parent"],
      where: {
        parentId: !null,
      },
    });
    if (categories) {
      res.status(200).json({
        success: true,
        message: "Lấy danh mục thành công",

        categories: categories,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({
      include: ["children", "parent"],
      where: {
        slug,
      },
    });
    if (category)
      res.status(200).json({
        success: true,
        message: "Lấy danh mục thành công",
        category: category,
      });
  } catch (error) {
    next(error);
  }
};
const createCategory = async (req, res, next) => {
  try {
    const { name, description, parentId } = req.body;
    if (!name) {
      res.status(400).json({
        success: false,
        message: "Không có tên danh mục",
      });
    }
    const newCategory = await Category.create({
      name,
      slug: convertToSlug(name),
      description,
      parentId,
    });
    res.status(200).json({
      success: true,
      message: "Tạo danh mục thành công",
      data: {
        categories: newCategory,
      },
    });
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const { name, description, parentId } = req.body;

    const category = await Category.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Danh mục không tồn tại",
      });
    }

    // Sửa thông tin danh mục
    category.name = name;
    category.slug = convertToSlug(name);
    category.description = description;
    category.parentId = parentId;

    await category.save();

    // Trả về danh mục đã sửa
    res.status(200).json({
      success: true,
      message: "Cập nhật thành công danh mục",
      category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Category.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Xoá danh mục thành công",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryBySlug,
  getChildCategory,
  getCategoryById,
};

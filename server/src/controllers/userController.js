import bcrypt from "bcrypt";
import { User, Cart, Order, Address } from "../models";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
} from "../middlewares/jwt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import sendEmail from "../utils/sendEmail";

const register = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({
      success: false,
      message: "Dữ liệu chưa đầy đủ",
    });
  }
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const checkExist = await User.findOne({
      where: {
        email,
      },
    });
    if (checkExist) {
      res.status(400).json({
        success: false,
        message: "Email đã tồn tại",
      });
    }
    const newUser = await User.create({
      email,
      password: hash,
      firstName,
      lastName,
      role: 0,
    });
    await Cart.create({ customerId: newUser.id, totalPrice: 0 });

    res.status(201).json({
      success: true,
      message: "Đăng ký tài khoản thành công",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Chưa nhập email hoặc mật khẩu",
      });
    }
    const user = await User.findOne({
      where: {
        email,
      },
      raw: true,
    });
    if (user) {
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        const { password, ...userData } = user;
        // console.log("userData: ", userData);

        const accessToken = generateAccessToken(user.id, user.role);

        const refreshToken = generateRefreshToken(user.id);
        res.cookie("refreshToken", refreshToken, {
          // maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
        });
        await User.update(
          { refreshToken },
          {
            where: {
              id: user.id,
            },
          }
        );
        res.status(200).json({
          success: true,
          message: "Đăng nhập thành công",
          data: {
            accessToken,
            ...userData,
          },
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Mật khẩu không chính xác",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Không tìm thấy email",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Order,
        },
        {
          model: Address,
        },
      ],
    });

    if (user) {
      res.status(200).json({
        success: true,
        message: "Lấy thông tin người dùng thành công",
        data: {
          user,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req?.cookies?.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.JWT_KEY);
      const id = decoded?.data?.id;
      if (id) {
        const user = await User.findOne({
          where: {
            id,
          },
        });
        if (refreshToken === user.refreshToken) {
          res.status(200).json({
            success: true,
            message: "Tạo mới thành công access token",
            data: {
              accessToken: generateAccessToken(id, user.role),
            },
          });
        } else {
          res.status(400).json({
            success: false,
            message: "RefreshToken không hợp lệ",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "RefreshToken không hợp lệ",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Bạn cần đăng nhập",
      });
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    // await User.update(
    //   { refreshToken: "" },
    //   {
    //     where: {
    //       refreshToken: cookie.refreshToken,
    //     },
    //   }
    // );

    res.setHeader("authorization", "");
    //res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    next(error);
  }
};
const getAllCustomers = async (req, res, next) => {
  try {
    const { page, size, name } = req.query;
    const limit = size ? parseInt(size) : 10;
    const offset = page ? (parseInt(page) - 1) * parseInt(size) : 0;
    const condition = name ? { firstName: { [Op.like]: `%${name}%` } } : null;

    const { count, rows } = await User.findAndCountAll({
      limit: limit,
      offset: offset,
      where: {
        role: 0,
        ...condition,
      },
      include: [
        {
          model: Order,
        },
        {
          model: Address,
        },
      ],
    });
    const totalPages = Math.ceil(count / limit);
    res.status(200).json({
      success: true,
      message: "Lấy khách hàng thành công",
      data: {
        totalItems: count,
        users: rows,
        currentPage: page ? page : 1,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) throw new Error("Missing error");
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new Error("Không tìm thấy email");

    const resetToken = btoa(email);
    await User.update(
      {
        passwordResetToken: resetToken,
        passwordResetExpires: "60",
      },
      {
        where: {
          email,
        },
      }
    );
    const html = `
    Xin chào ${user.firstName}. Chúng tôi nhận được yêu cầu thiết lập lại mật khẩu cho tài khoản của bạn.
    Nhấn vào link dưới đây để thiết lập mật khẩu mới cho tài khoản của bạn. Link sẽ hết hạn sau 1 phút. <a href=${process.env.CLIENT_URL}/forgot-password/${resetToken}>Click here</a> `;
    const result = await sendEmail(email, html);
    res.status(200).json({
      success: true,
      message: "Gui mail thanh cong",
      data: {
        token: resetToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { resetToken, password } = req.body;
    if (!resetToken || !password) throw new Error("Missing input");

    const user = await User.findOne({
      where: {
        passwordResetToken: resetToken,
      },
    });
    if (!user) throw new Error("Token không hợp lệ");

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    await User.update(
      {
        passwordResetToken: null,
        password: hash,
        passwordChangeAt: Date.now(),
        passwordResetExpires: null,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "Thay đổi mật khẩu thành công",
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, avatar, phone, dob, gender } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("Người dùng không tồn tại");
    await User.update(
      { firstName, lastName, email, avatar, phone, dob, gender },
      { where: { id } }
    );
    res.status(200).json({
      success: true,
      message: "Thay đổi thông tin thành công",
    });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Xoá người dùng thành công",
    });
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const { file } = req;
    const urlImage = `http://localhost:8000/${file.path}`;
    const id = req.params.id;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    user.avatar = urlImage;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Cập nhật ảnh đại diện thành công",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export {
  register,
  login,
  getUserInfo,
  refreshAccessToken,
  logout,
  getAllCustomers,
  forgotPassword,
  resetPassword,
  updateUser,
  deleteUser,
  uploadAvatar,
};

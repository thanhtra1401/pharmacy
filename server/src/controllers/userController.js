import bcrypt from "bcrypt";
import { User } from "../models";
import { generateAccessToken, generateRefreshToken } from "../middlewares/jwt";
import jwt from "jsonwebtoken";

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
        const { password, role, ...userData } = user;
        // console.log("userData: ", userData);

        const accessToken = generateAccessToken(user.id, user.role);

        const refreshToken = generateRefreshToken(user.id);
        res.cookie("refreshToken", refreshToken, {
          maxAge: 7 * 24 * 60 * 60,
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
          accessToken,
          userData,
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
      raw: true,
    });
    if (user) {
      const { password, ...userInfo } = user;
      res.status(200).json({
        success: true,
        message: "Lấy thông tin người dùng thành công",
        user: userInfo,
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
            accessToken: generateAccessToken(id, user.role),
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

const logout = (req, res, next) => {
  try {
    const cookie = req.cookies;
    const user = User.update(
      { refreshToken: "" },
      {
        where: {
          refreshToken: cookie.refreshToken,
        },
      }
    );

    res.setHeader("authorization", "");
    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, getUserInfo, refreshAccessToken, logout };

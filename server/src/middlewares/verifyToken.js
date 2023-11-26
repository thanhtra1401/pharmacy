import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (decoded) {
      req.user = decoded.data;
      next();
    } else {
      res.status(400).json({
        success: false,
        message: "Token không chính xác",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Bạn cần đăng nhập",
    });
  }
};
export default verifyToken;

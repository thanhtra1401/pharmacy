const isAdmin = (req, res, next) => {
  if (req.user.role === 1) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Bạn không có quyền truy cập",
    });
  }
};
export default isAdmin;

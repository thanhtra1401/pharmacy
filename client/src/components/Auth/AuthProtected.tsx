import { Outlet } from "react-router-dom";
import authStore from "../../store/store";
import { Alert } from "antd";

function AuthProtected() {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Alert
      message="Có lỗi xảy ra"
      description="Bạn cần đăng nhập để tiếp tục"
      type="error"
      showIcon
    />
  );
}

export default AuthProtected;

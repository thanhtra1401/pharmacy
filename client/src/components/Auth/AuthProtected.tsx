import { Link, Outlet } from "react-router-dom";
import authStore from "../../store/store";
import { Button, Result } from "antd";

function AuthProtected() {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
}

export default AuthProtected;

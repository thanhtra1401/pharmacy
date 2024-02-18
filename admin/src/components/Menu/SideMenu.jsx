import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  UnorderedListOutlined,
  PayCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authStore } from "../../stores/authStore";
import { clearLS } from "../../utils/function";
import Swal from "sweetalert2";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  const logout = authStore((state) => state.logout);

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const handleLogout = () => {
    Swal.fire({
      title: "Đăng xuất",
      text: "Bạn có chắc chắn muốn đăng xuất?",
      showDenyButton: true,
      confirmButtonText: "Xác nhận",
      confirmButtonColor: "#d33",
      denyButtonColor: "#3085d6",
      denyButtonText: `Trở lại`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        clearLS("user_id");
        clearLS("access_token");
        clearLS("role");
        logout();
        navigate("/");
      }
    });
  };

  const navigate = useNavigate();
  return (
    <Menu
      className="SideMenuVertical"
      mode="vertical"
      onClick={(item) => {
        if (item.key) {
          navigate(item.key);
        }
      }}
      selectedKeys={[selectedKeys]}
      items={[
        {
          label: "Trang chủ",
          icon: <AppstoreOutlined />,
          key: "/",
        },
        {
          label: "Sản phẩm",
          key: "/san-pham",
          icon: <ShopOutlined />,
        },
        {
          label: "Đơn hàng",
          key: "/don-hang",
          icon: <ShoppingCartOutlined />,
        },
        {
          label: "Khách hàng",
          key: "/khach-hang",
          icon: <UserOutlined />,
        },
        {
          label: "Danh mục",
          key: "/danh-muc",
          icon: <UnorderedListOutlined />,
        },
        {
          label: "Khuyến mại",
          key: "/khuyen-mai",
          icon: <PayCircleOutlined />,
        },
        {
          label: "Đăng xuất",
          key: "/dang-xuat",
          icon: <LogoutOutlined />,
          onClick: () => {
            handleLogout();
          },
        },
      ]}
    ></Menu>
  );
}
export default SideMenu;

import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <Menu
      className="SideMenuVertical"
      mode="vertical"
      onClick={(item) => {
        navigate(item.key);
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
          key: "/products",
          icon: <ShopOutlined />,
        },
        {
          label: "Đơn hàng",
          key: "/orders",
          icon: <ShoppingCartOutlined />,
        },
        {
          label: "Khách hàng",
          key: "/customers",
          icon: <UserOutlined />,
        },
      ]}
    ></Menu>
  );
}
export default SideMenu;

import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  UnorderedListOutlined,
  PayCircleOutlined,
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
      ]}
    ></Menu>
  );
}
export default SideMenu;

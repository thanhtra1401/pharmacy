import { Menu } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import { UserOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function ProfileMenu({ active }: { active: string }) {
  const navigate = useNavigate();

  return (
    <Menu mode="vertical" className="mr-7 bg-white rounded-xl mt-4">
      <SubMenu
        className={
          active === "infoProfile" ? "text-primary" : "hover:text-primary"
        }
        key="Thongtincanhan"
        title="Thông tin cá nhân"
        icon={<UserOutlined />}
        onTitleClick={() => {
          navigate("/thong-tin-ca-nhan");
        }}
      ></SubMenu>
      <SubMenu
        className={
          active === "infoOrder" ? "text-primary" : "hover:text-primary"
        }
        key="Donhangcuatoi"
        title="Đơn hàng của tôi"
        icon={<CodeSandboxOutlined />}
        onTitleClick={() => {
          navigate("/thong-tin-ca-nhan/don-hang");
        }}
      ></SubMenu>
      <SubMenu
        className={
          active === "infoAddress" ? "text-primary" : "hover:text-primary"
        }
        key="Quanlysodiachi"
        title="Quản lý sổ địa chỉ"
        icon={<i className="fa-solid fa-location-dot"></i>}
        onTitleClick={() => {
          navigate("/ca-nhan/quan-ly-dia-chi");
        }}
      ></SubMenu>
      <SubMenu
        className={
          active === "infoPrescription" ? "text-primary" : "hover:text-primary"
        }
        key="Donthuoccuatoi"
        title="Đơn thuốc của tôi"
        icon={<i className="fa-solid fa-file-medical"></i>}
        onTitleClick={() => {
          navigate("/don-thuoc");
        }}
      ></SubMenu>
      <SubMenu
        className="hover:text-primary"
        key="Dangxuat"
        title="Đăng xuất"
        icon={<i className="fa-solid fa-right-from-bracket"></i>}
        onTitleClick={() => {
          navigate("/");
        }}
      ></SubMenu>
    </Menu>
  );
}

export default ProfileMenu;

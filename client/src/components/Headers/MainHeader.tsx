import { useEffect, useState } from "react";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import authStore, { productStore } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { logoutApi } from "../../apis/userApi/api";
import { Avatar, Badge, Menu, Popover } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import { UserOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import { getCartApi } from "../../apis/cartApi";
import { Cart } from "../../interfaces/cartInterface";

interface Props {
  showLogin?: boolean;
}
function MainHeader({ showLogin }: Props) {
  const [isModalOpen, setModalOpen] = useState(showLogin || false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsLogin(true);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const [isLogin, setIsLogin] = useState(true);
  const toRegister = () => {
    setIsLogin(false);
  };
  const toLogin = () => {
    setIsLogin(true);
  };

  const logout = async () => {
    await logoutApi();
    logoutState();
  };

  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const logoutState = authStore((state) => state.logout);
  const user = authStore((state) => state.user);

  const [searchData, setSearchData] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //setSearchParams({ name: searchData });
    navigate(`/tim-kiem/?name=${searchData}&sort_by=sold&order=desc`);
  };

  const [cart, setCart] = useState<Cart>();
  const dataGetCart = {
    customerId: user ? user.id : -1,
  };
  const setCartId = productStore((state) => state.setCartId);

  useEffect(() => {
    const getCartByCusId = async () => {
      const response = await getCartApi(dataGetCart);
      if (response.status === 200) {
        setCart(response.data.data.cart);
        setCartId(response.data.data.cart.id);
      }
    };
    getCartByCusId();
  }, []);

  return (
    <div className=" h-[110px] bg-gradient-to-t from-[#1F64DE] to-[#4086EA] flex items-center">
      <div className="container grid grid-cols-10 ">
        <div className="col-span-1 bg-transparent">
          <Link to="/" className="cursor-pointer ">
            <img alt="logo" src="/logo.png"></img>
          </Link>
        </div>

        <div className="xl:col-span-6 col-span-5">
          <form
            className="relative flex items-center h-full"
            onSubmit={handleSearch}
          >
            <input
              className="block w-full rounded-full  border-none border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 outline-none "
              placeholder="Tìm tên thuốc"
              value={searchData}
              onChange={handleChange}
            />
            <button
              className=" px-[13px] py-2 bg-primary border-solid  rounded-full absolute right-[7px] "
              type="submit"
            >
              <i className="fa-solid fa-magnifying-glass text-white h-4 text-sm"></i>
            </button>
          </form>
        </div>
        {isAuthenticated ? (
          <div className="col-span-2 flex items-center justify-center relative ">
            <Badge
              count={1}
              className="bg-[#1250DC] text-white  mr-4 text-xl w-10 h-10 rounded-full flex items-center justify-center"
              size="small"
            >
              <i className="fa-solid fa-bell cursor-pointer"></i>
            </Badge>

            <Badge
              count={1}
              className="bg-[#1250DC] text-white  mr-4 text-xl w-10 h-10 rounded-full flex items-center justify-center"
              size="small"
            >
              <i className="fa-solid fa-message cursor-pointer"></i>
            </Badge>
            <Menu mode="horizontal"></Menu>

            <Popover
              placement="bottomRight"
              content={
                <Menu
                  mode="vertical"
                  className=" bg-white rounded-xl m-0 border-none"
                >
                  <SubMenu
                    className="hover:text-primary"
                    key="Thongtincanhan"
                    title="Thông tin cá nhân"
                    icon={<UserOutlined />}
                    onTitleClick={() => {
                      navigate("/thong-tin-ca-nhan");
                    }}
                  ></SubMenu>
                  <SubMenu
                    className={"hover:text-primary"}
                    key="Donhangcuatoi"
                    title="Đơn hàng của tôi"
                    icon={<CodeSandboxOutlined />}
                    onTitleClick={() => {
                      navigate("/thong-tin-ca-nhan/don-hang");
                    }}
                  ></SubMenu>
                  <SubMenu
                    className="hover:text-primary"
                    key="Quanlysodiachi"
                    title="Quản lý sổ địa chỉ"
                    icon={<i className="fa-solid fa-location-dot"></i>}
                    onTitleClick={() => {
                      navigate("/ca-nhan/quan-ly-dia-chi");
                    }}
                  ></SubMenu>
                  <SubMenu
                    className="hover:text-primary"
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
                      logout();
                    }}
                  ></SubMenu>
                </Menu>
              }
            >
              <div className=" cursor-pointer flex items-center justify-center text-white font-semibold">
                <Avatar
                  className="w-10 h-10"
                  alt="avatar"
                  src={
                    user?.avatar ||
                    "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                  }
                />
              </div>
            </Popover>

            {/* {userDetail && (
              <div className="absolute top-14 right-[50px] w-[300px] bg-white text-gray-900 py-2 px-6 border-gray-400 rounded-md shadow-md">
                <div
                  className="flex items-center justify-center border-b-2 pb-2 cursor-pointer"
                  onClick={toProfile}
                >
                  <img
                    className="rounded-full w-10 h-10 mr-3"
                    alt="avatar"
                    src={
                      user?.avatar ||
                      "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                    }
                  ></img>
                  <div className="flex-1 font-semibold">
                    {user?.lastName} {user?.firstName}
                  </div>
                </div>
                <div className="flex items-center mt-4 mb-2 cursor-pointer  ">
                  <div className="mr-3">
                    <i className="fa-solid fa-right-from-bracket text-xl"></i>
                  </div>
                  <div className="font-semibold" onClick={logout}>
                    Đăng xuất
                  </div>
                </div>
              </div>
            )} */}
          </div>
        ) : (
          <div className="col-span-2 flex items-center justify-center text-white font-semibold ">
            <div className="cursor-pointer p-3" onClick={openModal}>
              <i className="fa-solid fa-user mr-2"></i>
              <span className="hidden sm:inline">Đăng nhập</span>
            </div>
          </div>
        )}

        <div className="xl:col-span-1 col-span-2 flex items-center justify-center text-white font-semibold ">
          <div
            className="cursor-pointer py-3 px-4 bg-[#1250DC] rounded-full"
            onClick={() => {
              navigate("/gio-hang");
            }}
          >
            {/* <i className="fa-solid fa-cart-shopping mr-2"></i>
            <span className="hidden sm:inline">Giỏ hàng</span> */}

            <Badge
              count={cart?.CartDetails.length}
              offset={[-6, -6]}
              size="small"
            >
              <i className="fa-solid fa-cart-shopping mr-2 text-white font-semibold"></i>
            </Badge>
            <span className="hidden sm:inline">Giỏ hàng</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal>
          {isLogin ? (
            <LoginForm closeModal={closeModal} toRegister={toRegister} />
          ) : (
            <RegisterForm closeModal={closeModal} toLogin={toLogin} />
          )}
        </Modal>
      )}
    </div>
  );
}

export default MainHeader;

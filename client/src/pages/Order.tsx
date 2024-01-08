import authStore from "../store/store";
import { Link } from "react-router-dom";
import ProfileMenu from "../components/Profile/ProfileMenu";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import OrderItem from "../components/Order/OrderItem";
function Order() {
  const user = authStore((state) => state.user);
  const profileData = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    avatarUrl:
      user?.avatar ||
      "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    email: user?.email,
    phoneNumber: user?.phone,
    gender: user?.gender,
    dob: user?.dob,
  };

  return (
    <div className="bg-[#EDF0F3] min-h-screen">
      <div className="container pt-4">
        <Link to="/" className="text-primary">
          Trang chủ
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/thong-tin-ca-nhan" className="text-primary">
          Cá nhân
        </Link>
      </div>
      <div className="grid grid-cols-12 container mt-4">
        <div className="xl:col-span-3 xl:block hidden">
          <div className=" mr-7 min-h-[176px] flex flex-col justify-center items-center bg-cover bg-no-repeat bg-[url('https://nhathuoclongchau.com.vn/estore-images/profile/v2/background-info.png')]">
            <img
              className="rounded-full w-10 h-10  "
              src={profileData.avatarUrl}
              alt={profileData.firstName}
            ></img>
            <div className="text-white  ">
              {profileData.lastName} {profileData.firstName}
            </div>
            <div className="text-white ">{profileData.phoneNumber}</div>
          </div>
          <ProfileMenu active="infoOrder" />
        </div>
        <div className="xl:col-span-9 col-span-12  rounded-lg">
          <div className="text-lg font-semibold mt-3 pb-2 px-3  flex items-center">
            <span className="mr-20">Đơn hàng của tôi</span>
            <div className="relative flex items-center flex-1">
              <input
                className="block w-full rounded-full border-none border-gray-300 bg-[#D9DFE5] p-3 pl-10 font-normal text-sm text-black outline-none "
                placeholder="Tìm theo mã đơn, tên đơn, hoặc tên sản phẩm..."
              />
              <button className=" px-[10px] py-1 bg-white border-solid  rounded-full absolute right-[6px] ">
                <i className="fa-solid fa-magnifying-glass text-primary h-4 text-sm"></i>
              </button>
            </div>
          </div>

          {/* <div className="flex justify-between cursor-pointer bg-white  text-gray-500 rounded-t-xl mt-4">
            <div
              className={`${
                activeStatus === 0 &&
                "text-black border-b-2 border-primary  transition duration-300 ease-in-out"
              } text-center w-full py-2`}
              onClick={() => changeStatus(0)}
            >
              Tất cả
            </div>
            <div
              className={`${
                activeStatus === 1 &&
                "text-black border-b-2 border-primary  transition duration-300 ease-in-out"
              } text-center w-full py-2`}
              onClick={() => changeStatus(1)}
            >
              Đang xử lý
            </div>
            <div
              className={`${
                activeStatus === 2 &&
                "text-black border-b-2 border-primary  transition duration-300 ease-in-out"
              } text-center w-full py-2`}
              onClick={() => changeStatus(2)}
            >
              Đã giao
            </div>
          </div> */}
          <Tabs
            defaultActiveKey="1"
            className="w-full bg-white mt-4 rounded-t-xl"
            centered
          >
            <TabPane
              tab={<div className="w-full px-8">Tất cả</div>}
              key="1"
              className="bg-[#EDF0F3]"
            >
              <OrderItem status={0} />
              <OrderItem status={0} />
            </TabPane>
            <TabPane
              tab={<div className="w-full px-8">Đang xử lý</div>}
              key="2"
            >
              <OrderItem status={1} />
            </TabPane>
            <TabPane tab={<div className="w-full px-8">Đang giao</div>} key="3">
              <OrderItem status={2} />
            </TabPane>
            <TabPane tab={<div className="w-full px-8">Đã giao</div>}>
              <div className="p-4"></div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Order;

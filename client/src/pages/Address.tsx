import { useEffect, useState } from "react";
import authStore from "../store/store";
import { Button, Modal, Spin, message } from "antd";
import { Link } from "react-router-dom";
import ProfileMenu from "../components/Profile/ProfileMenu";
import { deleteAddressApi, getAddressByUserApi } from "../apis/addressApi";
import { Address as AddressType } from "../interfaces/addressInterface";
import NewAddress from "../components/Order/NewAddress";
import Swal from "sweetalert2";
import UpdateAddress from "../components/Order/UpdateAddress";

function Address() {
  const user = authStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState<AddressType[]>([]);

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

  const [openNewAddress, setOpenNewAddress] = useState(false);
  const [deleteAdd, setDeleteAdd] = useState(false);

  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  const [addressId, setAddressId] = useState(-1);

  useEffect(() => {
    const getAddresses = async () => {
      const response = user && (await getAddressByUserApi(user?.id));
      if (response?.status === 200) {
        setTimeout(() => {
          setAddresses(response.data.data.addresses);
          setLoading(false);
        }, 400);
      }
    };
    getAddresses();
  }, [openNewAddress, deleteAdd, openUpdateAddress]);

  const deleteAddress = async (id: number) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa địa chỉ?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Tiếp tục",
      cancelButtonText: `Trở lại`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteAddressApi(id);
        if (response.status === 200) {
          setDeleteAdd((prev) => !prev);
          message.success("Đã xóa địa chỉ");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="h-lvh container w-full">
        <Modal open={true} closeIcon={false} footer={null}>
          <div className="flex items-center justify-center flex-col">
            <Spin size="large" />
            <div className="mt-4">Loading</div>
          </div>
        </Modal>
      </div>
    );
  } else {
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
          <span className="mx-2 text-gray-400">/</span>
          <span>Quản lý địa chỉ</span>
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
            <ProfileMenu active="infoAddress" />
          </div>
          <div className="xl:col-span-9 col-span-12  rounded-lg">
            <div className="text-lg font-semibold mt-3 pb-2 px-3  flex items-center justify-between">
              <span className="mr-20">Quản lý địa chỉ</span>
              <Button
                type="primary"
                className="bg-primary "
                size="large"
                shape="round"
                onClick={() => {
                  setOpenNewAddress(true);
                }}
              >
                Thêm địa chỉ mới
              </Button>
            </div>

            {openNewAddress && (
              <NewAddress
                openNewAddress={openNewAddress}
                setOpenNewAddress={setOpenNewAddress}
              />
            )}
            {openUpdateAddress && (
              <UpdateAddress
                addressId={addressId}
                openUpdateAddress={openUpdateAddress}
                setOpenUpdateAddress={setOpenUpdateAddress}
              />
            )}

            {addresses.map((address) => (
              <div key={address.id} className="p-4 rounded-lg bg-white mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="border-r border-gray-400 pr-2 font-medium">
                      {address.receiveName}
                    </span>
                    <span className="ml-2">{address.receivePhone}</span>
                  </div>
                  <div
                    className="cursor-pointer text-primary hover:text-blue-600"
                    onClick={() => {
                      address.id && setAddressId(address.id);
                      setOpenUpdateAddress(true);
                    }}
                  >
                    Chỉnh sửa
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="mt-2 text-gray-600">
                    {address.detail}, {address.ward}, {address.district},{" "}
                    {address.province}
                  </div>
                  {!address.defaultAddress && (
                    <div
                      className="cursor-pointer text-red-400 hover:text-red-600"
                      onClick={() => {
                        address.id && deleteAddress(address.id);
                      }}
                    >
                      Xóa
                    </div>
                  )}
                </div>
                {address.defaultAddress && (
                  <span className="px-1 text-primary border border-primary text-xs whitespace-nowrap w-min mt-2">
                    Mặc định
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Address;

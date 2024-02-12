import { Button, Modal, Radio, Spin } from "antd";
import { formatCurrency } from "../utils/function";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authStore from "../store/store";
import { Cart, CartDetail } from "../interfaces/cartInterface";
import { deleteCartApi, getCartSelectedApi } from "../apis/cartApi";
import { getDefaultAddressApi } from "../apis/addressApi";
import { Address } from "../interfaces/addressInterface";
import { getUserApi, updateUserApi } from "../apis/userApi/api";
import SelectAddress from "../components/Order/SelectAddress";
import CreateFirstAddress from "../components/Order/CreateFirstAddress";
import { createDetailOrderApi, createOrderApi } from "../apis/orderApi";
import Swal from "sweetalert2";

function Buy() {
  const navigate = useNavigate();
  const user = authStore((state) => state.user);
  const setUser = authStore((state) => state.setUser);
  const [cart, setCart] = useState<Cart>();
  const [loading, setLoading] = useState(true);

  const [openSelectAddress, setOpenSelectAddress] = useState(false);
  const [openNewFirstAddress, setOpenNewFirstAddress] = useState(false);

  useEffect(() => {
    const getCartByCusId = async () => {
      try {
        const response = await getCartSelectedApi({
          customerId: user ? user.id : -1,
        });
        setTimeout(() => {
          if (response.status === 200) {
            setCart(response.data.data.cart);
            setLoading(false);
          }
        }, 400);
      } catch (error) {
        console.log(error);
      }
    };
    getCartByCusId();
  }, []);

  const checkDiscount = (item: CartDetail) => {
    if (item.Product.discountList.length > 0) {
      const activeDiscount = item.Product.discountList.find(
        (discount) =>
          discount.active &&
          new Date(discount.discountProgram.endAt) > new Date() &&
          new Date(discount.discountProgram.startAt) <= new Date()
      );

      return activeDiscount ? activeDiscount.discountProgram : false;
    }
    return false;
  };

  useEffect(() => {
    const getUser = async () => {
      const response = user && (await getUserApi(user?.id));

      if (response?.status === 200) {
        setUser(response.data.data.user);
      }
    };
    getUser();
  }, []);

  const [orderPhone, setOrderPhone] = useState(user?.phone || "");
  const [orderEmail, setOrderEmail] = useState(user?.email || "");

  const [address, setAddress] = useState<Address>();
  const [defaultAddress, setDefaultAddress] = useState<Address>();

  const [howReceive, setHowReceive] = useState(0);
  const [payment, setPayment] = useState(-1);

  const shipFee = howReceive === 0 ? 30000 : 0;

  const getDefaultAddress = async () => {
    const response = user && (await getDefaultAddressApi(user?.id));
    if (response && response.status === 200) {
      setDefaultAddress(response.data.data.address);
    }
  };
  useEffect(() => {
    getDefaultAddress();
  }, [openNewFirstAddress]);

  const handleBuy = async () => {
    const responseUpdateUser =
      user &&
      (await updateUserApi(user.id, { phone: orderPhone, email: orderEmail }));

    if (responseUpdateUser?.status === 200) {
      const responseCreateOrder =
        user &&
        (await createOrderApi({
          customerId: user.id,
          addressId: address?.id || defaultAddress?.id,
          payment: payment,
          howReceive: howReceive,
          totalPrice: cart?.totalPrice && cart?.totalPrice + shipFee,
          shipFee: shipFee,
        }));
      if (responseCreateOrder?.status === 200) {
        cart?.CartDetails.forEach(async (item) => {
          const responseCreateDetailOrder = await createDetailOrderApi({
            orderId: responseCreateOrder.data.data.order.id,
            productId: item.Product.id,
            amount: item.amount,
            discountId: checkDiscount(item)
              ? checkDiscount(item).id
              : undefined,
            price: checkDiscount(item)
              ? item.Product.priceWithDiscount
              : item.Product.price,
          });
          if (responseCreateDetailOrder.status === 200) {
            const responseUpdateCart = await deleteCartApi(item.id);
            if (responseUpdateCart.status !== 200) {
              Swal.fire({
                text: "Có lỗi xảy ra. Vui lòng thử lại",
                icon: "error",
              });
            }
          } else {
            Swal.fire({
              text: "Có lỗi xảy ra. Vui lòng thử lại",
              icon: "error",
            });
          }
        });
        Swal.fire({
          text: "Đơn hàng đã được đặt thành công",
          icon: "success",
        });
        navigate("/");
      } else {
        Swal.fire({
          text: "Có lỗi xảy ra. Vui lòng thử lại",
          icon: "error",
        });
      }
    }
  };

  if (!cart || loading) {
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
      <div className="bg-[#f0f1f3] py-4">
        <div className="container">
          <Link to="/gio-hang" className="text-primary">
            <i className="fa-solid fa-chevron-left"></i> Quay lại giỏ hàng
          </Link>
          <div className=" my-4 font-medium ">Danh sách sản phẩm</div>
          <div className="grid grid-cols-12 border-b-[1px] ">
            <div className="col-span-8">
              <div className=" bg-white px-4 rounded-xl  ">
                {cart?.CartDetails.length !== 0 &&
                  cart?.CartDetails.map((item) => (
                    <div
                      key={item.id}
                      className=" flex items-center border-b-[1px] border-gray-300 py-4 "
                    >
                      <div className="flex items-center w-8/12 ">
                        <img
                          src={
                            item.Product.image
                            // item.Product?.images.length !== 0
                            //   ? item.Product?.images[0].url
                            //   : ""
                          }
                          alt="img"
                          className="w-16 h-16 rounded-lg border-[1px] p-2 mx-4"
                        />
                        <span className=" line-clamp-3">
                          {item.Product.name}
                        </span>
                      </div>
                      <div className="w-3/12">
                        {formatCurrency(
                          checkDiscount(item)
                            ? item.Product.priceWithDiscount
                            : item.Product.price
                        )}
                        đ
                        {checkDiscount(item) && (
                          <div className="text-gray-600 text-sm font-normal line-through">
                            {formatCurrency(item.Product.price)}đ
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {" "}
                        x<span>{item.amount}</span>{" "}
                        <span>{item.Product.unit}</span>
                      </div>
                    </div>
                  ))}
              </div>
              <form>
                <div className="my-4 flex items-center justify-between">
                  <div className="font-medium">Chọn hình thức nhận hàng</div>
                  <Radio.Group
                    defaultValue={howReceive}
                    buttonStyle="solid"
                    onChange={(e) => setHowReceive(e.target.value)}
                  >
                    <Radio.Button value={0}>Giao hàng tận nơi</Radio.Button>
                    <Radio.Button value={1}>Nhận tại nhà thuốc</Radio.Button>
                  </Radio.Group>
                </div>
                <div className="bg-white p-4 rounded-xl  ">
                  <div className="text-gray-700">
                    <i className="fa-solid fa-user"></i>
                    <span className="mx-2 font-medium ">
                      Thông tin người đặt
                    </span>
                  </div>
                  <div className="pt-4 border-b-[1px] border-gray-300 pb-4">
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label htmlFor="fullNameOrder" className="text-sm">
                          Họ và tên
                        </label>
                        <input
                          readOnly
                          defaultValue={
                            user ? user?.lastName + " " + user?.firstName : ""
                          }
                          name="fullNameOrder"
                          className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary mt-1 cursor-default bg-[#e1dfdf]"
                        />
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="phoneOrder" className="text-sm">
                          Số điện thoại
                        </label>
                        <input
                          required
                          name="phoneOrder"
                          value={orderPhone}
                          onChange={(e) => setOrderPhone(e.target.value)}
                          className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary mt-1"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label htmlFor="emailOrder" className="text-sm">
                        Email
                      </label>
                      <input
                        name="emailOrder"
                        value={orderEmail}
                        onChange={(e) => setOrderEmail(e.target.value)}
                        className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary mt-1"
                      />
                    </div>
                  </div>

                  {howReceive === 0 && (
                    <div className="text-gray-700 mt-6">
                      <i className="fa-solid fa-location-dot"></i>
                      <span className="mx-2 font-medium ">
                        Địa chỉ nhận hàng
                      </span>
                      {address ? (
                        <div className="my-4">
                          <div className="font-medium">
                            <span>{address.receiveName}</span>
                            <span className="ml-2">
                              ({address.receivePhone})
                            </span>
                          </div>
                          <div className="mt-2 flex items-center ">
                            <span>
                              {address.detail}, {address.ward},{" "}
                              {address.district}, {address.province}
                            </span>
                            {address.defaultAddress && (
                              <div className="px-1 text-primary border border-primary text-xs ml-4">
                                Mặc định
                              </div>
                            )}

                            <div className="text-primary  text-right flex-1 mr-4">
                              <span
                                className="cursor-pointer "
                                onClick={() => setOpenSelectAddress(true)}
                              >
                                Thay đổi
                              </span>
                            </div>
                          </div>
                          <SelectAddress
                            openSelectAddress={openSelectAddress}
                            setOpenSelectAddress={setOpenSelectAddress}
                            setAddress={setAddress}
                          />
                        </div>
                      ) : (
                        defaultAddress && (
                          <div className="my-4">
                            <div className="font-medium">
                              <span>{defaultAddress?.receiveName}</span>
                              <span className="ml-2">
                                ({defaultAddress?.receivePhone})
                              </span>
                            </div>
                            <div className="mt-2 flex items-center ">
                              <span>
                                {defaultAddress?.detail}, {defaultAddress?.ward}
                                , {defaultAddress?.district},{" "}
                                {defaultAddress?.province}
                              </span>
                              {defaultAddress?.defaultAddress && (
                                <div className="px-1 text-primary border border-primary text-xs ml-4">
                                  Mặc định
                                </div>
                              )}

                              <div className="text-primary  text-right flex-1 mr-4">
                                <span
                                  className="cursor-pointer "
                                  onClick={() => setOpenSelectAddress(true)}
                                >
                                  Thay đổi
                                </span>
                              </div>
                            </div>
                            <SelectAddress
                              openSelectAddress={openSelectAddress}
                              setOpenSelectAddress={setOpenSelectAddress}
                              setAddress={setAddress}
                            />
                          </div>
                        )
                      )}
                      {!address && !defaultAddress && (
                        <div className="mt-4">
                          <button
                            className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-blue-500"
                            onClick={() => {
                              setOpenNewFirstAddress(true);
                            }}
                          >
                            + Thêm địa chỉ mới
                          </button>
                          <CreateFirstAddress
                            openNewAddress={openNewFirstAddress}
                            setOpenNewAddress={setOpenNewFirstAddress}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="my-4 flex items-center justify-between">
                  <div className="font-medium">Chọn hình thức thanh toán</div>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <Radio.Group
                    defaultValue={payment}
                    onChange={(e) => setPayment(e.target.value)}
                  >
                    <Radio value={0}>Thanh toán khi nhận hàng</Radio>
                    <Radio value={1}>Thanh toán bằng ATM nội địa</Radio>
                    <Radio value={2}>Thanh toán bằng MoMo</Radio>
                  </Radio.Group>
                </div>
              </form>
            </div>
            <div className="col-span-4 ml-4 bg-white p-4 h-min rounded-xl">
              <div className="flex justify-between items-center">
                <span className=" ">Tổng tiền: </span>
                <span className=" ">{formatCurrency(cart.totalPrice)}đ</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="">Phí vận chuyển: </span>
                <span className="">{formatCurrency(shipFee)}đ</span>
              </div>
              <div className="mt-4 border-t-[1px] border-gray-300">
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-medium">Thành tiền: </span>
                  <span className="text-lg font-medium text-primary">
                    {formatCurrency(cart.totalPrice + shipFee)}đ
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  type="primary"
                  className="bg-primary w-full"
                  size="large"
                  shape="round"
                  onClick={handleBuy}
                >
                  Hoàn tất
                </Button>
              </div>
              <div className="mt-6 text-center text-sm">
                <span>
                  Bằng việc tiến hành đặt mua hàng, bạn đồng ý với điều khoản
                  dịch vụ, chính sách thu thập và xử lý dữ liệu cá nhân của Nhà
                  thuốc
                </span>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Buy;

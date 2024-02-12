import { Button, Modal, Radio, Spin, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/function";
import { DeleteOutlined } from "@ant-design/icons";
import {
  deleteCartApi,
  getCartApi,
  selectedAllApi,
  updateCartAmountApi,
  updateCartApi,
  updateCartSelectedApi,
} from "../apis/cartApi";
import authStore from "../store/store";
import { useEffect, useState } from "react";
import { CartDetail, Cart as CartType } from "../interfaces/cartInterface";
import Swal from "sweetalert2";

function Cart() {
  const navigate = useNavigate();
  const user = authStore((state) => state.user);
  const [cart, setCart] = useState<CartType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCartByCusId = async () => {
      const response = await getCartApi({ customerId: user ? user.id : -1 });
      setTimeout(() => {
        if (response.status === 200) {
          setCart(response.data.data.cart);
          setLoading(false);
        }
      }, 400);
    };
    getCartByCusId();
  }, []);

  const deleteCartItem = async (id: number) => {
    try {
      Swal.fire({
        title: "Bạn chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Hủy bỏ`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteCartApi(id);
          if (response.status === 200) {
            const responseUpdate = cart && (await updateCartApi(cart?.id));
            console.log(responseUpdate);
            if (responseUpdate?.status === 200) {
              setCart(responseUpdate.data.data.cart);
              message.success("Đã xóa sản phẩm khỏi giỏ hàng");
              setLoading(false);
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkDiscount = (item: CartDetail) => {
    if (item.Product.discountList.length > 0) {
      const discountUsed = item.Product.discountList.find(
        (item) =>
          item.active &&
          new Date(item.discountProgram.endAt) > new Date() &&
          new Date(item.discountProgram.startAt) <= new Date()
      );
      if (discountUsed) {
        return true;
      }
    } else {
      return false;
    }
  };

  const handleCheckItem = async (id: number, selected: boolean) => {
    setLoading(true);
    const response = await updateCartSelectedApi(id, selected);
    if (response.status === 200) {
      const responseUpdate = cart && (await updateCartApi(cart?.id));
      setTimeout(() => {
        if (responseUpdate?.status === 200) {
          setCart(responseUpdate.data.data.cart);
          setLoading(false);
        }
      }, 400);
    }
  };

  const handleCheckAll = async (selected: boolean) => {
    setLoading(true);
    const response = cart && (await selectedAllApi(cart.id, selected));
    if (response?.status === 200) {
      const responseUpdate = cart && (await updateCartApi(cart?.id));

      if (responseUpdate?.status === 200) {
        setTimeout(() => {
          setLoading(false);
          setCart(responseUpdate.data.data.cart);
        }, 400);
      }
    }
  };

  const checkAll = () => {
    const checkAll =
      cart?.CartDetails.length !== 0 &&
      cart?.CartDetails.find((item) => item.selected === false);
    if (checkAll) return false;
    return true;
  };

  const handleUpdateAmount = async (id: number, amount: number) => {
    setLoading(true);
    const response = await updateCartAmountApi(id, amount);
    if (response.status === 200) {
      const responseUpdate = cart && (await updateCartApi(cart?.id));
      setTimeout(() => {
        if (response?.status === 200 && responseUpdate?.status === 200) {
          setCart(responseUpdate.data.data.cart);
          setLoading(false);
        }
      }, 400);
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
          <div className="mx-4 text-sm">
            <Link to="/" className=" text-primary ">
              Trang chủ
            </Link>

            <span> / Giỏ hàng</span>
          </div>
          <div className="mt-4  flex">
            <div className="w-2/3 bg-white p-4 rounded-xl">
              {cart?.CartDetails.length !== 0 && (
                <div className="flex items-center">
                  <div className="w-6/12">
                    <Radio
                      className="font-medium"
                      checked={checkAll()}
                      onClick={() => handleCheckAll(!checkAll())}
                    >
                      {" "}
                      Chọn tất cả
                    </Radio>
                  </div>
                  <div className="w-2/12 text-center text-sm font-medium">
                    Giá thành
                  </div>
                  <div className="w-2/12 text-center text-sm font-medium">
                    Số lượng
                  </div>
                  <div className="w-2/12 text-center text-sm font-medium">
                    Đơn vị
                  </div>
                  <div className="w-1/12"></div>
                </div>
              )}

              {cart?.CartDetails.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="https://nhathuoclongchau.com.vn/estore-images/empty-cart.png"
                    alt="cart empty"
                  />
                  <div>Chưa có sản phẩm nào trong giỏ hàng</div>
                  <Link
                    to="/"
                    className="py-2 px-4 bg-primary text-white mt-4 rounded-xl "
                  >
                    Mua hàng
                  </Link>
                </div>
              )}
              {cart?.CartDetails.length !== 0 &&
                cart?.CartDetails.map((item) => (
                  <div className="flex mt-4 items-center" key={item.id}>
                    <div className="w-6/12">
                      <Radio
                        className=""
                        checked={item.selected}
                        onClick={() => {
                          handleCheckItem(item.id, !item.selected);
                        }}
                      >
                        <div className="flex items-center">
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
                      </Radio>
                    </div>
                    <div className="w-2/12 text-center text-sm font-medium text-primary">
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

                    <div className="w-2/12 text-center text-sm font-medium flex justify-center items-center">
                      <div
                        className="py-1 px-3 rounded-l-2xl border-[1px] border-gray-400 cursor-pointer"
                        onClick={() =>
                          handleUpdateAmount(item.id, item.amount - 1)
                        }
                      >
                        -
                      </div>
                      <input
                        type="number"
                        className="py-1 px-2 outline-none w-12 border-y-[1px] border-gray-400 text-center "
                        min={1}
                        value={item.amount}
                        onChange={(e) =>
                          handleUpdateAmount(item.id, parseInt(e.target.value))
                        }
                      />
                      <div
                        className="py-1 px-3 rounded-r-2xl border-[1px] border-gray-400 cursor-pointer"
                        onClick={() =>
                          handleUpdateAmount(item.id, item.amount + 1)
                        }
                      >
                        +
                      </div>
                    </div>
                    <div className="w-2/12 text-center text-sm ">Hộp</div>
                    <div
                      className="w-1/12 text-lg cursor-pointer text-center"
                      onClick={() => deleteCartItem(item.id)}
                    >
                      <DeleteOutlined />
                    </div>
                  </div>
                ))}
            </div>
            <div className="w-1/3 ml-4 bg-white p-4 h-min rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Tổng tiền: </span>
                <span className="text-lg font-medium text-primary">
                  {formatCurrency(cart?.totalPrice)}đ
                </span>
              </div>
              <div className="mt-6">
                {cart?.CartDetails.length !== 0 && (
                  <Button
                    type="primary"
                    className="bg-primary w-full"
                    size="large"
                    shape="round"
                    onClick={() => {
                      navigate("/mua-hang");
                    }}
                  >
                    Mua hàng
                  </Button>
                )}
              </div>
              <div className="mt-6 text-center text-sm">
                <span>
                  Bằng việc tiến hành đặt mua hàng, bạn đồng ý với điều khoản
                  dịch vụ, chính sách thu thập và xử lý dữ liệu cá nhân của Nhà
                  thuốc
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;

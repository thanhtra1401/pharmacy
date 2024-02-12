import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Order } from "../interfaces/orderInterface";
import { getOrderByIdApi } from "../apis/orderApi";
import { Button, Modal, Spin } from "antd";
import { formatCurrency } from "../utils/function";
import Swal from "sweetalert2";
import { addToCartApi, updateCartApi } from "../apis/cartApi";
import { productStore } from "../store/store";

function OrderDetail() {
  const cartId = productStore((state) => state.cart_id);
  const [buy, setBuy] = useState(false);
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      if (id) {
        const response = await getOrderByIdApi(parseInt(id));
        if (response?.status === 200) {
          setTimeout(() => {
            setOrder(response.data.data.order);
            setLoading(false);
          }, 400);
        }
      }
    };
    getOrder();
  }, [id]);

  const addToCart = async () => {
    order?.OrderDetails.forEach(async (item) => {
      const response = await addToCartApi({
        cartId: cartId,
        productId: item.productId,
        amount: item.amount,
      });

      if (response.status !== 200) {
        Swal.fire({
          text: "Có lỗi xảy ra. Vui lòng thử lại",
          icon: "error",
        });
      } else {
        const responseUpdateCart = await updateCartApi(cartId);
        if (responseUpdateCart.status !== 200) {
          Swal.fire({
            text: "Có lỗi xảy ra. Vui lòng thử lại",
            icon: "error",
          });
        }
      }
    });

    Swal.fire({
      title: "Đã thêm vào giỏ hàng",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Đi đến giỏ hàng",
      denyButtonText: `Về trang đơn hàng`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/gio-hang");
      }
    });
  };
  if (!order || loading) {
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
          <Link to="/thong-tin-ca-nhan/don-hang" className="text-primary">
            Đơn hàng của tôi
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span>Chi tiết đơn hàng</span>
        </div>

        <div className="grid grid-cols-12 container mt-4">
          <div className="col-span-8">
            <div className=" bg-white p-4 rounded-xl">
              <div className="flex justify-between pb-3 items-center border-b-2 border-gray-300 ">
                <div className="flex">
                  <div className=" mr-2 font-medium">
                    <span>Đơn hàng </span>
                    {order.createdAt &&
                      new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-gray-600">#{order.id}</div>
                </div>

                {order.status === 0 && (
                  <div className="text-[#64b5f6] flex items-center">
                    <i className="fa-solid fa-circle text-[8px]"></i>
                    <span className="mr-4 ml-2">Đang xử lý</span>
                  </div>
                )}
                {order.status === 1 && (
                  <div className="text-[#ff9800] flex items-center">
                    <i className="fa-solid fa-circle text-[8px]"></i>
                    <span className="mr-4 ml-2">Đang giao</span>
                  </div>
                )}
                {order.status === 2 && (
                  <div className=" text-[#4caf50] flex items-center">
                    <i className="fa-solid fa-circle text-[8px]"></i>
                    <span className="mr-4 ml-2">Đã giao</span>
                  </div>
                )}
              </div>
              <div className=" py-3 grid grid-cols-12">
                <div className="col-span-6 border-r border-gray-300">
                  <div className="font-medium">
                    <i className="fa-solid fa-user"></i>
                    <span className="ml-2">Thông tin người nhận</span>
                  </div>
                  <div className="mt-4">
                    {order.Address && order.Address.receiveName}
                  </div>
                  <div className="mt-2">{order.Address?.receivePhone}</div>
                </div>
                <div className="col-span-6 ml-4">
                  <div className="font-medium">
                    <i className="fa-solid fa-location-dot"></i>
                    <span className="ml-2">Nhận hàng tại</span>
                  </div>
                  <div className="mt-4">
                    {order.Address?.detail}, {order.Address?.ward},{" "}
                    {order.Address?.district}, {order.Address?.province}
                  </div>
                </div>
              </div>
            </div>
            <div className=" my-4">
              <div className="font-medium">Danh sách sản phẩm</div>
              <div className="bg-white p-4 rounded-xl mt-2">
                {order.OrderDetails.map((item) => (
                  <div
                    key={item.id}
                    className="flex mt-4 items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.Product.image}
                        alt="img"
                        className="w-16 h-16 rounded-lg border-[1px] p-2 mx-4"
                      />
                      <span className="font-medium uppercase">
                        {item.Product.name}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-medium">
                        {formatCurrency(item.price)}đ
                      </span>
                      <span className="mx-4">
                        x{item.amount} {item.Product.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="col-span-4 ml-4 bg-white p-4 h-min rounded-xl">
              <div className="flex justify-between items-center">
                <span className=" ">Tổng tiền: </span>
                <span className=" ">
                  {formatCurrency(order.totalPrice - (order.shipFee || 0))}đ
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="">Phí vận chuyển: </span>
                <span className="">{formatCurrency(order.shipFee || 0)}đ</span>
              </div>
              <div className="mt-4 border-t-[1px] border-gray-300">
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-medium">Thành tiền: </span>
                  <span className="text-lg font-medium text-primary">
                    {formatCurrency(order.totalPrice)}đ
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t-[1px] border-gray-300">
                <div className="flex justify-between items-center mt-4">
                  <div className="font-medium ">Phương thức thanh toán: </div>
                  {order.payment === 0 && <div> Thanh toán khi nhận hàng</div>}
                  {order.payment === 1 && (
                    <div>Thanh toán bằng ATM nội địa</div>
                  )}
                  {order.payment === 2 && <div>Thanh toán bằng MoMo</div>}
                </div>
              </div>

              {order.status === 2 && (
                <div className="mt-4 ">
                  <i className="fa-solid fa-circle-check mr-2 text-green-600"></i>
                  Đã nhận hàng vào{" "}
                  {order.updatedAt &&
                    new Date(order.updatedAt).toLocaleString()}
                </div>
              )}
              <div className="mt-6">
                <Button
                  type="primary"
                  className="bg-primary w-full"
                  size="large"
                  shape="round"
                  onClick={() => {
                    setBuy(true);
                  }}
                >
                  Mua lại
                </Button>
              </div>
              {buy && (
                <Modal
                  open={buy}
                  onCancel={() => {
                    setBuy(false);
                  }}
                  title="Mua lại đơn hàng"
                  width={700}
                  className="text-center"
                  okText="Thêm vào giỏ hàng"
                  cancelText="Hủy bỏ"
                  closeIcon={false}
                  okButtonProps={{ className: "bg-primary" }}
                  onOk={() => {
                    addToCart();
                    setBuy(false);
                  }}
                >
                  <div>
                    {order.OrderDetails.map((item) => (
                      <div
                        key={item.id}
                        className="flex mt-4 items-center justify-between"
                      >
                        <div className="flex items-center">
                          <img
                            src={item.Product.image}
                            alt="img"
                            className="w-16 h-16 rounded-lg border-[1px] p-2 mx-4"
                          />
                          <span className="font-medium uppercase">
                            {item.Product.name}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="mx-4">
                            x{item.amount} {item.Product.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetail;

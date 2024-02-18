import { Button, Modal } from "antd";
import { formatCurrency } from "../../utils/function";
import { Order } from "../../interfaces/orderInterface";
import { useState } from "react";
import { addToCartApi, updateCartApi } from "../../apis/cartApi";
import { productStore } from "../../store/store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { updateOrderApi } from "../../apis/orderApi";

function OrderItem({ order }: { order: Order }) {
  const cartId = productStore((state) => state.cart_id);
  const [buy, setBuy] = useState(false);
  const navigate = useNavigate();
  const cancelOrder = async () => {
    Swal.fire({
      icon: "question",
      title: "Hủy đơn hàng",
      text: "Bạn có chắc chắn muốn hủy đơn hàng này?",
      showDenyButton: true,
      confirmButtonText: "Xác nhận",
      confirmButtonColor: "#d33",
      denyButtonColor: "#3085d6",
      denyButtonText: `Trở lại`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (order.id) {
          const response = await updateOrderApi({ status: 4 }, order.id);
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Thành công",
              text: "Đã hủy đơn hàng",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Thất bại",
              text: "Đã xảy ra lỗi",
            });
          }
        }
      }
    });
  };

  const addToCart = async () => {
    order.OrderDetails.forEach(async (item) => {
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
      title: "Thành công",
      icon: "success",
      text: "Đã thêm vào giỏ hàng",
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

  return (
    <div className="w-full bg-white mt-4 ">
      <div className="flex justify-between py-3 items-center border-b-2 border-gray-300 ">
        <div className="flex">
          <div className="mx-4 font-medium">
            <span>Đơn hàng </span>
            {order.createdAt && new Date(order.createdAt).toLocaleDateString()}
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
        {order.status === 4 && (
          <div className=" text-red-500 flex items-center">
            <i className="fa-solid fa-circle text-[8px]"></i>
            <span className="mr-4 ml-2">Đã hủy</span>
          </div>
        )}
      </div>
      {order.OrderDetails.map((item) => (
        <div key={item.id} className="flex mt-4 items-center justify-between">
          <div className="flex items-center">
            <img
              src={item.Product.image}
              alt="img"
              className="w-16 h-16 rounded-lg border-[1px] p-2 mx-4"
            />
            <span className="font-medium uppercase">{item.Product.name}</span>
          </div>
          <div className="flex">
            <span className="font-medium">{formatCurrency(item.price)}đ</span>
            <span className="mx-4">
              x{item.amount} {item.Product.unit}
            </span>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between py-4 border-b-2 border-gray-300">
        <div
          className="flex items-center text-primary cursor-pointer"
          onClick={() => {
            navigate(`/thong-tin-ca-nhan/don-hang/${order.id}`);
          }}
        >
          <div className="ml-4 mr-2">Xem chi tiết</div>
          <i className="fa-solid fa-chevron-right text-xs leading-none"></i>
        </div>
        <div className="mx-4">
          Thành tiền:{" "}
          <span className="text-primary font-medium ">
            {formatCurrency(order.totalPrice)}đ
          </span>
        </div>
      </div>
      <div className="flex  py-4 items-center justify-between ">
        <Button
          type="primary"
          className="bg-primary mx-4"
          shape="round"
          onClick={() => {
            setBuy(true);
          }}
        >
          <div className="px-4">Mua lại</div>
        </Button>
        <Button
          type="primary"
          danger
          disabled={order.status !== 0}
          className={` mx-4`}
          shape="round"
          onClick={() => {
            order.status === 0 && cancelOrder();
          }}
        >
          <div className="px-4">Hủy</div>
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
  );
}

export default OrderItem;

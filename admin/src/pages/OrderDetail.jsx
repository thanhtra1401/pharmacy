import { useParams } from "react-router-dom";
import { getOrderApi, updateStatusOrderApi } from "../apis/orderApi";
import { formatCurrency } from "../utils/function";
import { useEffect, useState } from "react";
import Loading from "../components/Home/Loading";
import { Popover, message } from "antd";

function OrderDetail() {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);

  const [isUpdated, setIsUpdated] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getOder = async () => {
      const response = await getOrderApi(id);
      if (response.status === 200) {
        setTimeout(() => {
          setOrder(response.data.data.order);
          setLoading(false);
        }, 400);
      }
    };
    getOder();
  }, [isUpdated]);

  const handleUpdate = async (data) => {
    const response = await updateStatusOrderApi(data, order.id);
    if (response.status === 200) {
      message.success("Đã cập nhật trạng thái đơn hàng");
      setIsUpdated((prev) => !prev);
    }
  };

  const confirmOrder = () => (
    <div className="">
      <div>Vui lòng chọn xác nhận để xác nhận đơn hàng</div>
      <button
        className="rounded-lg border py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 mt-2"
        onClick={() => {
          handleUpdate({ status: 1 });
        }}
      >
        Xác nhận
      </button>
    </div>
  );
  const shipOrder = () => (
    <div className="">
      <div>Vui lòng chọn xác nhận nếu đơn hàng đã được giao thành công</div>
      <button
        className="rounded-lg border py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 mt-2"
        onClick={() => {
          handleUpdate({ status: 2 });
        }}
      >
        Xác nhận
      </button>
    </div>
  );

  if (loading) return <Loading></Loading>;

  return (
    <div className="m-4">
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
                <div className="text-[#64b5f6] flex items-center cursor-pointer">
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
            <div className="font-medium ml-4">Danh sách sản phẩm</div>
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
                {order.payment === 1 && <div>Thanh toán bằng ATM nội địa</div>}
                {order.payment === 2 && <div>Thanh toán bằng MoMo</div>}
              </div>
            </div>

            {order.status === 0 && (
              <div className="mt-4 ">
                <div className="mt-4 flex">
                  <div className="font-medium w-1/2">Trạng thái đơn hàng: </div>
                  <div className="w-1/2">
                    <div>Đang xử lý</div>
                    <div className=" mt-2 text-blue-500 hover:text-blue-600 cursor-pointer">
                      <Popover
                        content={confirmOrder}
                        title="Cập nhật trạng thái đơn hàng"
                        trigger="click"
                      >
                        Cập nhật
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {order.status === 1 && (
              <div className="mt-4 ">
                <div className="mt-4 flex">
                  <div className="font-medium w-1/2">Trạng thái đơn hàng: </div>
                  <div className="w-1/2">
                    <div>Đang giao hàng</div>
                    <div className=" mt-2 text-blue-500 hover:text-blue-600 cursor-pointer">
                      <Popover
                        content={shipOrder}
                        title="Cập nhật trạng thái đơn hàng"
                        trigger="click"
                      >
                        Cập nhật
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {order.status === 2 && (
              <div className="mt-4 ">
                <i className="fa-solid fa-circle-check mr-2 text-green-600"></i>
                Đã giao hàng vào{" "}
                {order.updatedAt && new Date(order.updatedAt).toLocaleString()}
              </div>
            )}
            {order.status === 4 && (
              <div className="mt-4 ">
                <i className="fa-solid fa-ban mr-2 text-red-600"></i>
                Đã hủy vào{" "}
                {order.updatedAt && new Date(order.updatedAt).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;

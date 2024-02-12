import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDiscountApi } from "../apis/discountApi";
import Loading from "../components/Home/Loading";
import { Modal } from "antd";
import ProductDiscount from "../components/Product/ProductDiscount";
import OrdersDiscount from "../components/Order/OrdersDiscount";
import {
  getOrderDetailsInDiscountApi,
  getOrdersOfDiscountApi,
} from "../apis/orderApi";
import { formatCurrency } from "../utils/function";
import OrderDetailsDiscount from "../components/Order/OrderDetailsDiscount";

function DiscountDetail() {
  const { id } = useParams();
  const [discount, setDiscount] = useState();
  const [loading, setLoading] = useState(true);
  const [openProductDiscount, setOpenProductDiscount] = useState(false);
  const [productDiscount, setProductDiscount] = useState([]);
  const [orders, setOrders] = useState([]);
  const [openOrdersDiscount, setOpenOrdersDiscount] = useState(false);
  const [isUpdatedOrder, setIsUpdatedOrder] = useState(false);

  const [orderDetails, setOrdersDetails] = useState([]);

  const [openProductOrderDiscount, setOpenProductOrderDiscount] =
    useState(false);
  useEffect(() => {
    const getOrderDetails = async () => {
      const response = await getOrderDetailsInDiscountApi(id);
      if (response.status === 200) {
        setOrdersDetails(response.data.data.orderDetails);
      }
    };
    getOrderDetails();
  }, [id]);

  useEffect(() => {
    const getOrdersDiscount = async () => {
      const response = await getOrdersOfDiscountApi(id);
      if (response.status === 200) {
        setOrders(response.data.data.orders);
      }
    };
    getOrdersDiscount();
  }, [id, isUpdatedOrder]);

  useEffect(() => {
    const getDiscount = async () => {
      const response = await getDiscountApi(id);
      if (response.status === 200) {
        if (response.data.data.discount.DiscountDetails.length > 0) {
          let arr = [];
          response.data.data.discount.DiscountDetails.forEach((item) => {
            arr.push(item.Product);
          });
          setProductDiscount(arr);
        }
        setTimeout(() => {
          setDiscount(response.data.data.discount);

          setLoading(false);
        }, 400);
      }
    };
    getDiscount();
  }, [id]);

  const getTotalPriceDiscount = (orderDetails) => {
    const totalPrice = orderDetails.reduce((total, item) => {
      return total + item.amount * item.price;
    }, 0);
    return totalPrice;
  };
  if (loading) return <Loading />;
  return (
    <div className="m-4">
      <div className="font-medium text-lg">
        Thông tin chương trình khuyến mại
      </div>
      {discount.DiscountDetails.length > 0 && (
        <Modal
          open={openProductDiscount}
          footer={false}
          onCancel={() => setOpenProductDiscount(false)}
          width={1000}
        >
          <ProductDiscount products={productDiscount} loading={loading} />
        </Modal>
      )}
      {orders.length > 0 && (
        <Modal
          open={openOrdersDiscount}
          footer={false}
          onCancel={() => setOpenOrdersDiscount(false)}
          width={1000}
        >
          <OrdersDiscount
            orders={orders}
            loading={loading}
            setIsUpdated={setIsUpdatedOrder}
          />
        </Modal>
      )}
      {orderDetails.length > 0 && (
        <Modal
          open={openProductOrderDiscount}
          footer={false}
          onCancel={() => setOpenProductOrderDiscount(false)}
          width={1000}
        >
          <OrderDetailsDiscount orderDetails={orderDetails} loading={loading} />
        </Modal>
      )}

      <div className="grid grid-cols-12">
        <div className="col-span-5 pb-4 border-gray-400 border-r">
          <div className="mt-6 flex items-center">
            <div className="w-1/3 font-medium">Mã: </div>
            <div className="">{discount.id}</div>
          </div>
          <div className="mt-6 flex items-center">
            <div className="w-1/3 font-medium">Tên: </div>
            <div className="">{discount.name}</div>
          </div>
          <div className="mt-6 flex items-center">
            <div className="w-1/3 font-medium">Mô tả: </div>
            <div className="">{discount.description}</div>
          </div>
          <div className="mt-6 flex items-center">
            <div className="w-1/3 font-medium">Phần trăm giảm: </div>
            <div className="">{discount.discountPercent}%</div>
          </div>
          <div className="mt-6 flex items-center">
            <div className="w-1/3 font-medium">Thời gian bắt đầu: </div>
            <div className="">
              {new Date(discount.startAt).toLocaleString()}
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <div className="w-1/3 font-medium">Thời gian kết thúc: </div>
            <div className="">{new Date(discount.endAt).toLocaleString()}</div>
          </div>
        </div>
        <div className="col-span-7 pb-4 ml-4">
          <div className="mt-6 flex items-center">
            <div className="w-1/3 font-medium">Thời gian tạo: </div>
            <div className="">
              {new Date(discount.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <div className="w-1/3 font-medium">Số sản phẩm được áp dụng: </div>
            <div className="">{discount.DiscountDetails.length}</div>
            {discount?.DiscountDetails.length > 0 && (
              <div
                className=" text-blue-500 hover:text-blue-600 hover:underline cursor-pointer ml-4"
                onClick={() => {
                  setOpenProductDiscount(true);
                }}
              >
                Xem chi tiết
              </div>
            )}
          </div>
          <div className="mt-6 flex items-center">
            <div className="w-1/3 font-medium">Số đơn hàng được đặt: </div>
            <div className="">{orders.length}</div>
            {orders.length > 0 && (
              <div
                className=" text-blue-500 hover:text-blue-600 hover:underline cursor-pointer ml-4"
                onClick={() => {
                  setOpenOrdersDiscount(true);
                }}
              >
                Xem chi tiết
              </div>
            )}
          </div>
          <div className="mt-6 flex items-center">
            <div className="w-1/3 font-medium">Doanh thu: </div>
            <div className="">
              {orderDetails.length > 0
                ? formatCurrency(getTotalPriceDiscount(orderDetails))
                : 0}
              đ
            </div>
            {orderDetails.length > 0 && (
              <div
                className=" text-blue-500 hover:text-blue-600 hover:underline cursor-pointer ml-4"
                onClick={() => {
                  setOpenProductOrderDiscount(true);
                }}
              >
                Xem chi tiết
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscountDetail;

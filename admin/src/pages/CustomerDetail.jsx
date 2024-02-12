import { Link, useParams } from "react-router-dom";
import { getCustomerByIdApi } from "../apis/userApi";
import { useEffect, useState } from "react";
import Loading from "../components/Home/Loading";
import { formatCurrency } from "../utils/function";
import { Modal } from "antd";
import OrderOfCustomer from "./OrderOfCustomer";

function CustomerDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState();

  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    const getCustomer = async () => {
      const response = await getCustomerByIdApi(id);
      if (response.status === 200) {
        setTimeout(() => {
          setCustomer(response.data.data.user);
          setLoading(false);
        }, 400);
      }
    };
    getCustomer();
  }, [id]);

  const findOrderRecent = (arr) => {
    let max = arr[0].createdAt;
    let index = 0;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i].createdAt > max) {
        max = arr[i].createdAt;
        index = i;
      }
    }
    return index;
  };
  if (loading) return <Loading />;
  return (
    <div className="m-4">
      <Modal
        open={showOrders}
        footer={false}
        onCancel={() => setShowOrders(false)}
        width={1000}
      >
        <OrderOfCustomer customerId={id}></OrderOfCustomer>
      </Modal>

      <div className="font-medium text-lg">Thông tin khách hàng</div>
      <div className="grid grid-cols-12">
        <div className="col-span-5 pb-4 border-gray-400 border-r">
          <div className="mt-6 flex items-center">
            <div className="w-1/3 font-medium">Ảnh đại diện: </div>
            <img src={customer?.avatar || ""} className="w-28 h-28"></img>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Họ tên: </div>
            <div className="">
              {customer?.lastName} {customer?.firstName}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Số điện thoại: </div>
            <div className="">{customer?.phone}</div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Email: </div>
            <div className="">{customer?.email}</div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Giới tính: </div>
            <div className="">
              {customer?.gender === "male" && "Nam"}{" "}
              {customer?.gender === "female" && "Nữ"}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Ngày sinh: </div>
            <div className="">
              {new Date(customer?.dob).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="col-span-7 ml-4">
          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Mã khách hàng: </div>
            <div className="">{customer?.id}</div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Ngày tạo tài khoản: </div>
            <div className="">
              {new Date(customer?.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Tổng số đơn hàng: </div>
            <div className="w-1/3">{customer?.Orders.length}</div>
            {customer?.Orders.length > 0 && (
              <div
                className=" text-blue-500 hover:text-blue-600 hover:underline cursor-pointer ml-4"
                onClick={() => setShowOrders(true)}
              >
                Xem chi tiết
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Tổng giá trị đơn hàng: </div>
            <div className="">
              {customer?.Orders.length > 0
                ? formatCurrency(
                    customer?.Orders.reduce((total, item) => {
                      return total + item.totalPrice;
                    }, 0)
                  ) + " đ"
                : 0}
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Lần đặt hàng gần nhất: </div>
            <div className="w-1/3">
              {customer?.Orders.length > 0
                ? new Date(
                    customer.Orders[findOrderRecent(customer.Orders)].createdAt
                  ).toLocaleString()
                : "Chưa có đơn hàng"}
            </div>
            {customer?.Orders.length > 0 && (
              <Link
                to={`/don-hang/chi-tiet-don-hang/${
                  customer?.Orders[findOrderRecent(customer?.Orders)].id
                }`}
              >
                <div className=" text-blue-500 hover:text-blue-600 hover:underline cursor-pointer ml-4">
                  Xem chi tiết
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;

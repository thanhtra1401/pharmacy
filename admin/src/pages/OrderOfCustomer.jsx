import { useEffect, useState } from "react";
import { getOrdersOfUserApi, updateStatusOrderApi } from "../apis/orderApi";
import Loading from "../components/Home/Loading";
import { Popover, Space, Table, Tag, Typography, message } from "antd";
import { Link } from "react-router-dom";
import "./Order.css";
import PropTypes from "prop-types";

OrderOfCustomer.propTypes = {
  customerId: PropTypes.string,
};
function OrderOfCustomer({ customerId }) {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      setTimeout(async () => {
        const response = await getOrdersOfUserApi(customerId);
        if (response.status === 200) {
          setOrders(response.data.data.orders);
          setLoading(false);
        }
      }, 400);
    };
    getOrder();
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

  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="m-4">
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Đơn hàng</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: "Mã",
              dataIndex: "id",
              key: "id",
            },

            {
              title: "Trạng thái",
              dataIndex: "status",
              key: "status",
              filters: [
                {
                  text: "Đang xử lý",
                  value: 0,
                },
                {
                  text: "Đang giao",
                  value: 1,
                },
                {
                  text: "Đã giao",
                  value: 2,
                },
              ],
              onFilter: (value, record) => record.status === value,

              render: (status, record) => {
                if (status === 0)
                  return (
                    <div>
                      <Tag
                        color="blue"
                        className="cursor-pointer"
                        onClick={() => {
                          setOrder(record);
                        }}
                      >
                        <Popover
                          content={confirmOrder}
                          title="Cập nhật trạng thái đơn hàng"
                          trigger="click"
                        >
                          Đang xử lý
                        </Popover>
                      </Tag>
                    </div>
                  );
                if (status === 1)
                  return (
                    <div>
                      <Tag
                        color="orange"
                        className="cursor-pointer"
                        onClick={() => {
                          setOrder(record);
                        }}
                      >
                        <Popover
                          content={shipOrder}
                          title="Cập nhật trạng thái đơn hàng"
                          trigger="click"
                        >
                          Đang giao
                        </Popover>
                      </Tag>
                    </div>
                  );
                if (status === 2) return <Tag color="green">Đã giao</Tag>;
              },
            },
            {
              title: "Phương thức thanh toán",
              dataIndex: "payment",
              key: "payment",
              render: (payment) => {
                if (payment === 0) return <div>Thanh toán khi nhận hàng</div>;
                if (payment === 1)
                  return <div>Thanh toán bằng thẻ ATM nội địa</div>;
                if (payment === 2) return <div>Thanh toán bằng MOMO</div>;
              },
            },
            {
              title: "Tổng tiền",
              dataIndex: "totalPrice",
              key: "totalPrice",
            },
            {
              title: "Hình thức nhận hàng",
              dataIndex: "howReceive",
              key: "howReceive",
              render: (value) => {
                if (value === 0) return <div>Giao hàng tận nơi</div>;
                if (value === 1) return <div>Nhận tại nhà thuốc</div>;
              },
            },
            {
              title: "Ngày tạo",
              dataIndex: "createdAt",
              key: "createdAt",
              render: (value) => new Date(value).toLocaleDateString(),
            },

            {
              title: "Chi tiết đơn hàng",
              dataIndex: "id",
              key: "id",
              render: (value) => {
                return (
                  <Link
                    to={`/don-hang/chi-tiet-don-hang/${value}`}
                    className="text-blue-500"
                  >
                    Xem chi tiết
                  </Link>
                );
              },
            },
          ]}
          pagination={{
            pageSize: 5,
          }}
          dataSource={orders}
        ></Table>
      </Space>
    </div>
  );
}

export default OrderOfCustomer;

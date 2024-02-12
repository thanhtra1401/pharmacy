import { Space, Table, Tooltip, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

OrderDetailsDiscount.propTypes = {
  orderDetails: PropTypes.array,
  loading: PropTypes.bool,
};
function OrderDetailsDiscount({ orderDetails, loading }) {
  const navigate = useNavigate();
  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Chi tiết</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: "Mã",
              dataIndex: "id",
              key: "id",
            },

            {
              title: "Mã đơn hàng",
              dataIndex: "orderId",
              key: "orderId",
              render: (value) => (
                <Tooltip title="Xem chi tiết đơn hàng" color="blue">
                  <div
                    onClick={() => {
                      navigate(`/don-hang/chi-tiet-don-hang/${value}`);
                    }}
                    className="text-blue-500 cursor-pointer hover:text-blue-600 hover:underline"
                  >
                    {value}
                  </div>
                </Tooltip>
              ),
            },
            {
              title: "Sản phẩm",
              dataIndex: "Product",
              key: "Product",
              render: (value) => (
                <Tooltip title="Xem chi tiết sản phẩm" color="blue">
                  <div
                    onClick={() => {
                      navigate(`/san-pham/chi-tiet-san-pham/${value.id}`);
                    }}
                    className="text-blue-500 cursor-pointer hover:text-blue-600 hover:underline"
                  >
                    {value.name}
                  </div>
                </Tooltip>
              ),
            },
            {
              title: "Số lượng",
              dataIndex: "amount",
              key: "amount",
            },
            {
              title: "Đơn giá",
              dataIndex: "price",
              key: "price",
            },
            {
              title: "Thành tiền ",
              dataIndex: "price",
              key: "price",
              render: (value, record) => <div>{record.amount * value}</div>,
            },
          ]}
          pagination={{
            pageSize: 5,
          }}
          dataSource={orderDetails}
        ></Table>
      </Space>
    </div>
  );
}

export default OrderDetailsDiscount;

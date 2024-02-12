import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/function";
import { Space, Table, Typography } from "antd";
import PropTypes from "prop-types";
ProductCat.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool,
};
function ProductCat({ products, loading }) {
  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Sản phẩm</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: "Mã",
              dataIndex: "id",
              key: "id",
            },

            {
              title: "Tên",
              dataIndex: "name",
              key: "name",
              width: 200,
            },
            {
              title: "Giá",
              dataIndex: "price",
              key: "price",
              sorter: (a, b) => a.price - b.price,
              sortDirections: ["ascend", "descend"],
              render: (value) => {
                return <div>{formatCurrency(value)}đ</div>;
              },
            },
            {
              title: "Còn lại",
              dataIndex: "quantity",
              key: "quantity",
              sorter: (a, b) => a.quantity - b.quantity,
              sortDirections: ["ascend", "descend"],
            },

            {
              title: "Ngày sản xuất",
              dataIndex: "manufactureDate",
              key: "manufactureDate",
              render: (value) => (
                <div>{new Date(value).toLocaleDateString()}</div>
              ),
            },
            {
              title: "Hạn sử dụng",
              dataIndex: "expiriedDate",
              key: "expiriedDate",
              render: (value) => (
                <div>{new Date(value).toLocaleDateString()}</div>
              ),
              sorter: (a, b) =>
                new Date(a.expiriedDate) - new Date(b.expiriedDate),
              sortDirections: ["ascend", "descend"],
            },

            {
              title: "Chi tiết sản phẩm",
              dataIndex: "id",
              key: "id",
              render: (value) => {
                return (
                  <Link
                    to={`/san-pham/chi-tiet-san-pham/${value}`}
                    className="text-blue-500 hover:underline"
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
          dataSource={products}
        ></Table>
      </Space>
    </div>
  );
}

export default ProductCat;

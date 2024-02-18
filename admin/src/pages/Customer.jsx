import { useEffect, useState } from "react";
import { deleteUserApi, getCustomersApi } from "../apis/userApi";
import Loading from "../components/Home/Loading";
import { Space, Table, Typography } from "antd";
import { formatCurrency } from "../utils/function";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Customer() {
  const [customers, setCustomers] = useState();
  const [loading, setLoading] = useState(true);

  const [deleted, setDeleted] = useState(false);
  const getCustomers = async () => {
    const response = await getCustomersApi();
    if (response.status === 200) {
      setTimeout(() => {
        setCustomers(response.data.data.users);
        setLoading(false);
      }, 400);
    }
  };
  useEffect(() => {
    getCustomers();
  }, [deleted]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Xóa danh mục",
      text: "Bạn có chắc chắn muốn xóa khách hàng này?",
      showDenyButton: true,
      confirmButtonText: "Xóa",
      confirmButtonColor: "#d33",
      denyButtonColor: "#3085d6",
      denyButtonText: `Trở lại`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteUserApi(id);
        if (response.status === 200) {
          setDeleted((prev) => !prev);
          Swal.fire({
            icon: "success",
            text: "Đã xóa tài khoản khách hàng",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Có lỗi xảy ra",
          });
        }
      }
    });
  };
  if (loading) return <Loading />;
  return (
    <div className="m-4">
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Khách hàng</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: "Mã",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Họ",
              dataIndex: "lastName",
              key: "lastName",
            },

            {
              title: "Tên",
              dataIndex: "firstName",
              key: "firstName",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Giới tính",
              dataIndex: "gender",
              key: "gender",
              render: (value) => {
                if (value === "male") return "Nam";
                if (value === "female") return "Nữ";
              },
            },
            {
              title: "Ngày sinh",
              dataIndex: "dob",
              key: "dob",
              render: (value) => value && new Date(value).toLocaleDateString(),
            },
            {
              title: "Số điện thoại",
              dataIndex: "phone",
              key: "phone",
            },
            {
              title: "Số đơn hàng",
              dataIndex: "Orders",
              key: "Orders",
              render: (value) => <div>{value.length}</div>,
              sorter: (a, b) => a.Orders.length - b.Orders.length,
              sortDirections: ["ascend", "descend"],
            },
            {
              title: "Tổng tiền mua",
              dataIndex: "Orders",
              key: "Orders",
              render: (value) => (
                <div>
                  {formatCurrency(
                    value.reduce((total, item) => {
                      return total + item.totalPrice;
                    }, 0)
                  )}
                  đ
                </div>
              ),
              sorter: (a, b) =>
                a.Orders.reduce((total, item) => {
                  return total + item.totalPrice;
                }, 0) -
                b.Orders.reduce((total, item) => {
                  return total + item.totalPrice;
                }, 0),
              sortDirections: ["ascend", "descend"],
            },
            {
              title: "Chi tiết khách hàng",
              dataIndex: "id",
              key: "id",
              render: (value) => (
                <Link
                  to={`/khach-hang/chi-tiet-khach-hang/${value}`}
                  className="text-blue-500 underline "
                >
                  Xem chi tiết
                </Link>
              ),
            },
            {
              title: "Xóa khách hàng",
              dataIndex: "id",
              key: "id",
              render: (value) => (
                <div
                  className="text-red-500 hover:text-red-600 cursor-pointer"
                  onClick={() => handleDelete(value)}
                >
                  Xóa
                </div>
              ),
            },
          ]}
          pagination={{
            pageSize: 5,
          }}
          dataSource={customers}
        ></Table>
      </Space>
    </div>
  );
}

export default Customer;

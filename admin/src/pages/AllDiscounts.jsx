import { useEffect, useState } from "react";
import { deleteDiscountApi, getDiscountsApi } from "../apis/discountApi";
import Loading from "../components/Home/Loading";
import { Modal, Space, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import EditDiscount from "../components/Discount/EditDiscount";

function AllDiscounts() {
  const [discounts, setDiscounts] = useState();
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [discountEdit, setDiscountEdit] = useState();
  const getDiscounts = async () => {
    const response = await getDiscountsApi();
    if (response.status === 200) {
      setTimeout(() => {
        setDiscounts(response.data.data.discounts);
        setLoading(false);
      }, 400);
    }
  };
  useEffect(() => {
    getDiscounts();
  }, [deleted, openEdit]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Xóa danh mục",
      text: "Bạn có chắc chắn muốn xóa chương trình khuyến mại này?",
      showDenyButton: true,
      confirmButtonText: "Xóa",
      confirmButtonColor: "#d33",
      denyButtonColor: "#3085d6",
      denyButtonText: `Trở lại`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await deleteDiscountApi(id);
        if (response.status === 200) {
          setDeleted((prev) => !prev);
          Swal.fire({
            icon: "success",
            text: "Đã xóa chương trình khuyến mại",
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
      <Modal
        open={openEdit}
        footer={null}
        onCancel={() => {
          setOpenEdit(false);
        }}
        maskClosable={false}
      >
        <EditDiscount discount={discountEdit} setOpenEdit={setOpenEdit} />
      </Modal>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Chương trình khuyến mại</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: "Số thứ tự",
              dataIndex: "Số thứ tự",
              key: "Số thứ tự",
              render: (text, record, index) => index + 1,
            },
            {
              title: "Mã",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Tên",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Mô tả",
              dataIndex: "description",
              key: "description",
            },

            {
              title: "Phần trăm giảm",
              dataIndex: "discountPercent",
              key: "discountPercent",
            },
            {
              title: "Thời gian bắt đầu",
              dataIndex: "startAt",
              key: "startAt",
              render: (value) => <div>{new Date(value).toLocaleString()}</div>,
            },
            {
              title: "Thời gian kết thúc",
              dataIndex: "endAt",
              key: "endAt",
              render: (value) => <div>{new Date(value).toLocaleString()}</div>,
            },

            {
              title: "Chi tiết chương trình",
              dataIndex: "id",
              key: "id",
              render: (value) => (
                <Link
                  to={`/khuyen-mai/chi-tiet-chuong-trinh/${value}`}
                  className="text-blue-500 underline "
                >
                  Xem chi tiết
                </Link>
              ),
            },

            {
              title: "Chỉnh sửa chương trình",
              dataIndex: "id",
              key: "id",
              render: (value, record) => (
                <div
                  onClick={() => {
                    setOpenEdit(true);
                    setDiscountEdit(record);
                  }}
                  className="cursor-pointer text-blue-500 hover:text-blue-600"
                >
                  Chỉnh sửa
                </div>
              ),
            },
            {
              title: "Xóa chương trình",
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
          dataSource={discounts}
        ></Table>
      </Space>
    </div>
  );
}

export default AllDiscounts;

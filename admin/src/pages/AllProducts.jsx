import { useEffect, useState } from "react";
import { deleteProductApi, getProductsApi } from "../apis/productApi";
import Loading from "../components/Home/Loading";
import { Modal, Space, Table, Tooltip, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/function";
import Swal from "sweetalert2";
import EditProduct from "../components/Product/EditProduct";

function AllProducts() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [product, setProduct] = useState();

  const navigate = useNavigate();

  const getAllProducts = async () => {
    const response = await getProductsApi({ size: 100 });
    if (response.status === 200) {
      setTimeout(() => {
        setProducts(response.data.data.products);
        setLoading(false);
      }, 400);
    }
  };

  const checkDiscount = (discountList) => {
    if (discountList.length > 0) {
      const discount = discountList.find(
        (item) =>
          item.active &&
          new Date(item.discountProgram.endAt) > new Date() &&
          new Date(item.discountProgram.startAt) <= new Date()
      );
      if (discount) return discount;
    }
    return false;
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Xóa sản phẩm",
      text: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      showDenyButton: true,
      confirmButtonText: "Xóa",
      confirmButtonColor: "#d33",
      denyButtonColor: "#3085d6",
      denyButtonText: `Trở lại`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await deleteProductApi(id);
        if (response.status === 200) {
          setDeleted((prev) => !prev);
          Swal.fire({
            icon: "success",
            text: "Đã xóa sản phẩm",
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

  useEffect(() => {
    getAllProducts();
  }, [deleted, openEdit]);
  if (loading) return <Loading />;
  return (
    <div className="m-4">
      <Modal
        open={openEdit}
        onCancel={() => {
          setOpenEdit(false);
        }}
        maskClosable={false}
        footer={null}
        width={1000}
      >
        <EditProduct product={product} setOpenEdit={setOpenEdit} />
      </Modal>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Sản phẩm</Typography.Title>
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
              title: "Đã bán",
              dataIndex: "sold",
              key: "sold",
              sorter: (a, b) => a.sold - b.sold,
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
              title: "Danh mục",
              dataIndex: "Category",
              key: "Category",

              render: (value) => <div>{value.name}</div>,
            },
            {
              title: "Khuyến mại",
              dataIndex: "discountList",
              key: "discountList",

              render: (value) => (
                <Tooltip title="Xem chi tiết chương trình" color="blue">
                  <div
                    onClick={() => {
                      checkDiscount(value) &&
                        navigate(
                          `/khuyen-mai/chi-tiet-chuong-trinh/${
                            checkDiscount(value).discountProgram.id
                          }`
                        );
                    }}
                    className="text-blue-500 cursor-pointer hover:text-blue-600 hover:underline"
                  >
                    {checkDiscount(value)
                      ? checkDiscount(value).discountProgram.discountPercent +
                        "%"
                      : null}
                  </div>
                </Tooltip>
              ),
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
            {
              title: "Chỉnh sửa sản phẩm",
              dataIndex: "id",
              key: "id",
              render: (value, record) => (
                <div
                  onClick={() => {
                    setOpenEdit(true);
                    setProduct(record);
                  }}
                  className="cursor-pointer text-blue-500 hover:text-blue-600"
                >
                  Chỉnh sửa
                </div>
              ),
            },
            {
              title: "Xóa sản phẩm",
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
          dataSource={products}
        ></Table>
      </Space>
    </div>
  );
}

export default AllProducts;

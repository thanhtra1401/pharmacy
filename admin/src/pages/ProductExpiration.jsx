import { useEffect, useState } from "react";
import { deleteProductApi, getProductsApi } from "../apis/productApi";
import Loading from "../components/Home/Loading";
import { Modal, Select, Slider, Space, Table, Tooltip, Typography } from "antd";
import useQueryParams from "../hooks/useQueryParams";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EditProduct from "../components/Product/EditProduct";
import { formatCurrency } from "../utils/function";

function ProductExpiration() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeSelect, setTypeSelect] = useState();
  const [day, setDay] = useState(7);
  const [month, setMonth] = useState(1);
  const navigate = useNavigate();

  const [deleted, setDeleted] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [product, setProduct] = useState();

  const queryParams = useQueryParams();
  const { date } = queryParams;

  const getAllProducts = async () => {
    const response = await getProductsApi({
      size: 100,
      date: date ? date : null,
    });
    if (response.status === 200) {
      setTimeout(() => {
        setProducts(response.data.data.products);
        setLoading(false);
      }, 400);
    }
  };

  const handleSubmit = () => {
    navigate({
      pathname: "/san-pham/san-pham-sap-het-han",
      search: createSearchParams({
        date:
          (typeSelect === "1" && (day * typeSelect).toString()) ||
          (typeSelect === "30" && (month * typeSelect).toString()),
      }).toString(),
    });
  };
  useEffect(() => {
    getAllProducts();
  }, [date, deleted, openEdit]);

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
      title: "Xóa danh mục",
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

  if (loading) return <Loading />;
  return (
    <div className="m-4">
      <div>
        <div>
          <span>Chọn lọc theo ngày hoặc tháng: </span>
          <Select
            style={{ width: 120 }}
            onChange={(value) => setTypeSelect(value)}
            options={[
              { value: "1", label: "Ngày" },
              { value: "30", label: "Tháng" },
            ]}
          />
        </div>
        {typeSelect && (
          <div>
            <div className="flex gap-4">
              <span className="w-1/6">Chọn số lượng: </span>
              <div className="w-5/6">
                {typeSelect === "1" && (
                  <Slider
                    className="w-full"
                    max={30}
                    min={0}
                    included={true}
                    value={day}
                    tooltip={{ open: true, placement: "bottom", color: "blue" }}
                    onChange={(value) => {
                      setDay(value);
                    }}
                  />
                )}
                {typeSelect === "30" && (
                  <Slider
                    className="w-full"
                    max={12}
                    value={month}
                    tooltip={{ open: true, placement: "bottom" }}
                    onChange={(value) => {
                      setMonth(value);
                    }}
                  />
                )}
              </div>
            </div>

            <div className="mb-4 mt-8">
              Sản phẩm hết hạn sau:{" "}
              <span className="text-blue-500 font-medium">
                {typeSelect === "1" && day + " ngày"}{" "}
                {typeSelect === "30" && month + " tháng"}
              </span>
            </div>

            <button
              className="py-1 px-4 bg-blue-500 text-white rounded-lg"
              onClick={handleSubmit}
            >
              {" "}
              Lấy sản phẩm
            </button>

            <div className="mt-6">
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
                              ? checkDiscount(value).discountProgram
                                  .discountPercent + "%"
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductExpiration;

import { useEffect, useState } from "react";
import Loading from "../components/Home/Loading";
import { deleteCategoryApi, getCategoriesApi } from "../apis/categoryApi";
import { Modal, Space, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CategoryEdit from "../components/Category/CategoryEdit";

function AllCategory() {
  const [categories, setCategories] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [cat, setCat] = useState();

  const [loading, setLoading] = useState(true);
  const getCategories = async () => {
    const response = await getCategoriesApi();
    if (response.status === 200) {
      setCategories(response.data.categories);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, [deleted, openEdit]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Xóa danh mục",
      text: "Bạn có chắc chắn muốn xóa danh mục này?",
      showDenyButton: true,
      confirmButtonText: "Xóa",
      confirmButtonColor: "#d33",
      denyButtonColor: "#3085d6",
      denyButtonText: `Trở lại`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await deleteCategoryApi(id);
        if (response.status === 200) {
          setDeleted((prev) => !prev);
          Swal.fire({
            icon: "success",
            text: "Đã xóa danh mục",
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
        onCancel={() => setOpenEdit(false)}
        maskClosable={false}
      >
        <CategoryEdit
          category={cat}
          setCategory={setCat}
          setOpenEdit={setOpenEdit}
        />
      </Modal>
      <div>
        <Space size={20} direction="vertical">
          <Typography.Title level={4}>Danh mục</Typography.Title>
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
                title: "Chi tiết danh mục",
                dataIndex: "id",
                key: "id",
                render: (value) => (
                  <Link
                    to={`/danh-muc/chi-tiet-danh-muc/${value}`}
                    className="cursor-pointer text-blue-500 hover:text-blue-600"
                  >
                    Xem chi tiết
                  </Link>
                ),
              },
              {
                title: "Chỉnh sửa danh mục",
                dataIndex: "id",
                key: "id",
                render: (value, record) => (
                  <div
                    onClick={() => {
                      setOpenEdit(true);
                      setCat(record);
                    }}
                    className="cursor-pointer text-blue-500 hover:text-blue-600"
                  >
                    Chỉnh sửa
                  </div>
                ),
              },
              {
                title: "Xóa danh mục",
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
            dataSource={categories}
          ></Table>
        </Space>
      </div>
    </div>
  );
}

export default AllCategory;

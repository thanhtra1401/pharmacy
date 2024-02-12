import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteCategoryApi, getCategoryApi } from "../apis/categoryApi";
import Loading from "../components/Home/Loading";
import { Modal, message } from "antd";
import ProductCat from "../components/Product/ProductCat";
import { getProductsApi } from "../apis/productApi";
import CategoryEdit from "../components/Category/CategoryEdit";
import Swal from "sweetalert2";

function CategoryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [openProducts, setOpenProducts] = useState(false);
  const [productsOfParentCat, setProductsOfParentCat] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  useEffect(() => {
    const getCategory = async () => {
      const response = await getCategoryApi(id);
      if (response.status === 200) {
        setTimeout(async () => {
          setCategory(response.data.data.category);
          if (!response.data.data.category.parent) {
            const responstGetProducts = await getProductsApi({
              parentCatSlug: response.data.data.category.slug,
            });
            if (responstGetProducts.status === 200) {
              setProductsOfParentCat(responstGetProducts.data.data.products);
            }
          }
          setLoading(false);
        }, 400);
      }
    };
    getCategory();
  }, [id, openEdit]);

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
      if (result.isConfirmed) {
        const response = await deleteCategoryApi(id);
        if (response.status === 200) {
          message.success("Đã xóa danh mục");
          navigate("/danh-muc/tat-ca-danh-muc");
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
        open={openProducts}
        footer={null}
        onCancel={() => {
          setOpenProducts(false);
        }}
        width={900}
      >
        <ProductCat
          products={category.parent ? category.Products : productsOfParentCat}
          loading={loading}
        />
      </Modal>
      <Modal open={openEdit} footer={null} onCancel={() => setOpenEdit(false)}>
        <CategoryEdit
          category={category}
          setCategory={setCategory}
          setOpenEdit={setOpenEdit}
        />
      </Modal>

      <div className="font-medium text-lg">Thông tin danh mục</div>
      <div className="pb-4 ">
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Mã: </div>
          <div className="">{category.id}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Tên: </div>
          <div className="">{category.name}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Loại danh mục: </div>
          <div className="">
            {category.parentId ? "Danh mục con" : "Danh mục cha"}
          </div>
        </div>
        {category.children.length > 0 && (
          <div className="mt-4 flex items-center">
            <div className="w-1/6 font-medium">Danh mục con: </div>
            <div className="">
              {category.children.map((item) => (
                <div key={item.id}>
                  <Link
                    to={`/danh-muc/chi-tiet-danh-muc/${item.id}`}
                    className="mt-2 text-blue-500 underline hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
        {category.parent && (
          <div className="mt-4 flex items-center">
            <div className="w-1/6 font-medium">Danh mục cha: </div>
            <Link
              className="text-blue-500 underline hover:text-blue-600"
              to={`/danh-muc/chi-tiet-danh-muc/${category.parent.id}`}
            >
              {category.parent.name}
            </Link>
          </div>
        )}
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Ngày tạo: </div>
          <div className="">
            {new Date(category.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Danh sách sản phẩm: </div>
          <div
            className="text-blue-500 underline hover:text-blue-600 cursor-pointer"
            onClick={() => setOpenProducts(true)}
          >
            Xem chi tiết
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Chỉnh sửa danh mục: </div>
          <div
            className="text-blue-500 underline hover:text-blue-600 cursor-pointer"
            onClick={() => setOpenEdit(true)}
          >
            Chỉnh sửa
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Xóa danh mục: </div>
          <div
            className="text-red-500 underline hover:text-red-600 cursor-pointer"
            onClick={() => handleDelete(category.id)}
          >
            Xóa
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDetail;

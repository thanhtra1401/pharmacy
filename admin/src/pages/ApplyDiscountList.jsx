import { useEffect, useState } from "react";
import { getProductsApi } from "../apis/productApi";
import Loading from "../components/Home/Loading";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { Modal, Pagination, Tag, message } from "antd";
import useQueryParams from "../hooks/useQueryParams";
import SelectCategoryInDiscount from "../components/Category/SelectCategoryInDiscount";
import { createDiscountDetailApi, getDiscountsApi } from "../apis/discountApi";
import Swal from "sweetalert2";
function ApplyDiscountList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [paginationData, setPaginationData] = useState();
  const navigate = useNavigate();

  const queryParams = useQueryParams();
  const { page, size, slugCat } = queryParams;

  const [category, setCategory] = useState();
  const [showSelectCategory, setShowSelectCategory] = useState(false);
  const [discounts, setDiscounts] = useState();
  const [selectedDiscounts, setSelectedDiscounts] = useState();

  //Handle submit
  const handleApply = async () => {
    try {
      if (!selectedDiscounts || selectedProducts.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Bạn vui lòng chọn đủ sản phẩm và chương trình khuyến mại",
        });
      } else {
        selectedProducts.forEach(async (product) => {
          const response = await createDiscountDetailApi({
            productId: product,
            discountId: selectedDiscounts,
            active: true,
          });
          if (response.status !== 200) {
            Swal.fire({
              icon: "error",
              title: "Thất bại",
              text: "Có lỗi xảy ra",
            });
          }
        });
      }
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Áp dụng thành công chương trình khuyến mại",
      });
      setSelectedDiscounts(null);
      setSelectedProducts([]);
    } catch (error) {
      message.error(error);
    }
  };

  //Handle discounts

  useEffect(() => {
    const getDiscounts = async () => {
      const response = await getDiscountsApi({ valid: "true" });
      if (response.status === 200) {
        setDiscounts(response.data.data.discounts);
      }
    };
    getDiscounts();
  }, []);
  //Handle products

  useEffect(() => {
    const getProducts = async () => {
      const response = await getProductsApi({ page, size, slugCat });
      if (response.status === 200) {
        setTimeout(() => {
          setProducts(response.data.data.products);
          setPaginationData({
            totalItems: response.data.data.totalItems,
            currentPage: response.data.data.currentPage,
            totalPages: response.data.data.totalPages,
          });
          setLoading(false);
        });
      }
    };
    getProducts();
  }, [page, size, slugCat]);

  const handleSelectChange = (value) => {
    const isSelected = selectedProducts.includes(value);
    if (isSelected) {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((id) => id !== value)
      );
    } else {
      setSelectedProducts((prevSelected) => [...prevSelected, value]);
    }
  };
  const handleSelectAll = () => {
    const allProductIds = products.map((product) => product.id);
    setSelectedProducts(allProductIds);
  };
  const handleDeselectAll = () => {
    setSelectedProducts([]);
  };

  //return
  if (loading) return <Loading />;
  return (
    <div className="m-4">
      <div className="grid-cols-12 grid">
        <div className="col-span-8 border-r-[1px] border-gray-300">
          <div className="mb-4 font-medium text-lg">
            Chọn sản phẩm được áp dụng
          </div>
          <Modal
            open={showSelectCategory}
            onCancel={() => {
              setShowSelectCategory(false);
            }}
            footer={null}
          >
            <SelectCategoryInDiscount
              category={category}
              setCategory={setCategory}
              setShowSelectCategory={setShowSelectCategory}
            />
          </Modal>
          <div>
            <button
              onClick={handleSelectAll}
              className="px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Chọn tất cả
            </button>
            <button
              onClick={handleDeselectAll}
              className="px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 ml-4"
            >
              Bỏ chọn tất cả
            </button>
            <button
              onClick={() => setShowSelectCategory(true)}
              className="px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 ml-4"
            >
              Lọc theo danh mục
            </button>
            {category && (
              <Tag className="ml-2" color="green">
                Danh mục: {category}
              </Tag>
            )}
          </div>

          <div>
            {products.length > 0 &&
              products.map((product) => (
                <div key={product.id} className="mt-4 flex items-center">
                  <label>
                    <input
                      type="checkbox"
                      //value={product.id}
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectChange(product.id)}
                      className="mr-2"
                    />
                    <span>{product.name}</span>
                  </label>
                  <Link
                    className="ml-4 text-sm text-blue-500 underline"
                    to={`/san-pham/chi-tiet-san-pham/${product.id}`}
                  >
                    Xem chi tiết
                  </Link>
                </div>
              ))}
          </div>
          <div className="mt-4">
            <Pagination
              total={paginationData?.totalItems}
              defaultCurrent={1}
              defaultPageSize={12}
              onChange={(page, pageSize) => {
                navigate({
                  pathname: "/khuyen-mai/ap-dung",
                  search: createSearchParams({
                    page: page.toString(),
                    size: pageSize.toString(),
                  }).toString(),
                });
              }}
              showSizeChanger={false}
            />
          </div>
        </div>

        <div className="col-span-4 ml-4">
          <div className="mb-4 font-medium text-lg ">
            Chọn chương trình khuyến mại được áp dụng
          </div>
          <div>
            {discounts.length > 0 &&
              discounts.map((discount) => (
                <div key={discount.id} className="mt-4 flex items-center">
                  <label>
                    <input
                      type="radio"
                      value={discount.id}
                      checked={discount.id === selectedDiscounts}
                      onChange={() => setSelectedDiscounts(discount.id)}
                      className="mr-2"
                    />
                    <span>{discount.name}</span>
                  </label>
                  <Link
                    className="ml-4 text-sm text-blue-500 underline"
                    to={`/khuyen-mai/chi-tiet-chuong-trinh/${discount.id}`}
                  >
                    Xem chi tiết
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
        <button
          className="py-2 px-10 bg-blue-500 text-white hover:bg-blue-600 rounded-lg mt-6"
          onClick={handleApply}
        >
          {" "}
          Áp dụng
        </button>
      </div>
    </div>
  );
}

export default ApplyDiscountList;

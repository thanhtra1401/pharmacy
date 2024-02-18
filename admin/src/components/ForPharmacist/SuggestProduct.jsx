import { useEffect, useState } from "react";
import {
  Link,
  createSearchParams,
  useNavigate,
  useParams,
} from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";
import { getProductsApi } from "../../apis/productApi";
import Loading from "../Home/Loading";
import { Pagination } from "antd";

import {
  createPrescriptionDetailApi,
  updatePrescriptionApi,
} from "../../apis/prescriptionApi";
import Swal from "sweetalert2";

function SuggestProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [paginationData, setPaginationData] = useState();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const queryParams = useQueryParams();
  const { page, size, name } = queryParams;
  const { prescriptionId } = useParams();
  const [productQuantities, setProductQuantities] = useState({});
  const handleQuantityChange = (productId, quantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };
  const [note, setNote] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const response = await getProductsApi({ ...queryParams });
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
  }, [page, size, name]);

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

  const handleSubmit = async () => {
    if (selectedProducts.length > 0) {
      if (note) {
        selectedProducts.forEach(async (product) => {
          const responseCreateDetail = await createPrescriptionDetailApi({
            prescriptionId,
            productId: product,
            amount: productQuantities[product],
          });
          if (responseCreateDetail.status === 200) {
            const responseUpdate = await updatePrescriptionApi(prescriptionId, {
              note: note,
            });
            if (responseUpdate.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Đã gợi ý sản phẩm cho khách hàng",
              });
              setNote("");
              setSelectedProducts([]);
            } else {
              Swal.fire({
                icon: "error",
                title: "Thất bại",
                text: "Có lỗi xảy ra",
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Thất bại",
              text: "Có lỗi xảy ra",
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Vui lòng nhập hướng dẫn cho các sản phẩm gợi ý",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        text: "Bạn vui lòng chọn sản phẩm muốn gợi ý",
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="m-4">
      <div>
        <div className="flex items-center">
          <div className="mr-4 font-medium">Gợi ý sản phẩm</div>
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();

              navigate({
                search: createSearchParams({
                  name: searchValue,
                }).toString(),
              });
            }}
          >
            <div className="relative flex items-center flex-1">
              <input
                className="block w-full rounded-full border-none border-gray-300 bg-[#D9DFE5] p-3 pl-10 font-normal text-sm text-black outline-none "
                placeholder="Tìm theo tên sản phẩm"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className=" px-[10px] py-1 bg-white border-solid  rounded-full absolute right-[6px] ">
                <i className="fa-solid fa-magnifying-glass text-primary h-4 text-sm"></i>
              </button>
            </div>
          </form>
        </div>

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
              {selectedProducts.includes(product.id) && (
                <input
                  type="number"
                  placeholder="Nhập số lượng"
                  value={productQuantities[product.id] || ""}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                  className="border-[0.5px] rounded-lg px-4 py-1 outline-none focus:border-blue-400 ml-4 "
                />
              )}
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
              search: createSearchParams({
                ...queryParams,
                page: page.toString(),
                size: pageSize.toString(),
              }).toString(),
            });
          }}
          showSizeChanger={false}
        />
      </div>

      <div className="mt-4">
        <div className="mt-1 ">
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Thêm hướng dẫn cho đơn thuốc (liều lượng, cách dùng,...)"
            className="border-[0.5px] border-gray-400 rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
          />
        </div>
        <div className="mt-2 text-red-600 text-xs "></div>
      </div>
      <button
        className="py-2 px-10 rounded-lg text-white mt-4 bg-blue-500 hover:bg-blue-600 "
        onClick={handleSubmit}
      >
        Hoàn tất
      </button>
    </div>
  );
}

export default SuggestProduct;

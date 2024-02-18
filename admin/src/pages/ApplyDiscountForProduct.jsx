import { useEffect, useState } from "react";
import { getProductApi } from "../apis/productApi";
import Loading from "../components/Home/Loading";
import { Link, useParams } from "react-router-dom";
import { message } from "antd";
import { createDiscountDetailApi, getDiscountsApi } from "../apis/discountApi";
import Swal from "sweetalert2";
function ApplyDiscountForProduct() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

  const [discounts, setDiscounts] = useState();
  const [selectedDiscounts, setSelectedDiscounts] = useState();

  const { productId } = useParams();

  //Handle submit
  const handleApply = async () => {
    try {
      if (!selectedDiscounts) {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Bạn vui lòng chọn chương trình khuyến mại",
        });
      } else {
        const response = await createDiscountDetailApi({
          productId,
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
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Áp dụng thành công chương trình khuyến mại",
        });
        setSelectedDiscounts(null);
      }
    } catch (error) {
      message.error(error);
    }
  };

  //Handle discounts

  useEffect(() => {
    const getDiscounts = async () => {
      const response = await getDiscountsApi({ valid: "true" });
      if (response.status === 200) {
        setTimeout(() => {
          setDiscounts(response.data.data.discounts);
          setLoading(false);
        }, 400);
      }
    };
    getDiscounts();
  }, []);
  //Handle products

  useEffect(() => {
    const getProduct = async () => {
      const response = await getProductApi(productId);
      if (response.status === 200) {
        setProduct(response.data.data.product);
      }
    };
    getProduct();
  }, [productId]);

  //return
  if (loading || !product) return <Loading />;
  return (
    <div className="m-4">
      <div className="">
        <div className="font-medium text-lg mb-4">
          Áp dụng chương trình khuyến mại cho sản phẩm{" "}
          <span className="text-red-500">{product.name}</span>
        </div>
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

export default ApplyDiscountForProduct;

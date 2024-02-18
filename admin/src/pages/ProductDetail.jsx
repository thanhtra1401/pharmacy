import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductApi } from "../apis/productApi";
import Loading from "../components/Home/Loading";
import { formatCurrency } from "../utils/function";
import { Tooltip } from "antd";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      const response = await getProductApi(id);
      if (response.status === 200) {
        setTimeout(() => {
          setProduct(response.data.data.product);
          setLoading(false);
        }, 400);
      }
    };
    getProduct();
  }, [id]);
  if (loading) return <Loading />;

  return (
    <div className="m-4">
      <div className="font-medium text-lg">Thông tin sản phẩm</div>

      <div className="pb-4 ">
        <div className="mt-6 flex items-center">
          <div className="w-1/6 font-medium">Hình ảnh: </div>
          <img src={product.image || ""} className="w-28 h-28"></img>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Tên: </div>
          <div className="">{product.name}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Giá: </div>
          <div className="">{formatCurrency(product.price)}đ</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Mô tả ngắn: </div>
          <div className="w-5/6">{product.shortDes}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Đã bán: </div>
          <div className="w-5/6">{product.sold}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Số sản phẩm còn lại: </div>
          <div className="w-5/6">{product.quantity}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Đơn vị: </div>
          <div className="w-5/6">{product.unit}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Nhà sản xuất: </div>
          <div className="w-5/6">{product.origin}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Xuất xứ: </div>
          <div className="w-5/6">{product.country}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Ngày sản xuất: </div>
          <div className="w-5/6">
            {new Date(product.manufactureDate).toLocaleDateString()}
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Hạn sử dụng: </div>
          <div className="w-5/6">
            {new Date(product.expiriedDate).toLocaleDateString()}
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Mô tả: </div>
          <div className="w-5/6">{product.description}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Thành phần: </div>
          <div className="w-5/6">{product.ingredient}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Công dụng: </div>
          <div className="w-5/6">{product.intendedUse}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Cách dùng: </div>
          <div className="w-5/6">{product.howToUse}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Tác dụng phụ: </div>
          <div className="w-5/6">{product.sideEffects}</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Danh mục: </div>
          <div className="w-5/6 text-blue-500 underline hover:text-blue-600 cursor-pointer">
            <Tooltip title="Xem chi tiết danh mục" color="blue">
              <span
                onClick={() => {
                  navigate(
                    `/danh-muc/chi-tiet-danh-muc/${product.Category.id}`
                  );
                }}
              >
                {product.Category.name}
              </span>
            </Tooltip>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">Chương trình khuyến mại: </div>
          <div className="">
            {product.discountList.length > 0 &&
              product.discountList.map((item) => (
                <div className="mt-2 flex" key={item.id}>
                  <Tooltip
                    title="Xem chương trình khuyến mại"
                    color="blue"
                    className="text-blue-500 text-base underline hover:text-blue-600 cursor-pointer"
                  >
                    <span
                      onClick={() =>
                        navigate(
                          `/khuyen-mai/chi-tiet-chuong-trinh/${item.discountProgram.id}`
                        )
                      }
                    >
                      {item.discountProgram.name}
                    </span>
                  </Tooltip>
                  {item.active &&
                    new Date(item.discountProgram.startAt) <= new Date() &&
                    new Date(item.discountProgram.endAt) > new Date() && (
                      <div className="py-1 px-2 border-green-600 border-[1px] w-min whitespace-nowrap text-xs ml-4 text-green-500 ">
                        Đang áp dụng
                      </div>
                    )}
                </div>
              ))}
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-1/6 font-medium">
            Áp dụng chương trình khuyến mại:{" "}
          </div>
          <div className="w-5/6 text-blue-500 underline hover:text-blue-600 cursor-pointer">
            <Link to={`/khuyen-mai/ap-dung/san-pham/${product.id}`}>
              {" "}
              Áp dụng chương trình khuyến mại mới
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="col-span-7 ml-4">
          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Mã khách hàng: </div>
            <div className="">{customer.id}</div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Ngày tạo tài khoản: </div>
            <div className="">
              {new Date(customer.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Tổng số đơn hàng: </div>
            <div className="w-1/3">{customer.Orders.length}</div>
            <div
              className=" text-blue-500 hover:text-blue-600 hover:underline cursor-pointer ml-4"
              onClick={() => setShowOrders(true)}
            >
              Xem chi tiết
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Tổng giá trị đơn hàng: </div>
            <div className="">
              {customer.Orders.length > 0
                ? formatCurrency(
                    customer.Orders.reduce((total, item) => {
                      return total + item.totalPrice;
                    }, 0)
                  ) + " đ"
                : 0}
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <div className="w-1/3 font-medium">Lần đặt hàng gần nhất: </div>
            <div className="w-1/3">
              {customer.Orders.length > 0
                ? new Date(
                    customer.Orders[findOrderRecent(customer.Orders)].createdAt
                  ).toLocaleString()
                : "Chưa có đơn hàng"}
            </div>
            <Link
              to={`/don-hang/chi-tiet-don-hang/${
                customer.Orders[findOrderRecent(customer.Orders)].id
              }`}
            >
              <div className=" text-blue-500 hover:text-blue-600 hover:underline cursor-pointer ml-4">
                Xem chi tiết
              </div>
            </Link>
          </div>
        </div> */}
    </div>
  );
}

export default ProductDetail;

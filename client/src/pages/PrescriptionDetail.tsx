import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Prescription,
  PrescriptionDetail as PrescriptionDetailType,
} from "../interfaces/prescriptionInterface";
import { useEffect, useState } from "react";
import { getPrescriptionApi } from "../apis/prescriptionApi";
import Loading from "../components/Common/Loading";
import { Image } from "antd";
import { formatCurrency } from "../utils/function";
import { addToCartApi, updateCartApi } from "../apis/cartApi";
import Swal from "sweetalert2";
import { productStore } from "../store/store";

function PrescriptionDetail() {
  const cartId = productStore((state) => state.cart_id);
  const navigate = useNavigate();
  const { id } = useParams();
  const [prescription, setPrescription] = useState<Prescription>();

  const [loading, setLoading] = useState(true);
  const getPrescription = async () => {
    const response = await getPrescriptionApi(id);
    if (response.status === 200) {
      setPrescription(response.data.data.prescription);
      setLoading(false);
    }
  };
  const checkDiscount = (item: PrescriptionDetailType) => {
    if (item.Product.discountList.length > 0) {
      const activeDiscount = item.Product.discountList.find(
        (discount) =>
          discount.active &&
          new Date(discount.discountProgram.endAt) > new Date() &&
          new Date(discount.discountProgram.startAt) <= new Date()
      );

      return activeDiscount ? true : false;
    }
    return false;
  };
  useEffect(() => {
    getPrescription();
  }, []);

  const addToCart = async () => {
    Swal.fire({
      icon: "question",
      text: "Bạn có muốn thêm những sản phẩm đã gợi ý vào giỏ hàng?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Xác nhận",
      denyButtonText: `Trở lại`,
    }).then((result) => {
      if (result.isConfirmed) {
        prescription?.PrescriptionDetails.forEach(async (item) => {
          const response = await addToCartApi({
            cartId: cartId,
            productId: item.productId,
            amount: item.amount,
          });

          if (response.status !== 200) {
            Swal.fire({
              text: "Có lỗi xảy ra. Vui lòng thử lại",
              icon: "error",
            });
          } else {
            const responseUpdateCart = await updateCartApi(cartId);
            if (responseUpdateCart.status !== 200) {
              Swal.fire({
                text: "Có lỗi xảy ra. Vui lòng thử lại",
                icon: "error",
              });
            }
          }
        });

        Swal.fire({
          title: "Thành công",
          icon: "success",
          text: "Đã thêm vào giỏ hàng",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Đi đến giỏ hàng",
          denyButtonText: `Về trang đơn thuốc`,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/gio-hang");
          }
        });
      }
    });
  };
  if (loading) return <Loading />;
  return (
    <div className="container my-6">
      <div className="flex justify-center">
        <Image src={prescription?.image} width={300} />
      </div>
      <div className="mt-4 flex ">
        <div className="font-medium w-2/12">Mã đơn thuốc: </div>
        <div className="w-10/12">{prescription?.id}</div>
      </div>
      <div className="mt-4 flex ">
        <div className="font-medium w-2/12">Trạng thái: </div>
        <div className="w-10/12">
          {prescription?.status === 0 && "Đang chờ xử lý"}{" "}
          {prescription?.status === 1 && "Đã tư vấn sản phẩm"}
        </div>
      </div>
      {prescription?.status === 1 && (
        <div className="mt-4">
          <div className="font-medium">Danh sách sản phẩm</div>
          <div className=" bg-white px-4 rounded-xl  ">
            {prescription?.PrescriptionDetails.length !== 0 &&
              prescription.PrescriptionDetails.map((item) => (
                <div
                  key={item.id}
                  className=" flex items-center border-b-[1px] border-gray-300 py-4 "
                >
                  <Link
                    to={`/san-pham/${item.Product.id}`}
                    className="flex items-center w-8/12 "
                  >
                    <img
                      src={
                        item.Product.image
                        // item.Product?.images.length !== 0
                        //   ? item.Product?.images[0].url
                        //   : ""
                      }
                      alt="img"
                      className="w-16 h-16 rounded-lg border-[1px] p-2 mx-4"
                    />
                    <span className=" line-clamp-3">{item.Product.name}</span>
                  </Link>
                  <div className="w-3/12">
                    {formatCurrency(
                      checkDiscount(item)
                        ? item.Product.priceWithDiscount
                        : item.Product.price
                    )}
                    đ
                    {checkDiscount(item) && (
                      <div className="text-gray-600 text-sm font-normal line-through">
                        {formatCurrency(item.Product.price)}đ
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {" "}
                    x<span>{item.amount}</span> <span>{item.Product.unit}</span>
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-4 flex ">
            <div className="font-medium w-2/12">Ghi chú: </div>
            <div className="w-10/12">{prescription?.note}</div>
          </div>
          <div>
            <button
              className="rounded-lg py-2 px-10 bg-blue-500 hover:bg-blue-600 text-white mt-4"
              onClick={addToCart}
            >
              Mua thuốc
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrescriptionDetail;

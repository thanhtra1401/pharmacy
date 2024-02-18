import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPrescriptionApi } from "../../apis/prescriptionApi";
import Loading from "../../components/Home/Loading";
import { Image } from "antd";
import { formatCurrency } from "../../utils/function";

function Prescription() {
  const { id } = useParams();
  const [prescription, setPrescription] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPrescription = async () => {
      const response = await getPrescriptionApi(id);
      if (response.status === 200) {
        setTimeout(() => {
          setPrescription(response.data.data.prescription);
          setLoading(false);
        }, 400);
      }
    };
    getPrescription();
  }, [id]);
  const checkDiscount = (item) => {
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
  if (loading) return <Loading />;
  return (
    <div className="my-6">
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
          {prescription?.status === 0 && "Đang chờ tư vấn sản phẩm"}{" "}
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
                    to={`/san-pham/chi-tiet-san-pham/${item.Product.id}`}
                    className="flex items-center w-9/12 "
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
                  <div className="w-2/12">
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
        </div>
      )}
      {prescription?.status === 0 && (
        <div>
          <button
            onClick={() => navigate(`/don-thuoc/goi-y/${id}`)}
            className="py-2 px-10 rounded-lg text-white mt-4 bg-blue-500 hover:bg-blue-600 "
          >
            Gợi ý sản phẩm
          </button>
        </div>
      )}
    </div>
  );
}

export default Prescription;

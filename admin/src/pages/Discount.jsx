import { useNavigate } from "react-router-dom";

function Discount() {
  const navigate = useNavigate();

  return (
    <div className="m-4">
      <div
        className="py-2 px-4 rounded-lg border w-96 hover:text-blue-500 hover:border-blue-500 cursor-pointer"
        onClick={() => navigate("/khuyen-mai/them-moi-chuong-trinh-khuyen-mai")}
      >
        Thêm mới chương trình khuyến mại
      </div>
      <div
        className="py-2 px-4 rounded-lg border w-96 mt-6 hover:text-blue-500 hover:border-blue-500 cursor-pointer"
        onClick={() => {
          navigate("/khuyen-mai/tat-ca-chuong-trinh-khuyen-mai");
        }}
      >
        Danh sách chương trình khuyến mại
      </div>
      <div
        className="py-2 px-4 rounded-lg border w-96 mt-6 hover:text-blue-500 hover:border-blue-500 cursor-pointer"
        onClick={() => {
          navigate("/khuyen-mai/ap-dung");
        }}
      >
        Áp dụng chương trình khuyến mại
      </div>
    </div>
  );
}

export default Discount;

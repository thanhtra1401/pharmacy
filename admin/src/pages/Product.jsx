import { useNavigate } from "react-router-dom";

function Product() {
  const navigate = useNavigate();

  return (
    <div className="m-4">
      <div
        className="py-2 px-4 rounded-lg border w-96 hover:text-blue-500 hover:border-blue-500 cursor-pointer"
        onClick={() => navigate("/san-pham/them-moi-san-pham")}
      >
        Thêm mới sản phẩm
      </div>
      <div
        className="py-2 px-4 rounded-lg border w-96 mt-6 hover:text-blue-500 hover:border-blue-500 cursor-pointer"
        onClick={() => {
          navigate("/san-pham/tat-ca-san-pham");
        }}
      >
        Danh sách sản phẩm
      </div>
    </div>
  );
}

export default Product;

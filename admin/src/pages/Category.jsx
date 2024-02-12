import { useNavigate } from "react-router-dom";

function Category() {
  const navigate = useNavigate();
  return (
    <div className="m-4">
      <div
        className="py-2 px-4 rounded-lg border w-96 hover:text-blue-500 hover:border-blue-500 cursor-pointer"
        onClick={() => navigate("/danh-muc/them-moi-danh-muc-cha")}
      >
        Thêm mới danh mục cha
      </div>
      <div
        className=" mt-6 py-2 px-4 rounded-lg border w-96 hover:text-blue-500 hover:border-blue-500 cursor-pointer"
        onClick={() => navigate("/danh-muc/them-moi-danh-muc-con")}
      >
        Thêm mới danh mục con
      </div>
      <div
        className="py-2 px-4 rounded-lg border w-96 mt-6 hover:text-blue-500 hover:border-blue-500 cursor-pointer"
        onClick={() => {
          navigate("/danh-muc/tat-ca-danh-muc");
        }}
      >
        Danh sách danh mục
      </div>
    </div>
  );
}

export default Category;

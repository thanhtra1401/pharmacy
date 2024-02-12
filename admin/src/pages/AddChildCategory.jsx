import { yupResolver } from "@hookform/resolvers/yup";
import { addCategorySchema } from "../utils/yupSchema";
import { useForm } from "react-hook-form";
import { createCategoryApi, getCategoriesApi } from "../apis/categoryApi";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Loading from "../components/Home/Loading";
import { Select } from "antd";
function AddChildCategory() {
  const [parentId, setParentId] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getParentCats = async () => {
    const response = await getCategoriesApi();
    if (response.status === 200) {
      setTimeout(() => {
        setCategories(response.data.categories);
        setLoading(false);
      }, 400);
    }
  };
  useEffect(() => {
    getParentCats();
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCategorySchema),
  });
  const onSubmit = async (data) => {
    const newData = { ...data, parentId };

    const response = await createCategoryApi(newData);
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Đã thêm mới danh mục",
      });
      reset();
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="m-4">
      <div className="text-lg font-medium">Thêm mới danh mục cha</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label className="text-sm" htmlFor="name ">
              Tên danh mục:{" "}
            </label>
            <div className="mt-1 ">
              <input
                {...register("name")}
                placeholder="Tên danh mục"
                className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
              />
              <div className="mt-2 text-red-600 text-xs ">
                {errors?.name?.message}
              </div>
            </div>
          </div>
          <div>
            <Select
              className="w-52"
              placeholder="Chọn danh mục cha"
              onChange={(value) => setParentId(value)}
              options={categories.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </div>

          <button
            type="submit"
            className="py-3 px-20 bg-blue-500 text-white mt-4 rounded-lg hover:bg-blue-600"
          >
            Tạo mới danh mục
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddChildCategory;

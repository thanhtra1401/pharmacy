import { yupResolver } from "@hookform/resolvers/yup";
import { addCategorySchema } from "../utils/yupSchema";
import { useForm } from "react-hook-form";
import { createCategoryApi } from "../apis/categoryApi";
import Swal from "sweetalert2";

function AddCategory() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCategorySchema),
  });
  const onSubmit = async (data) => {
    const response = await createCategoryApi(data);
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Đã thêm mới danh mục",
      });
      reset();
    }
  };
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

export default AddCategory;

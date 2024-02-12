import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { addCategorySchema } from "../../utils/yupSchema";
import Swal from "sweetalert2";
import { updateCategoryApi } from "../../apis/categoryApi";

CategoryEdit.propTypes = {
  category: PropTypes.object,
  setCategory: PropTypes.func,
  setOpenEdit: PropTypes.func,
};
function CategoryEdit({ category, setCategory, setOpenEdit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCategorySchema),
  });

  const onSubmit = async (data) => {
    const response = await updateCategoryApi(category.id, data);
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Đã cập nhật danh mục",
      });
      setOpenEdit(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <label className="text-sm" htmlFor="name ">
            Tên danh mục:{" "}
          </label>
          <div className="mt-1 ">
            <input
              {...register("name")}
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
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
          Cập nhật danh mục
        </button>
      </form>
    </div>
  );
}

export default CategoryEdit;

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addDiscountSchema } from "../../utils/yupSchema";
import { updateDiscountApi } from "../../apis/discountApi";
import Swal from "sweetalert2";
import { message } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
EditDiscount.propTypes = {
  discount: PropTypes.object,
  setOpenEdit: PropTypes.func,
};
function EditDiscount({ discount, setOpenEdit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addDiscountSchema),
    defaultValues: discount,
  });
  useEffect(() => {
    reset(discount);
    setStartAt(null);
    setEndAt(null);
  }, [discount, reset]);
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      startAt: startAt || discount.startAt,
      endAt: endAt || discount.endAt,
    };
    try {
      const response = await updateDiscountApi(discount.id, newData);
      if (response.status === 200) {
        Swal.fire({
          title: "Thành công",
          text: "Cập nhật thành công chương trình khuyến mại",
          icon: "success",
        });
        setOpenEdit(false);
      }
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <div className="m-4">
      <div className="text-lg font-medium">
        Cập nhật chương trình khuyến mại
      </div>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <label className="text-sm" htmlFor="name ">
            Tên chương trình khuyến mại:{" "}
          </label>
          <div className="mt-1 ">
            <input
              {...register("name")}
              placeholder="Nhập tên chương trình khuyến mại"
              className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
            />
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.name?.message}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm" htmlFor="description ">
            Mô tả:{" "}
          </label>
          <div className="mt-1 ">
            <textarea
              rows={3}
              {...register("description")}
              placeholder="Mô tả chương trình khuyến mại"
              className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
            />
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.description?.message}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm" htmlFor="discountPercent ">
            Phần trăm giảm giá:{" "}
          </label>
          <div className="mt-1 ">
            <input
              type="number"
              {...register("discountPercent")}
              placeholder="Nhập phần trăm giảm giá"
              className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
            />
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.discountPercent?.message}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm" htmlFor="startAt ">
            Thời gian bắt đầu:{" "}
          </label>
          {!startAt && (
            <div className="mt-1">
              {new Date(discount.startAt).toLocaleString()}
            </div>
          )}
          <div className="mt-1 ">
            <input
              type="datetime-local"
              value={startAt}
              onChange={(e) => {
                setStartAt(e.target.value);
              }}
              className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
            />
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.startAt?.message}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm" htmlFor="endAt ">
            Thời gian kết thúc:{" "}
          </label>
          {!endAt && (
            <div className="mt-2">
              {new Date(discount.startAt).toLocaleString()}
            </div>
          )}
          <div className="mt-1 ">
            <input
              type="datetime-local"
              value={endAt}
              onChange={(e) => {
                setEndAt(e.target.value);
              }}
              className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
            />
            <div className="mt-1 text-red-600 text-xs ">
              {errors?.endAt?.message}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="py-3 px-20 bg-blue-500 text-white mt-4 rounded-lg hover:bg-blue-600"
        >
          Cập nhật chương trình
        </button>
      </form>
    </div>
  );
}

export default EditDiscount;

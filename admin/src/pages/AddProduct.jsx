import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";

import { addProductSchema } from "../utils/yupSchema";
import SelectCategory from "../components/Category/SelectCategory";
import { createDiscountDetailApi, getDiscountsApi } from "../apis/discountApi";
import Loading from "../components/Home/Loading";
import { createProductApi, uploadImageProductApi } from "../apis/productApi";
import Swal from "sweetalert2";
import { Button, Image, Upload, message } from "antd";
function AddProduct() {
  const [category, setCategory] = useState();
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState();
  const [file, setFile] = useState(null);

  useEffect(() => {
    const getDiscounts = async () => {
      const response = await getDiscountsApi();
      if (response.status === 200) {
        setTimeout(() => {
          setDiscounts(response.data.data.discounts);
          setLoading(false);
        }, 400);
      }
    };
    getDiscounts();
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductSchema),
  });

  const onSubmit = async (data) => {
    try {
      const dataSubmit = { ...data, categoryId: category };

      const response = await createProductApi(dataSubmit);

      if (response.status === 200) {
        const formData = new FormData();
        formData.append("main-image-product", file);
        const responseUploadImage = await uploadImageProductApi(
          response.data.data.product.id,
          formData
        );
        if (!responseUploadImage || responseUploadImage.status !== 200) {
          message.error("Có lỗi khi thêm ảnh");
          Swal.fire({
            icon: "error",
            title: "Có lỗi khi thêm ảnh",
          });
        }
        if (discount && discount !== 0) {
          const responseCreateDiscount = await createDiscountDetailApi({
            productId: response.data.data.product.id,
            discountId: discount,
            active: true,
          });
          if (responseCreateDiscount.status !== 200) {
            Swal.fire({
              icon: "error",
              title: "Có lỗi khi áp dụng khuyến mại",
            });
          }
        }
        Swal.fire({
          icon: "success",
          title: "Tạo thành công sản phẩm",
        });
        setFile(null);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const beforeUpload = (file) => {
    setFile(file);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn cần tải lên ảnh JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Ảnh phải có dung lượng nhỏ hơn 2MB!");
    }
    return false;
  };
  // const uploadImage = async ({ file, onSuccess }) => {
  //   try {
  //   } catch (error) {}
  // };

  if (loading) return <Loading />;
  return (
    <div className="m-4">
      <div className="text-lg font-medium">Thêm mới sản phẩm</div>
      <div className="mt-4 mb-1">
        <label className="text-sm" htmlFor="image ">
          Hình ảnh sản phẩm:{" "}
        </label>
      </div>
      <div className="w-1/2">
        <Upload
          onChange={onChange}
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>
      {file && (
        <Image
          src={URL.createObjectURL(file)}
          alt="Product Preview"
          style={{ marginTop: 10 }}
          width={100}
        />
      )}

      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <label className="text-sm" htmlFor="name ">
            Tên sản phẩm:{" "}
          </label>
          <div className="mt-1 ">
            <input
              {...register("name")}
              placeholder="Tên sản phẩm"
              className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
            />
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.name?.message}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm" htmlFor="shortDes">
            Mô tả ngắn:{" "}
          </label>
          <div className="mt-1 ">
            <input
              {...register("shortDes")}
              placeholder="Mô tả ngắn về sản phẩm"
              className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
            />
          </div>
          <div className="mt-2 text-red-600 text-xs ">
            {errors?.shortDes?.message}
          </div>
        </div>
        <div className="flex mt-4 gap-4">
          <div className=" w-1/2">
            <label className="text-sm" htmlFor="price">
              Giá:{" "}
            </label>
            <div className="mt-1 ">
              <input
                type="number"
                {...register("price")}
                placeholder="Giá sản phẩm (VND)"
                className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
              />
            </div>
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.price?.message}
            </div>
          </div>
          <div className="w-1/2">
            <label className="text-sm" htmlFor="unit">
              Đơn vị:{" "}
            </label>
            <div className="mt-1 ">
              <input
                {...register("unit")}
                placeholder="Đơn vị của sản phẩm"
                className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
              />
            </div>
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.unit?.message}
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-1/2">
            <label className="text-sm" htmlFor="quantity">
              Số lượng:{" "}
            </label>
            <div className="mt-1 ">
              <input
                type="number"
                {...register("quantity")}
                placeholder="Số lượng sản phẩm"
                className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
              />
            </div>
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.quantity?.message}
            </div>
          </div>
          <div className=" w-1/2">
            <label className="text-sm" htmlFor="sold">
              Đã bán:{" "}
            </label>
            <div className="mt-1 ">
              <input
                type="number"
                {...register("sold")}
                placeholder="Lượng sản phẩm đã bán"
                className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
              />
            </div>
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.sold?.message}
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-1/2">
            <label className="text-sm" htmlFor="origin">
              Nhà sản xuất:{" "}
            </label>
            <div className="mt-1 ">
              <input
                {...register("origin")}
                placeholder="Nhà sản xuất của sản phẩm"
                className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
              />
            </div>
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.origin?.message}
            </div>
          </div>
          <div className="w-1/2">
            <label className="text-sm" htmlFor="country">
              Xuất xứ:{" "}
            </label>
            <div className="mt-1 ">
              <input
                {...register("country")}
                placeholder="Xuất xứ của sản phẩm"
                className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
              />
            </div>
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.country?.message}
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-1/2">
            <label className="text-sm" htmlFor="manufactureDate">
              Ngày sản xuất:{" "}
            </label>
            <div className="mt-1 ">
              <input
                {...register("manufactureDate")}
                type="date"
                className="cursor-pointer border-[0.5px] rounded-lg px-4 py-2 outline-none focus:border-blue-400"
              />
            </div>
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.manufactureDate?.message}
            </div>
          </div>

          <div className="w-1/2">
            <label className="text-sm" htmlFor="expiriedDate">
              Hạn sử dụng:{" "}
            </label>
            <div className="mt-1 ">
              <input
                {...register("expiriedDate")}
                type="date"
                className="cursor-pointer border-[0.5px] rounded-lg px-4 py-2 outline-none focus:border-blue-400"
              />
            </div>
            <div className="mt-2 text-red-600 text-xs ">
              {errors?.expiriedDate?.message}
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-4 items-center ">
          <div className="w-1/2">
            <label className="text-sm mb-2" htmlFor="category">
              Danh mục:{" "}
            </label>
            <SelectCategory category={category} setCategory={setCategory} />
          </div>
          <div className="w-1/2">
            <label className="text-sm mb-2" htmlFor="discount">
              Chương trình quảng cáo:{" "}
            </label>
            <div>
              <select
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                className="outline-none border border-gray-300 py-1 px-2 w-1/2 rounded-lg"
              >
                <option value={0}>Không áp dụng</option>
                {discounts.length > 0 &&
                  discounts.map((item) => (
                    <option key={item.id} value={item.id} className="">
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm" htmlFor="ingredient">
            Thành phần:{" "}
          </label>
          <div className="mt-1 ">
            <textarea
              {...register("ingredient")}
              rows={3}
              placeholder="Thành phần của sản phẩm"
              className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
            />
          </div>
          <div className="mt-2 text-red-600 text-xs ">
            {errors?.ingredient?.message}
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm" htmlFor="intendedUse">
            Công dụng:{" "}
          </label>
          <div className="mt-1 ">
            <textarea
              {...register("intendedUse")}
              rows={3}
              placeholder="Công dụng của sản phẩm"
              className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
            />
          </div>
          <div className="mt-2 text-red-600 text-xs ">
            {errors?.indendedUse?.message}
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm" htmlFor="howToUse">
            Cách dùng:{" "}
          </label>
          <div className="mt-1 ">
            <textarea
              {...register("howToUse")}
              rows={3}
              placeholder="Cách dùng của sản phẩm"
              className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
            />
          </div>
          <div className="mt-2 text-red-600 text-xs ">
            {errors?.howToUse?.message}
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm" htmlFor="sideEffects">
            Tác dụng phụ:{" "}
          </label>
          <div className="mt-1 ">
            <textarea
              {...register("sideEffects")}
              rows={3}
              placeholder="Tác dụng phụ của sản phẩm"
              className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
            />
          </div>
          <div className="mt-2 text-red-600 text-xs ">
            {errors?.sideEffects?.message}
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm" htmlFor="description">
            Mô tả sản phẩm:{" "}
          </label>
          <div className="mt-1 ">
            <textarea
              {...register("description")}
              rows={6}
              placeholder="Mô tả sản phẩm"
              className="border-[0.5px] rounded-lg px-4 py-2 w-full outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="py-3 px-20 bg-blue-500 text-white mt-4 rounded-lg hover:bg-blue-600"
        >
          Tạo mới
        </button>
      </form>
    </div>
  );
}

export default AddProduct;

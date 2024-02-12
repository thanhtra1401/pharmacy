import * as yup from "yup";
export const registerSchema = yup
  .object({
    email: yup
      .string()
      .required("Bạn chưa nhập email")
      .max(255, "Độ dài email không được quá 255 ký tự")
      .matches(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        "Email không đúng"
      ),
    firstName: yup.string().required("Bạn chưa nhập họ tên"),
    lastName: yup.string().required("Bạn chưa nhập họ tên"),
    password: yup
      .string()
      .required("Bạn chưa nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự"),
    confirmPassword: yup
      .string()
      .required("Bạn chưa nhập lại mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  })
  .required();
export const loginSchema = registerSchema.omit([
  "confirmPassword",
  "firstName",
  "lastName",
]);

export const addProductSchema = yup.object({
  name: yup.string().required("Bạn chưa nhập tên sản phẩm"),
  shortDes: yup.string().required("Bạn chưa nhập mô tả ngắn của sản phẩm"),
  price: yup
    .number()
    .typeError("Giá sản phẩm phải là một số")
    .required("Bạn chưa nhập giá sản phẩm"),
  unit: yup.string().required("Bạn chưa nhập đơn vị của sản phẩm"),
  quantity: yup
    .number()
    .typeError("Số lượng sản phẩm phải là một số")
    .required("Bạn chưa nhập số lượng sản phẩm"),
  sold: yup
    .number()
    .typeError("Số lượng đã bán phải là một số")
    .required("Bạn chưa nhập số lượng sản phẩm đã bán"),
  origin: yup.string().required("Bạn chưa nhập nhà sản xuất của sản phẩm"),
  country: yup.string().required("Bạn chưa nhập xuất xứ của sản phẩm"),
  manufactureDate: yup
    .date()
    .typeError("Ngày sản xuất chưa hợp lệ")

    .required("Bạn chưa nhập ngày sản xuất của sản phẩm"),
  expiriedDate: yup
    .date()
    .typeError("Hạn sử dụng chưa hợp lệ")
    .min(yup.ref("manufactureDate"), "Hạn sử dụng phải sau ngày sản xuất")
    .required("Bạn chưa nhập hạn sử dụng của sản phẩm"),
});
export const editProductSchema = yup.object({
  name: yup.string().required("Bạn chưa nhập tên sản phẩm"),
  shortDes: yup.string().required("Bạn chưa nhập mô tả ngắn của sản phẩm"),
  price: yup
    .number()
    .typeError("Giá sản phẩm phải là một số")
    .required("Bạn chưa nhập giá sản phẩm"),
  unit: yup.string().required("Bạn chưa nhập đơn vị của sản phẩm"),
  quantity: yup
    .number()
    .typeError("Số lượng sản phẩm phải là một số")
    .required("Bạn chưa nhập số lượng sản phẩm"),
  sold: yup
    .number()
    .typeError("Số lượng đã bán phải là một số")
    .required("Bạn chưa nhập số lượng sản phẩm đã bán"),
  origin: yup.string().required("Bạn chưa nhập nhà sản xuất của sản phẩm"),
  country: yup.string().required("Bạn chưa nhập xuất xứ của sản phẩm"),
});

export const addDiscountSchema = yup.object({
  name: yup.string().required("Bạn chưa nhập tên chương trình khuyến mại"),
  description: yup.string(),
  discountPercent: yup
    .number()
    .typeError("Phần trăm giảm giá phải là một số")
    .required("Bạn chưa nhập phần trăm giám giá"),
  startAt: yup.date().typeError("Thời gian bắt đầu chưa hợp lệ").required(),
  endAt: yup.date().typeError("Thời gian kết thúc chưa hợp lệ").required(),
});
export const addCategorySchema = yup.object({
  name: yup.string().required("Bạn chưa nhập tên danh mục"),
  description: yup.string(),
});

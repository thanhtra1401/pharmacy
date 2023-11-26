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
export const loginSchema = registerSchema.omit(["confirmPassword"]);

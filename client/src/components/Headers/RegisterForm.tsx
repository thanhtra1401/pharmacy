import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../utils/yupSchema";
import { registerApi } from "../../apis/userApi/api";

interface Props {
  closeModal: () => void;
  toLogin: () => void;
}

interface Data {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}
function RegisterForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = async (data: Data) => {
    try {
      const response = await registerApi(data);
      alert(response.data.message);
      props.toLogin();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div className="bg-white py-6 px-10 rounded-xl shadow-md z-50 min-w-[500px] relative">
      <button
        className="text-2xl right-4 top-2 absolute"
        onClick={props.closeModal}
      >
        <i className="fa-solid fa-xmark text-[#2c2c2c]"></i>
      </button>
      <h1 className="text-2xl font-bold mb-4 mt-4 text-center ">Đăng ký</h1>
      <div className="mb-4 text-gray-600 text-center">
        Vui lòng đăng ký để trở thành thành viên và nhận nhiều ưu đãi hấp dẫn
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <input
            {...register("email")}
            placeholder="Email"
            className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary  "
          />
        </div>

        <div className="mb-4 text-red-600 text-sm ">
          {errors?.email?.message}
        </div>
        <div className="flex justify-between">
          <div>
            <div className="mb-1">
              <input
                {...register("lastName")}
                placeholder="Họ"
                className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary  "
              />
            </div>
            <div className="mb-4 text-red-600 text-sm ">
              {errors?.lastName?.message}
            </div>
          </div>
          <div className="flex-1 ml-2">
            <div className="mb-1">
              <input
                {...register("firstName")}
                placeholder="Tên"
                className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary  "
              />
            </div>
            <div className="mb-4 text-red-600 text-sm ">
              {errors?.firstName?.message}
            </div>
          </div>
        </div>

        <div className="mb-1">
          <input
            {...register("password")}
            type="password"
            placeholder="Mật khẩu"
            className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary"
          />
        </div>
        <div className="mb-4 text-red-600 text-sm ">
          {errors?.password?.message}
        </div>
        <div className="mb-1">
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary"
          />
        </div>
        <div className="mb-4 text-red-600 text-sm ">
          {errors?.confirmPassword?.message}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white px-3 py-4 font-bold  rounded-full w-full mt-4 !important "
        >
          Đăng ký
        </button>
      </form>
      <div className="mt-4 flex justify-center">
        Bạn đã có tài khoản?
        <button
          className="ml-2 text-primary hover:text-blue-700"
          onClick={props.toLogin}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;

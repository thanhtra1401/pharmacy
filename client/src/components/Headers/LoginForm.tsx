import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../utils/yupSchema";
import { loginApi } from "../../apis/userApi/api";
import authStore from "../../store/store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Props {
  closeModal: () => void;
  toRegister: () => void;
}
interface Data {
  email: string;
  password: string;
}

function LoginForm(props: Props) {
  const navigate = useNavigate();

  const toForgotPassWord = () => {
    navigate("/reset-password");
    props.closeModal();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: yupResolver(loginSchema),
  });
  const login = authStore((state) => state.login);

  const onSubmit = async (data: Data) => {
    try {
      const response = await loginApi(data);
      if (response.data?.data) {
        login(response.data.data);
      }

      props.closeModal();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      } else {
        alert(error);
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
      <h1 className="text-2xl font-bold mb-4 mt-4 text-center ">Đăng nhập</h1>
      <div className="mb-4 text-gray-600">
        Vui lòng đăng nhập để hưởng những đặc quyền dành cho thành viên
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <input
            {...register("email")}
            placeholder="Email"
            className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary"
          />
        </div>

        <div className="mb-4 text-red-600 text-sm ">
          {errors?.email?.message}
        </div>

        <div className="mb-1">
          <input
            {...register("password")}
            type="password"
            placeholder="Mật khẩu"
            autoComplete="on"
            className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary"
          />
        </div>
        <div className="mb-4 text-red-600 text-sm ">
          {errors?.password?.message}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white px-3 py-4 font-bold  rounded-full w-full mt-4 !important "
        >
          Đăng nhập
        </button>
      </form>
      <div
        className="text-sm mt-2 text-primary hover:text-blue-700  cursor-pointer"
        onClick={toForgotPassWord}
      >
        Quên mật khẩu?
      </div>
      <div className="mt-4 flex justify-center">
        Bạn chưa có tài khoản?
        <button
          className="ml-2 text-primary hover:text-blue-700"
          onClick={props.toRegister}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
}

export default LoginForm;

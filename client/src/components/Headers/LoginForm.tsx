import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../utils/yupSchema";

interface Props {
  closeModal: () => void;
  toRegister: () => void;
}
interface Data {
  email: string;
  password: string;
}
function LoginForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data: Data) => {
    console.log(data);
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
            id="email"
            placeholder="Email"
            className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary  "
          />
        </div>

        <div className="mb-4 text-red-600 text-sm ">
          {errors?.email?.message}
        </div>

        <div className="mb-1">
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Mật khẩu"
            className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary"
          />
        </div>
        <div className="mb-4 text-red-600 text-sm ">
          {errors?.password?.message}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full w-full mt-4"
        >
          Đăng nhập
        </button>
      </form>
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

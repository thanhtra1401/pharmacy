import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/yupSchema";
import { loginApi } from "../apis/userApi";
import { useState } from "react";
import Swal from "sweetalert2";
import { authStore } from "../stores/authStore";
import Loading from "../components/Home/Loading";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [openLogin, setOpenLogin] = useState(true);
  const setIsAuthenticated = authStore((state) => state.setIsAuthenticated);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginApi(data);
      setTimeout(() => {
        if (response) {
          if (response.status === 200) {
            setOpenLogin(false);
            setIsAuthenticated(true);
          } else {
            Swal.fire({
              title: response.data.data.message,
              icon: "error",
            });
          }
        }
      }, 400);
    } catch (error) {
      Swal.fire({
        title: "Tài khoản hoặc mật khẩu không chính xác",
        icon: "error",
      });
    }
  };
  if (loading) {
    return (
      <div>
        <Loading></Loading>;
      </div>
    );
  } else {
    return (
      <div className="container">
        <Modal open={openLogin} footer={null} closeIcon={false} width={700}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 text-center font-medium text-lg">
              Vui lòng đăng nhập
            </div>
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
              className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white px-3 py-3 font-bold  rounded-full w-full mt-4 !important "
            >
              Đăng nhập
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Login;

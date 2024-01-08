import { useNavigate, useParams } from "react-router-dom";
import MainHeader from "../components/Headers/MainHeader";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../utils/yupSchema";
import { forgotPasswordApi } from "../apis/userApi/api";

function ForgotPassword() {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const navigate = useNavigate();
  const toLogin = () => {
    setShowLogin(true);
    navigate("/");
  };
  interface Data {
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const onSubmit = async (data: Data) => {
    try {
      if (!token) alert("Không tìm thấy địa chỉ");
      else {
        setLoading(true);
        const bodyApi = {
          resetToken: token,
          ...data,
        };
        const response = await forgotPasswordApi(bodyApi);
        if (response) setLoading(false);
        if (response.data.success) {
          alert(response.data.message);
          navigate("/");
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <MainHeader showLogin={showLogin} />
      <div className="flex justify-center items-center mt-10  ">
        <div className="bg-white py-6 px-10 rounded-xl shadow-xl  min-w-[500px] max-w-[1000px] relative ">
          <div
            className="absolute top-11 text-xl cursor-pointer"
            onClick={toLogin}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <h1 className="text-2xl font-bold mb-8 mt-4 text-center ">
            Đặt lại mật khẩu
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1">
              <input
                {...register("password")}
                placeholder="Nhập mật khẩu mới"
                className="border-[0.5px] border-gray-300 rounded-lg px-4 py-3 w-full outline-none focus:border-primary"
              />
            </div>

            <div className="mb-4 text-red-600 text-sm ">
              {errors?.password?.message}
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full w-full mt-4 flex justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-t-2 border-gray-200 border-solid rounded-full animate-spin"></div>
              ) : (
                "Xác nhận"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;

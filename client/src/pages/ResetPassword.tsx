import { useNavigate } from "react-router-dom";
import MainHeader from "../components/Headers/MainHeader";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../utils/yupSchema";
import { resetPasswordApi } from "../apis/userApi/api";
import Swal from "sweetalert2";

function ResetPassword() {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toLogin = () => {
    setShowLogin(true);
    navigate("/");
  };
  interface Data {
    email: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: yupResolver(resetPasswordSchema),
  });
  const onSubmit = async (data: Data) => {
    try {
      setLoading(true);
      const response = await resetPasswordApi(data);
      if (response) setLoading(false);
      if (response.data.success) {
        Swal.fire({
          title: "Thành công",
          icon: "success",
          text: `Mã xác minh đã được gửi đến địa chỉ email ${data.email}. Vui lòng kiểm tra email để xác minh `,
        });
        navigate("/");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        alert("Email không chính xác");
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
            <div className="mb-6">
              <input
                {...register("email")}
                placeholder="Email"
                className="border-[0.5px] border-gray-300 rounded-lg px-4 py-3 w-full outline-none focus:border-primary"
              />
            </div>

            <div className="mb-4 text-red-600 text-sm ">
              {errors?.email?.message}
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full w-full mt-4 flex justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-t-2 border-gray-200 border-solid rounded-full animate-spin"></div>
              ) : (
                "Xác minh"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ResetPassword;

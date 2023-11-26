import { useState } from "react";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function MainHeader() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setIsLogin(true);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const [isLogin, setIsLogin] = useState(true);
  const toRegister = () => {
    setIsLogin(false);
  };
  const toLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className=" h-[110px] bg-gradient-to-t from-[#1F64DE] to-[#4086EA] flex items-center">
      <div className="container grid grid-cols-10 ">
        <div className="col-span-1"></div>
        <div className="xl:col-span-6 col-span-5">
          <div className="relative flex items-center">
            <input
              className="block w-full rounded-full  border-none border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 outline-none "
              placeholder="Tìm tên thuốc"
            />
            <button className=" px-[13px] py-2 bg-primary border-solid  rounded-full absolute right-[7px] ">
              <i className="fa-solid fa-magnifying-glass text-white h-4 text-sm"></i>
            </button>
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-center text-white font-semibold ">
          <div className="cursor-pointer p-3" onClick={openModal}>
            <i className="fa-solid fa-user mr-2"></i>
            <span className="hidden sm:inline">Đăng nhập</span>
          </div>
        </div>
        <div className="xl:col-span-1 col-span-2 flex items-center justify-center text-white font-semibold ">
          <div className="cursor-pointer py-3 px-4 bg-[#1250DC] rounded-full">
            <i className="fa-solid fa-cart-shopping mr-2"></i>
            <span className="hidden sm:inline">Giỏ hàng</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal>
          {isLogin ? (
            <LoginForm closeModal={closeModal} toRegister={toRegister} />
          ) : (
            <RegisterForm closeModal={closeModal} toLogin={toLogin} />
          )}
        </Modal>
      )}
    </div>
  );
}

export default MainHeader;

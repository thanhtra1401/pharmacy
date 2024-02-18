import { useEffect, useState } from "react";
import {
  deletePrescriptionApi,
  getPrescriptionsApi,
} from "../apis/prescriptionApi";
import authStore from "../store/store";
import Loading from "../components/Common/Loading";
import { Link, useNavigate } from "react-router-dom";
import ProfileMenu from "../components/Profile/ProfileMenu";
import { Button, Image, Modal } from "antd";
import { Prescription as PrescriptionType } from "../interfaces/prescriptionInterface";
import Swal from "sweetalert2";
import AddPrescription from "../components/Prescription/AddPrescription";

function Prescription() {
  const user = authStore((state) => state.user);
  const [prescriptions, setPrescriptions] = useState<PrescriptionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const navigate = useNavigate();

  const [openUpload, setOpenUpload] = useState(false);
  const profileData = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    avatarUrl:
      user?.avatar ||
      "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    email: user?.email,
    phoneNumber: user?.phone,
    gender: user?.gender,
    dob: user?.dob,
  };
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Xóa đơn thuốc",
      text: "Bạn có chắc chắn muốn xóa đơn thuốc này?",
      showDenyButton: true,
      confirmButtonText: "Xóa",
      confirmButtonColor: "#d33",
      denyButtonColor: "#3085d6",
      denyButtonText: `Trở lại`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await deletePrescriptionApi(id);
        if (response.status === 200) {
          setDeleted((prev) => !prev);
          Swal.fire({
            icon: "success",
            text: "Đã xóa đơn thuốc",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Có lỗi xảy ra",
          });
        }
      }
    });
  };

  const getPrescriptions = async () => {
    if (user) {
      const response = await getPrescriptionsApi({ customerId: user.id });
      if (response.status === 200) {
        setPrescriptions(response.data.data.prescriptions);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    getPrescriptions();
  }, [deleted, openUpload]);
  if (loading) return <Loading />;
  return (
    <div className="bg-[#EDF0F3] min-h-screen">
      <Modal
        open={openUpload}
        onCancel={() => {
          setOpenUpload(false);
        }}
        maskClosable={false}
        footer={null}
      >
        <AddPrescription setOpenUpload={setOpenUpload} />
      </Modal>
      <div className="container pt-4">
        <Link to="/" className="text-primary">
          Trang chủ
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/thong-tin-ca-nhan" className="text-primary">
          Cá nhân
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span>Đơn thuốc của tôi</span>
      </div>
      <div className="grid grid-cols-12 container mt-4">
        <div className="xl:col-span-3 xl:block hidden">
          <div className=" mr-7 min-h-[176px] flex flex-col justify-center items-center bg-cover bg-no-repeat bg-[url('https://nhathuoclongchau.com.vn/estore-images/profile/v2/background-info.png')]">
            <img
              className="rounded-full w-10 h-10  "
              src={profileData.avatarUrl}
              alt={profileData.firstName}
            ></img>
            <div className="text-white  ">
              {profileData.lastName} {profileData.firstName}
            </div>
            <div className="text-white ">{profileData.phoneNumber}</div>
          </div>
          <ProfileMenu active="infoPrescription" />
        </div>
        <div className="xl:col-span-9 col-span-12  rounded-lg">
          <div className="text-lg font-semibold mt-3 pb-2 px-3  flex items-center justify-between">
            <span className="mr-20">Quản lý đơn thuốc</span>
            <Button
              type="primary"
              className="bg-primary "
              size="large"
              shape="round"
              onClick={() => {
                setOpenUpload(true);
              }}
            >
              Tải lên đơn thuốc mới
            </Button>
          </div>
          {prescriptions.length > 0 &&
            prescriptions.map((prescription) => (
              <div className="p-4 rounded-lg bg-white mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex ">
                    <Image width={80} height={80} src={prescription.image} />
                    <div className="flex items-center">
                      <div className="border-r border-gray-400 pr-2 font-medium ml-4">
                        Đơn thuốc{" "}
                        <span className="text-gray-500">
                          #{prescription.id}
                        </span>{" "}
                        ngày{" "}
                        {new Date(prescription.createdAt).toLocaleDateString()}
                      </div>
                      {prescription.status === 0 && (
                        <div className="text-[#64b5f6] flex ml-2">
                          <span className="mr-4 font-medium">Đang xử lý</span>
                        </div>
                      )}
                      {prescription.status === 1 && (
                        <div className="text-[#4caf50] flex ml-2">
                          <span className="mr-4 font-medium">Đã xử lý</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <span
                      className="border-r border-gray-400 pr-2 text-primary hover:text-blue-600 cursor-pointer "
                      onClick={() =>
                        navigate(
                          `/don-thuoc/chi-tiet-don-thuoc/${prescription.id}`
                        )
                      }
                    >
                      Xem chi tiết
                    </span>
                    <span
                      className="text-red-500 hover:text-red-600 cursor-pointer ml-2"
                      onClick={() => handleDelete(prescription.id)}
                    >
                      Xóa
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Prescription;

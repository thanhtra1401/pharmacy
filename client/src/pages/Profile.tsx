import { Button, Modal, Upload, message } from "antd";
import authStore from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import ProfileMenu from "../components/Profile/ProfileMenu";
import { useEffect, useState } from "react";
import { getUser } from "../apis/userApi/api";
import { CameraOutlined, PlusOutlined } from "@ant-design/icons";
//import { RcFile, UploadFile, UploadProps } from "antd/es/upload";

// const getBase64 = (file: RcFile): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });
function Profile() {
  const navigate = useNavigate();

  const user = authStore((state) => state.user);
  const setUser = authStore((state) => state.setUser);
  const profileData = {
    id: user?.id,
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

  const getProfile = async () => {
    try {
      if (user) {
        const response = await getUser(user.id);
        setUser(response.data.data.user);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState("");
  // const [previewTitle, setPreviewTitle] = useState("");
  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  // const handleCancel = () => setPreviewOpen(false);
  // const handlePreview = async (file: UploadFile) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj as RcFile);
  //   }

  //   setPreviewImage(file.url || (file.preview as string));
  //   setPreviewOpen(true);
  //   setPreviewTitle(
  //     file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
  //   );
  // };

  // const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
  //   setFileList(newFileList);

  // const customRequest = async ({ onSuccess, onError, file }: any) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const response = await axios.post(
  //       `http://localhost:8000/api/upload-avatar/${profileData.id}`,
  //       formData
  //     );

  //     const { success, message: apiMessage } = response.data;

  //     if (success) {
  //       message.success(apiMessage);
  //       // You may want to update the user interface or state after a successful upload
  //     } else {
  //       message.error(apiMessage);
  //     }

  //     onSuccess();
  //   } catch (error) {
  //     console.error(error);
  //     onError();
  //   }
  // };

  // const uploadButton = (
  //   <div style={{ border: 0, background: "none" }}>
  //     <PlusOutlined />
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );
  return (
    <div className="bg-[#EDF0F3] min-h-screen">
      <div className="container pt-4">
        <Link to="/" className="text-primary">
          Trang chủ
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/thong-tin-ca-nhan" className="text-primary">
          Cá nhân
        </Link>
      </div>
      <div className="grid grid-cols-12 container mt-4">
        <div className="md:col-span-3 md:block hidden">
          <div className="w-[290px] h-[176px] flex flex-col justify-center items-center bg-no-repeat bg-[url('https://nhathuoclongchau.com.vn/estore-images/profile/v2/background-info.png')]">
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
          <ProfileMenu active="infoProfile" />
        </div>
        <div className="md:col-span-9 col-span-12 bg-white rounded-lg">
          <div className="text-lg font-semibold mt-3 pb-2 px-3 border-b-[1px] border-gray-300">
            Thông tin cá nhân
          </div>

          <div className="flex flex-col items-center">
            {/* <Upload
              customRequest={customRequest}
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              maxCount={1}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal> */}
            <div className="relative">
              <img
                src={profileData.avatarUrl}
                alt="avatar"
                className="w-20 h-20 rounded mt-4"
              />
              <Upload>
                <Button
                  icon={<CameraOutlined />}
                  className="absolute right-[-4px] bottom-2 border-none "
                />
              </Upload>
            </div>

            <div className="w-96 mb-4">
              <div className="flex mt-4 pb-3 border-b-[1px] border-gray-300 justify-between">
                <div className="text-gray-600 ">Họ và tên </div>
                <div className="text-black">
                  {profileData.lastName} {profileData.firstName}
                </div>
              </div>
              <div className="flex mt-4 pb-3 border-b-[1px] border-gray-300 justify-between">
                <div className="text-gray-600">Số điện thoại </div>
                {profileData.phoneNumber ? (
                  <div>{profileData.phoneNumber}</div>
                ) : (
                  <div className="text-primary cursor-pointer hover:text-blue-600">
                    Thêm thông tin
                  </div>
                )}
              </div>

              <div className="flex mt-4 pb-3 border-b-[1px] border-gray-300 justify-between">
                <div className="text-gray-600">Giới tính </div>
                {profileData.gender ? (
                  <div>{profileData.gender === "male" ? "Nam" : "Nữ"}</div>
                ) : (
                  <div className="text-primary cursor-pointer hover:text-blue-600">
                    Thêm thông tin
                  </div>
                )}
              </div>

              <div className="flex mt-4 pb-3 border-b-[1px] border-gray-300 justify-between">
                <div className="text-gray-600">Ngày sinh</div>
                {profileData.dob ? (
                  <div>{profileData.dob.slice(0, 10)}</div>
                ) : (
                  <div className="text-primary cursor-pointer hover:text-blue-600">
                    Thêm thông tin
                  </div>
                )}
              </div>
            </div>

            <Button
              size="large"
              className="mb-6 bg-gray-200 text-primary "
              shape="round"
              onClick={() => navigate("/thong-tin-ca-nhan/chinh-sua")}
            >
              Chỉnh sửa thông tin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import { Button, Modal, Spin, Upload, message } from "antd";
import authStore from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import ProfileMenu from "../components/Profile/ProfileMenu";
import { useEffect, useState } from "react";
import { getUserApi, uploadAvatarApi } from "../apis/userApi/api";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const user = authStore((state) => state.user);
  const [imageUrl, setImageUrl] = useState<string>(user?.avatar || "");
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

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (user) {
          const response = await getUserApi(user.id);

          if (response.status === 200) {
            setTimeout(() => {
              setUser(response.data.data.user);
              setLoading(false);
            }, 400);
          }
        }
      } catch (error) {
        alert(error);
      }
    };
    getProfile();
  }, []);

  const handleChange: UploadProps["onChange"] = (info) => {
    console.log(info);
    if (info.file.status === "uploading") {
      setLoadingAvatar(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoadingAvatar(false);
        setImageUrl(url);
      });
    }
  };

  const uploadAvatar = async ({
    file,
    onSuccess,
  }: {
    file: FileType;
    onSuccess: (file: UploadFile) => void;
  }) => {
    try {
      if (user) {
        const formData = new FormData();

        formData.append("avatar", file);

        const response = await uploadAvatarApi(formData, user?.id);
        if (response.status === 200) {
          message.success("Tải lên thành công");
          setUser(response.data.data.user);
          onSuccess(file);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loadingAvatar ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  if (loading) {
    return (
      <div className="h-lvh container w-full">
        <Modal open={true} closeIcon={false} footer={null}>
          <div className="flex items-center justify-center flex-col">
            <Spin size="large" />
            <div className="mt-4">Loading</div>
          </div>
        </Modal>
      </div>
    );
  } else {
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
              {/* <div className="relative">
                <img
                  src={profileData.avatarUrl}
                  alt="avatar"
                  className="w-20 h-20 rounded-full mt-4"
                />
                <Button
                  icon={<CameraOutlined />}
                  className="absolute right-0 bottom-[-4px] border-none "
                />


              </div> */}
              <div className="">
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  customRequest={uploadAvatar}
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      className="w-full rounded-full"
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
                {/* <img
                  src={profileData.avatarUrl}
                  alt="avatar"
                  className="w-20 h-20 rounded mt-4"
                />
                <Upload>
                  <Button
                    icon={<CameraOutlined />}
                    className="absolute right-[-4px] bottom-2 border-none "
                  />
                </Upload> */}
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
}

export default Profile;

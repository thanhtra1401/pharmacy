import { Button, DatePicker, Form, Radio } from "antd";
import authStore from "../store/store";
import { Link } from "react-router-dom";
import ProfileMenu from "../components/Profile/ProfileMenu";
import { Controller, useForm } from "react-hook-form";
import Input from "antd/es/input/Input";
import dayjs from "dayjs";
import { updateUserApi } from "../apis/userApi/api";
import Swal from "sweetalert2";
// import moment from "moment";
// import { UploadChangeParam } from "antd/es/upload";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

function ProfileUpdate() {
  const user = authStore((state) => state.user);
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
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    //resolver: yupResolver(schema),
  });
  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
  }
  interface Data {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: Date;
    gender: string;
  }

  const onSubmit = async (data: FormData) => {
    const dataConvert: Data = { ...data, dob: new Date(data.dob) };
    try {
      if (profileData.id) {
        const response = await updateUserApi(profileData.id, dataConvert);

        Swal.fire({
          icon: "success",
          text: response.data.message,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

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
        <div className="xl:col-span-3 xl:block hidden">
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
        <div className="xl:col-span-9 col-span-12 bg-white rounded-lg">
          <div className="text-lg font-semibold mt-3 pb-2 px-3 border-b-[1px] border-gray-300">
            Chỉnh sửa thông tin
          </div>

          <div className="flex flex-col items-center">
            <img
              src={profileData.avatarUrl}
              alt="avatar"
              className="w-20 h-20 rounded mt-4"
            />
            <div className="w-96 mb-4">
              <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Form.Item
                  label="Họ"
                  validateStatus={errors.lastName ? "error" : ""}
                  help={errors.lastName?.message || ""}
                >
                  <Controller
                    name="lastName"
                    defaultValue={profileData.lastName}
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>

                <Form.Item
                  label="Tên"
                  validateStatus={errors.firstName ? "error" : ""}
                  help={errors.firstName?.message || ""}
                >
                  <Controller
                    name="firstName"
                    defaultValue={profileData.firstName}
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  validateStatus={errors.email ? "error" : ""}
                  help={errors.email?.message || ""}
                >
                  <Controller
                    defaultValue={profileData.email}
                    name="email"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>

                {/* <Form.Item
                  label="Avatar"
                  validateStatus={errors.avatar ? "error" : ""}
                  help={errors.avatar?.message || ""}
                >
                  <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                      <Upload {...avatarProps} onChange={onAvatarChange}>
                        {field.value ? (
                          <img
                            src={field.value}
                            alt="avatar"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          <div>
                            {isSubmitting ? (
                              <LoadingOutlined />
                            ) : (
                              <PlusOutlined />
                            )}
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        )}
                      </Upload>
                    )}
                  />
                </Form.Item> */}

                <Form.Item
                  label="Số điện thoại"
                  validateStatus={errors.phone ? "error" : ""}
                  help={errors.phone?.message || ""}
                >
                  <Controller
                    defaultValue={profileData.phoneNumber}
                    name="phone"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>

                <Form.Item
                  label="Ngày sinh"
                  validateStatus={errors.dob ? "error" : ""}
                  help={errors.dob?.message || ""}
                >
                  <Controller
                    name="dob"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        onChange={(date) => field.onChange(date?.valueOf())}
                        value={field.value ? dayjs(field.value) : null}
                        placeholder="Chọn ngày"
                        format="DD/MM/YYYY"
                      />
                    )}
                  />
                </Form.Item>

                <Form.Item
                  label="Giới tính"
                  validateStatus={errors.gender ? "error" : ""}
                  help={errors.gender?.message || ""}
                >
                  <Controller
                    defaultValue={profileData.gender}
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Radio.Group {...field}>
                        <Radio value="male">Nam</Radio>
                        <Radio value="female">Nữ</Radio>
                      </Radio.Group>
                    )}
                  />
                </Form.Item>

                <Form.Item className="flex justify-center">
                  <Button
                    size="large"
                    className="mb-6 bg-primary"
                    shape="round"
                    type="primary"
                    htmlType="submit"
                  >
                    Cập nhật thông tin
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;

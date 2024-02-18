import { Button, Image, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
//import type { GetProp, UploadProps } from "antd";
import { useState } from "react";
import { createPrescriptionApi } from "../../apis/prescriptionApi";
import authStore from "../../store/store";
import Swal from "sweetalert2";

function AddPrescription({
  setOpenUpload,
}: {
  setOpenUpload: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const user = authStore((state) => state.user);

  //type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const beforeUpload = (file: File) => {
    setFile(file);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn cần tải lên ảnh JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Ảnh phải có dung lượng nhỏ hơn 2MB!");
    }
    return false;
  };
  const handleSubmit = async () => {
    const formData = new FormData();

    if (file) {
      formData.append("prescription-image", file);

      if (user) {
        const response = await createPrescriptionApi(user.id, formData);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Tải lên đơn thuốc thành công",
          });
          setFile(null);
          setOpenUpload(false);
        }
      }
    } else {
      Swal.fire({
        title: "Thất bại",
        text: "Có lỗi xảy ra. Vui lòng thử lại",
        icon: "error",
      });
    }
  };
  const onChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <div>
      <div>Tải lên hình ảnh đơn thuốc</div>
      <div className="mt-2">
        <Upload
          onChange={onChange}
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>
      {file && (
        <Image
          src={URL.createObjectURL(file)}
          alt="don-thuoc"
          style={{ marginTop: 10 }}
          width={200}
        />
      )}
      {file && (
        <div className="mt-2">
          <button
            className="py-2 px-10 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => handleSubmit()}
          >
            Tải lên đơn thuốc
          </button>
        </div>
      )}
    </div>
  );
}

export default AddPrescription;

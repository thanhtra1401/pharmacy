import { Modal } from "antd";
import SelectProvince from "../Address/SelectProvince";
import SelectDistrict from "../Address/SelectDistrict";
import SelectWard from "../Address/SelectWard";
import { useEffect, useState } from "react";
import {
  District,
  Province,
  Ward,
} from "../../interfaces/publicProvinceInterface";
import {
  getDistrictsApi,
  getProvincesApi,
  getWardsApi,
} from "../../apis/publicProvince";
import { createAddressApi } from "../../apis/addressApi";
import authStore from "../../store/store";
import Swal from "sweetalert2";

function CreateFirstAddress({
  openNewAddress,
  setOpenNewAddress,
}: {
  openNewAddress: boolean;
  setOpenNewAddress: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState<Ward[]>([]);
  const [ward, setWard] = useState("");
  const getPublicProvince = async () => {
    const response = await getProvincesApi();
    if (response.status === 200) setProvinces(response?.data.results);
  };
  const user = authStore((state) => state.user);
  useEffect(() => {
    getPublicProvince();
  }, []);
  useEffect(() => {
    const getPublicWard = async () => {
      if (province !== "") {
        const response = await getWardsApi(district);
        if (response.status === 200) setWards(response?.data.results);
      }
    };
    getPublicWard();
  }, [district, province]);

  useEffect(() => {
    const getPublicDistrict = async () => {
      if (province !== "") {
        const response = await getDistrictsApi(province);
        if (response.status === 200) setDistricts(response?.data.results);
      }
    };
    getPublicDistrict();
  }, [province]);
  const [receiveName, setReceiveName] = useState("");
  const [receivePhone, setReceivePhone] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const provinceName = provinces.find(
    (item) => item.province_id === province
  )?.province_name;
  const districtName = districts.find(
    (item) => item.district_id === district
  )?.district_name;
  const wardName = wards.find((item) => item.ward_id === ward)?.ward_name;

  const handleSubmit = async () => {
    const response = await createAddressApi({
      receiveName,
      receivePhone,
      detail: detailAddress,
      customerId: user?.id,
      province: provinceName,
      provinceCode: province,
      district: districtName,
      districtCode: district,
      ward: wardName,
      wardCode: ward,
      defaultAddress: true,
    });
    if (response.status === 200) {
      Swal.fire({
        text: "Đã thêm mới địa chỉ",
        icon: "success",
      });
      setOpenNewAddress(false);
    } else {
      Swal.fire({
        text: "Có lỗi xảy ra. Vui lòng thử lại",
        icon: "error",
      });
      setOpenNewAddress(false);
    }
  };

  return (
    <div>
      <Modal
        title="Địa chỉ giao hàng"
        open={openNewAddress}
        onCancel={() => {
          setOpenNewAddress(false);
        }}
        onOk={() => {
          handleSubmit();
        }}
        okButtonProps={{
          className: "bg-primary",
        }}
        okText="Hoàn thành"
        cancelText="Hủy"
        width={800}
      >
        <div className="pt-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="fullNameReceive" className="text-sm">
                Họ và tên người nhận
              </label>
              <input
                required
                name="fullNameReceive"
                value={receiveName}
                onChange={(e) => setReceiveName(e.target.value)}
                className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary mt-1"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="phoneReceive" className="text-sm">
                Số điện thoại
              </label>
              <input
                required
                value={receivePhone}
                onChange={(e) => setReceivePhone(e.target.value)}
                name="phoneReceive"
                className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary mt-1"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <div className="w-1/3">
              <SelectProvince
                label="Tỉnh/Thành phố"
                options={provinces}
                setProvince={setProvince}
                province={province}
              />
            </div>
            <div className="w-1/3">
              <SelectDistrict
                label="Quận/Huyện"
                options={districts}
                setDistrict={setDistrict}
                district={district}
              />
            </div>
            <div className="w-1/3">
              <SelectWard
                label="Phường/Xã"
                options={wards}
                setWard={setWard}
                ward={ward}
              />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="detailAddress" className="text-sm">
              Địa chỉ cụ thể
            </label>
            <input
              required
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              name="detailAddress"
              className="border-[0.5px] rounded-lg px-4 py-3 w-full outline-none focus:border-primary mt-1"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateFirstAddress;

import { Modal, Switch } from "antd";
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
import {
  getAddressById,
  getDefaultAddressApi,
  updateAddressApi,
} from "../../apis/addressApi";
import authStore from "../../store/store";
import Swal from "sweetalert2";

function UpdateAddress({
  addressId,
  openUpdateAddress,
  setOpenUpdateAddress,
}: {
  addressId: number;
  openUpdateAddress: boolean;
  setOpenUpdateAddress: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //const [address, setAddress] = useState<Address>();

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState<Ward[]>([]);
  const [ward, setWard] = useState("");

  const [receiveName, setReceiveName] = useState("");
  const [receivePhone, setReceivePhone] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [defaultAddress, setDefaultAddress] = useState(false);

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

  useEffect(() => {
    const getAddress = async () => {
      const response = await getAddressById(addressId);
      if (response.status === 200) {
        setReceiveName(response.data.data.address.receiveName);
        setReceivePhone(response.data.data.address.receivePhone);
        setDetailAddress(response.data.data.address.detail);
        setDefaultAddress(response.data.data.address.defaultAddress);
        setProvince(response.data.data.address.provinceCode);
        setDistrict(response.data.data.address.districtCode);
        setWard(response.data.data.address.wardCode);
      }
    };
    getAddress();
  }, []);

  const provinceName = provinces.find(
    (item) => item.province_id === province
  )?.province_name;
  const districtName = districts.find(
    (item) => item.district_id === district
  )?.district_name;
  const wardName = wards.find((item) => item.ward_id === ward)?.ward_name;

  const handleSubmit = async () => {
    if (defaultAddress) {
      const responseGetDefaultAddress =
        user && (await getDefaultAddressApi(user.id));
      if (responseGetDefaultAddress?.data.data.address) {
        const responseUpdateDefaultAddress = await updateAddressApi(
          { defaultAddress: false },
          responseGetDefaultAddress.data.data.address.id
        );
        if (responseUpdateDefaultAddress.status !== 200) {
          Swal.fire({
            text: "Có lỗi xảy ra. Vui lòng thử lại",
            icon: "error",
          });
        }
      }
    }

    const response = await updateAddressApi(
      {
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
        defaultAddress,
      },
      addressId
    );
    // const response = await createAddressApi({
    //   receiveName,
    //   receivePhone,
    //   detail: detailAddress,
    //   customerId: user?.id,
    //   province: provinceName,
    //   provinceCode: province,
    //   district: districtName,
    //   districtCode: district,
    //   ward: wardName,
    //   wardCode: ward,
    //   defaultAddress,
    // });
    if (response.status === 200) {
      Swal.fire({
        text: "Đã cập nhật địa chỉ",
        icon: "success",
      });
      setOpenUpdateAddress(false);
    }
  };

  return (
    <div>
      <Modal
        title="Địa chỉ giao hàng"
        open={openUpdateAddress}
        onCancel={() => {
          setOpenUpdateAddress(false);
        }}
        onOk={() => {
          handleSubmit();
        }}
        okButtonProps={{
          className: "bg-primary",
        }}
        okText="Hoàn thành"
        cancelText="Trở lại"
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
          <div className="flex mt-4">
            <Switch
              className="bg-gray-300"
              value={defaultAddress}
              onChange={(checked: boolean) => setDefaultAddress(checked)}
            />
            <span className="ml-2">Đặt làm địa chỉ mặc định</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UpdateAddress;

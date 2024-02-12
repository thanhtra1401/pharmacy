import { Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import { Address } from "../../interfaces/addressInterface";
import { getAddressById, getAddressByUserApi } from "../../apis/addressApi";
import authStore from "../../store/store";
import NewAddress from "./NewAddress";

function SelectAddress({
  openSelectAddress,
  setOpenSelectAddress,
  setAddress,
}: {
  openSelectAddress: boolean;
  setOpenSelectAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<Address | undefined>>;
}) {
  const user = authStore((state) => state.user);
  const [addresses, setAddresses] = useState<Address[]>();

  const getAddress = async (id: number) => {
    const response = await getAddressById(id);
    if (response.status === 200) setAddress(response.data.data.address);
  };

  const [valueAddress, setValueAddress] = useState("");
  const [openNewAddress, setOpenNewAddress] = useState(false);

  useEffect(() => {
    const getAddresses = async () => {
      const response = user && (await getAddressByUserApi(user?.id));
      if (response && response.status === 200) {
        setAddresses(response.data.data.addresses);
      }
    };
    getAddresses();
  }, [openSelectAddress, openNewAddress]);
  return (
    <div>
      <Modal
        title="Địa chỉ giao hàng"
        open={openSelectAddress}
        onCancel={() => setOpenSelectAddress(false)}
        okButtonProps={{
          className: "bg-primary",
        }}
        onOk={() => {
          getAddress(parseInt(valueAddress));
          setOpenSelectAddress(false);
        }}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        <div>
          <Radio.Group
            value={valueAddress}
            onChange={(e) => setValueAddress(e.target.value)}
          >
            {addresses?.map((address) => (
              <Radio key={address.id} className="mt-4" value={address.id}>
                <div>
                  <span className="pr-2 border-r border-gray-400 font-medium">
                    {address.receiveName}
                  </span>
                  <span className="ml-2">{address.receivePhone}</span>
                </div>
                <div>
                  <span>
                    {address.detail}, {address.ward}, {address.district},{" "}
                    {address.province}
                  </span>
                  {address.defaultAddress && (
                    <span className="px-1 text-primary border border-primary text-xs whitespace-nowrap w-min ml-2">
                      Mặc định
                    </span>
                  )}
                </div>
              </Radio>
            ))}
          </Radio.Group>

          <button
            className="mt-4 py-2 px-4 border-primary border text-primary rounded-lg hover:text-blue-700"
            onClick={() => {
              setOpenNewAddress(true);
              setOpenSelectAddress(false);
            }}
          >
            {" "}
            + Thêm địa chỉ mới
          </button>
        </div>
      </Modal>
      {openNewAddress && (
        <NewAddress
          setOpenSelectAddress={setOpenSelectAddress}
          openNewAddress={openNewAddress}
          setOpenNewAddress={setOpenNewAddress}
        />
      )}
    </div>
  );
}

export default SelectAddress;

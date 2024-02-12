import { Address, User } from "../models";
const getAddressById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const address = await Address.findOne({
      where: {
        id,
      },
    });
    if (address) {
      res.status(200).json({
        success: true,
        message: "Lấy địa chỉ thành công",
        data: {
          address,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
const getAddressByUserId = async (req, res, next) => {
  try {
    const { customerId } = req.query;

    const addresses = await Address.findAll({
      where: {
        customerId,
      },
    });
    if (addresses) {
      res.status(200).json({
        success: true,
        message: "Lấy thành công danh sách địa chỉ của khách hàng",
        data: {
          addresses,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
const getdefaultAddressByUserId = async (req, res, next) => {
  try {
    const { customerId } = req.query;

    const address = await Address.findOne({
      where: {
        customerId,
        defaultAddress: true,
      },
    });
    if (address) {
      res.status(200).json({
        success: true,
        message: "Lấy thành công địa chỉ của khách hàng",
        data: {
          address,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const createAddress = async (req, res, next) => {
  try {
    const {
      customerId,
      province,
      provinceCode,
      district,
      districtCode,
      ward,
      wardCode,
      detail,
      defaultAddress,
      receiveName,
      receivePhone,
    } = req.body;
    const user = await User.findOne({
      where: {
        id: customerId,
      },
    });
    const address = await Address.create({
      customerId,
      province,
      provinceCode,
      district,
      districtCode,
      ward,
      wardCode,
      detail,
      defaultAddress: defaultAddress || false,
      receiveName: receiveName || user.lastName + " " + user.firstName,
      receivePhone: receivePhone || user.phone,
    });
    if (address) {
      res.status(200).json({
        success: true,
        message: "Tạo thành công địa chỉ",
        data: {
          address,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      customerId,
      province,
      provinceCode,
      district,
      districtCode,
      ward,
      wardCode,
      detail,
      defaultAddress,
      receiveName,
      receivePhone,
    } = req.body;
    const address = await Address.findOne({
      where: {
        id,
      },
    });
    if (address) {
      address.customerId = customerId;
      address.province = province;
      address.provinceCode = provinceCode;
      address.districtCode = districtCode;
      address.wardCode = wardCode;
      address.district = district;
      address.ward = ward;
      address.defaultAddress = defaultAddress;
      address.detail = detail;
      address.receiveName = receiveName;
      address.receivePhone = receivePhone;
      address.save();
      res.status(200).json({
        success: true,
        message: "Cập nhật địa chỉ thành công",
        data: {
          address,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Address.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Xóa thành công địa chỉ",
    });
  } catch (error) {
    next(error);
  }
};
export {
  getAddressById,
  getAddressByUserId,
  createAddress,
  updateAddress,
  deleteAddress,
  getdefaultAddressByUserId,
};

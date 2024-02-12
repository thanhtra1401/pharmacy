import { Address } from "../../interfaces/addressInterface";
import httpRequest from "../http";

const getAddressByUserApi = async (customerId: number) => {
  const response = await httpRequest.get("/address/get-by-user", {
    params: { customerId },
  });
  return response;
};
const getDefaultAddressApi = async (customerId: number) => {
  const response = await httpRequest.get("/address/get-default-by-user", {
    params: { customerId },
  });
  return response;
};

const getAddressById = async (id: number) => {
  const response = await httpRequest.get(`/address/${id}`);
  return response;
};
const createAddressApi = async (data: Address) => {
  const response = await httpRequest.post("/address", data);
  return response;
};
const updateAddressApi = async (data: Address, id: number) => {
  const response = await httpRequest.put(`/address/${id}`, data);
  return response;
};

const deleteAddressApi = async (id: number) => {
  const response = await httpRequest.delete(`/address/${id}`);
  return response;
};

export {
  getAddressByUserApi,
  createAddressApi,
  updateAddressApi,
  getDefaultAddressApi,
  getAddressById,
  deleteAddressApi,
};

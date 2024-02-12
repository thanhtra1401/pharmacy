import httpRequest from "../http";

const getDiscountsApi = async (params) => {
  const response = await httpRequest.get("/discount", { params });
  return response;
};

const getDiscountApi = async (id) => {
  const response = await httpRequest.get(`/discount/${id}`);
  return response;
};
const updateDiscountApi = async (id, data) => {
  const response = await httpRequest.put(`/discount/${id}`, data);
  return response;
};
const createDiscountApi = async (data) => {
  const response = await httpRequest.post("/discount", data);
  return response;
};

const createDiscountDetailApi = async (data) => {
  const response = await httpRequest.post("/discount-detail", data);
  return response;
};

const deleteDiscountApi = async (id) => {
  const response = await httpRequest.delete(`/discount/${id}`);
  return response;
};

export {
  getDiscountsApi,
  createDiscountDetailApi,
  getDiscountApi,
  updateDiscountApi,
  createDiscountApi,
  deleteDiscountApi,
};

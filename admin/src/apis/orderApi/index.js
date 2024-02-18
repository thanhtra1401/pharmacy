import httpRequest from "../http";

const getOrdersApi = async () => {
  const response = await httpRequest.get("/order");
  return response;
};
const getOrdersOfUserApi = async (id) => {
  const response = await httpRequest.get("/order", {
    params: { customerId: id },
  });
  return response;
};
const getOrdersOfDiscountApi = async (id) => {
  const response = await httpRequest.get("/order", {
    params: { discountId: id },
  });
  return response;
};

const getOrderApi = async (id) => {
  const response = await httpRequest.get(`order/${id}`);
  return response;
};

const updateStatusOrderApi = async (data, id) => {
  const response = await httpRequest.put(`order/${id}`, data);
  return response;
};

const getOrderDetailsInDiscountApi = async (id) => {
  const response = await httpRequest.get(`/order-detail/in-discount/${id}`);
  return response;
};

const getOrdersByMonthApi = async () => {
  const response = await httpRequest.get("/order/by-month");
  return response;
};
export {
  getOrdersApi,
  getOrderApi,
  updateStatusOrderApi,
  getOrdersOfUserApi,
  getOrdersOfDiscountApi,
  getOrderDetailsInDiscountApi,
  getOrdersByMonthApi,
};

import httpRequest from "../http";

const createOrderApi = async (data: {
  payment?: number;
  howReceive?: number;
  totalPrice?: number;
  status?: number;
  customerId?: number;
  shipFee?: number;
  addressId?: number;
}) => {
  const response = await httpRequest.post("/order", data);
  return response;
};

const getOrderApi = async () => {
  const response = await httpRequest.get("/order");
  return response;
};

const getOrderByIdApi = async (id: number) => {
  const response = await httpRequest.get(`order/${id}`);
  return response;
};

const getUserOrderApi = async (customerId: number) => {
  const response = await httpRequest.get("/order", { params: { customerId } });
  return response;
};

const updateOrderApi = async (
  data: {
    payment?: number;
    howReceive?: number;
    totalPrice?: number;
    status?: number;
    customerId?: number;
    addressId?: number;
    shipFee?: number;
  },
  id: number
) => {
  const response = await httpRequest.put(`/order/${id}`, data);
  return response;
};

const deleteOrderApi = async (id: number) => {
  const response = await httpRequest.delete(`/order/${id}`);
  return response;
};

const createDetailOrderApi = async (data: {
  orderId: number;
  productId: number;
  amount: number;
  discountId?: number;
  price: number;
}) => {
  const response = await httpRequest.post("/order-detail", data);
  return response;
};

export {
  createOrderApi,
  getOrderApi,
  updateOrderApi,
  deleteOrderApi,
  createDetailOrderApi,
  getUserOrderApi,
  getOrderByIdApi,
};

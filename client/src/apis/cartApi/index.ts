import httpRequest from "../http";

const getCartApi = async (data: { customerId: number }) => {
  const response = await httpRequest.get("/cart", { params: data });
  return response;
};

const getCartSelectedApi = async (data: { customerId: number }) => {
  const response = await httpRequest.get("/cart/selected", { params: data });
  return response;
};

const addToCartApi = async (data: {
  cartId: number;
  productId: number;
  amount: number;
}) => {
  const response = await httpRequest.post("/cart-detail/add-to-cart", data);
  return response;
};
const updateCartApi = async (id: number) => {
  const response = await httpRequest.put(`/cart/${id}`);
  return response;
};

const updateCartSelectedApi = async (id: number, selected: boolean) => {
  const response = await httpRequest.put(`/cart-detail/select/${id}`, {
    selected,
  });
  return response;
};

const updateCartAmountApi = async (id: number, amount: number) => {
  const response = await httpRequest.put(`cart-detail/amount/${id}`, {
    amount,
  });
  return response;
};

const selectedAllApi = async (id: number, selected: boolean) => {
  const response = await httpRequest.put(`cart/select-all/${id}`, {
    selected,
  });
  return response;
};

const deleteCartApi = async (id: number) => {
  const response = await httpRequest.delete(`/cart-detail/${id}`);
  return response;
};
export {
  getCartApi,
  addToCartApi,
  deleteCartApi,
  updateCartApi,
  updateCartSelectedApi,
  selectedAllApi,
  updateCartAmountApi,
  getCartSelectedApi,
};

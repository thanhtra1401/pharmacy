import httpRequest from "../http";

const getProductsApi = async (params) => {
  const response = await httpRequest.get("/product", {
    params,
  });
  return response;
};

const getProductApi = async (id) => {
  const response = await httpRequest.get(`/product/${id}`);
  return response;
};

const createProductApi = async (data) => {
  const response = await httpRequest.post("/product", data);
  return response;
};
const updateProductApi = async (id, data) => {
  const response = await httpRequest.put(`/product/${id}`, data);
  return response;
};
const deleteProductApi = async (id) => {
  const response = await httpRequest.delete(`/product/${id}`);
  return response;
};
const uploadImageProductApi = async (id, fileForm) => {
  const response = await httpRequest.put(
    `/product/upload-main-image/${id}`,
    fileForm
  );
  return response;
};
export {
  getProductsApi,
  getProductApi,
  createProductApi,
  updateProductApi,
  uploadImageProductApi,
  deleteProductApi,
};

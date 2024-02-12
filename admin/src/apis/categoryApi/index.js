import httpRequest from "../http";

const getCategoriesApi = async () => {
  const response = await httpRequest.get("/category");
  return response;
};
const getCategoryApi = async (id) => {
  const response = await httpRequest.get(`/category/${id}`);
  return response;
};
const getChildCategoriesApi = async () => {
  const response = await httpRequest.get("/category/child");
  return response;
};

const createCategoryApi = async (data) => {
  const response = await httpRequest.post("/category", data);
  return response;
};

const deleteCategoryApi = async (id) => {
  const response = await httpRequest.delete(`/category/${id}`);
  return response;
};

const updateCategoryApi = async (id, data) => {
  const respoonse = await httpRequest.put(`/category/${id}`, data);
  return respoonse;
};
export {
  getCategoriesApi,
  createCategoryApi,
  getChildCategoriesApi,
  getCategoryApi,
  deleteCategoryApi,
  updateCategoryApi,
};

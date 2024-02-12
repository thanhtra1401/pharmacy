import { productListConfig } from "../../interfaces/productInterface";
import httpRequest from "../http";

const getProductsApi = async (params: productListConfig) => {
  const response = await httpRequest.get("/product", {
    params,
  });
  return response;
};

const getProductApi = async (id: number) => {
  const response = await httpRequest.get(`/product/${id}`);
  return response;
};
export { getProductsApi, getProductApi };

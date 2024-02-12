import httpRequest from "../http";

const getCategoryApi = async () => {
  const response = await httpRequest.get("/category");
  return response;
};
const getCategoryBySlugApi = async (slug: string) => {
  const response = await httpRequest.get(`/category/${slug}`);
  return response;
};

export { getCategoryApi, getCategoryBySlugApi };

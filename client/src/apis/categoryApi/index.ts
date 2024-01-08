import httpRequest from "../http";

const getCategory = async () => {
  const response = await httpRequest.get("/category");
  return response;
};
export { getCategory };

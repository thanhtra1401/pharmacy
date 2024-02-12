import httpRequest from "../http";

const loginApi = async (data) => {
  const response = await httpRequest.post("/user/login", data);
  return response;
};

const getCustomersApi = async (size) => {
  const response = await httpRequest.get("/user", {
    params: {
      size: size || 10000,
    },
  });
  return response;
};

const getCustomerByIdApi = async (id) => {
  const response = await httpRequest.get(`/user/${id}`);
  return response;
};

const deleteUserApi = async (id) => {
  const response = await httpRequest.delete(`/user/${id}`);
  return response;
};
export { loginApi, getCustomersApi, getCustomerByIdApi, deleteUserApi };

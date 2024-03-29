import { ResponseApi } from "../../interfaces/responseInterface";
import { LoginData } from "../../interfaces/userInterface";
import httpRequest from "../http";

type LoginResponse = ResponseApi<LoginData>;
const loginApi = async (data: { email: string; password: string }) => {
  const response = await httpRequest.post<LoginResponse>("user/login", data);
  return response;
};
const registerApi = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const response = await httpRequest.post("/user/register", data);
  return response;
};
const logoutApi = async () => {
  const response = await httpRequest.get("/user/logout");
  return response;
};
const resetPasswordApi = async (data: { email: string }) => {
  const response = await httpRequest.get("/user/forgot-password", {
    params: data,
  });
  return response;
};

const forgotPasswordApi = async (data: {
  resetToken: string;
  password: string;
}) => {
  const response = await httpRequest.post("/user/reset-password", data);
  return response;
};
const getUserApi = async (id: number) => {
  const response = await httpRequest.get(`user/${id} `);
  return response;
};

const updateUserApi = async (
  id: number,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    dob?: Date;
    gender?: string;
  }
) => {
  const response = await httpRequest.put(`user/${id}`, data);
  return response;
};

const uploadAvatarApi = async (file: FormData, id: number) => {
  const response = await httpRequest.put(`user/upload-avatar/${id}`, file);
  return response;
};

export {
  loginApi,
  getUserApi,
  registerApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi,
  updateUserApi,
  uploadAvatarApi,
};

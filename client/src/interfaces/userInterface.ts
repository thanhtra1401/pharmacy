export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phone: string;
  gender: string;
  dob: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}
export interface LoginData {
  accessToken: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  gender: string;
  dob: string;
  phone: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}

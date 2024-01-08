import { LoginData } from "../interfaces/userInterface";

export const setLS = (name: string, token: string) => {
  localStorage.setItem(name, token);
};
export const getLS = (name: string) => {
  return localStorage.getItem(name);
};
export const clearLS = (name: string) => {
  localStorage.removeItem(name);
};
export function saveProfile(profile: LoginData) {
  localStorage.setItem("profile", JSON.stringify(profile));
}
export function getProfile() {
  const profile = localStorage.getItem("profile");
  return profile ? JSON.parse(profile) : null;
}
export const formatCurrency = (x: number) => {
  //return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  return Intl.NumberFormat().format(x);
};

export const convertSlug = (str: string) => {
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return str;
};

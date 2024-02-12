import { create } from "zustand";
import { getLS } from "../utils/function";

const authStore = create((set) => ({
  isAuthenticated: Boolean(getLS("access_token")),
  user_id: Boolean(getLS("user_id")),

  setUserId: (user_id) => set(() => ({ user_id: user_id })),
  setIsAuthenticated: () => set(() => ({ isAuthenticated: true })),
  logout: () => set(() => ({ isAuthenticated: false })),
}));

export { authStore };

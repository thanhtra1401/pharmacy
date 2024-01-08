import { create } from "zustand";
import { LoginData, User } from "../interfaces/userInterface";
import { getLS, getProfile } from "../utils/function";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: LoginData) => void;
  logout: () => void;
  setUser: (user: LoginData) => void;
}
///const userStr = getLS("user");
const authStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(getLS("access_token")),
  user: getProfile(),
  setUser: (user: User) => set(() => ({ user: user })),
  login: (user: User) => set(() => ({ isAuthenticated: true, user: user })),
  logout: () => set(() => ({ isAuthenticated: false, user: null })),
}));
export default authStore;

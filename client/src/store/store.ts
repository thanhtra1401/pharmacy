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
interface ProductState {
  cart_id: number;
  product_id: number;
  setProductId: (product_id: number) => void;
  setCartId: (cart_id: number) => void;
}

const productStore = create<ProductState>((set) => ({
  cart_id: -1,
  product_id: -1,
  setProductId: (product_id: number) => set(() => ({ product_id: product_id })),
  setCartId: (cart_id: number) => set(() => ({ cart_id: cart_id })),
}));
export { productStore };
export default authStore;

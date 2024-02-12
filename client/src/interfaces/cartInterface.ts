import { Product } from "./productInterface";

export interface Cart {
  id: number;
  customerId: number;
  totalPrice: number;
  CartDetails: CartDetail[];
}

export interface CartDetail {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  selected: boolean;
  Product: Product;
}

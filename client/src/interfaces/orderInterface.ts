import { Address } from "./addressInterface";
import { Product } from "./productInterface";

export interface Order {
  id?: number;
  payment?: number;
  howReceive?: number;
  totalPrice: number;
  status?: number;
  customerId?: number;
  addressId?: number;
  shipFee?: number;
  createdAt?: Date;
  updatedAt?: Date;
  OrderDetails: OrderDetail[];
  Address?: Address;
}

export interface OrderDetail {
  id?: number;
  orderId: number;
  productId: number;
  amount: number;
  price: number;
  Product: Product;
}

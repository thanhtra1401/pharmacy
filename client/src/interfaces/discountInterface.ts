import { Product } from "./productInterface";

export interface Discount {
  id: number;
  name: string;
  description: string;
  discountPercent: number;
  startAt: Date;
  endAt: Date;
}
export interface DiscountDetailProduct {
  id: number;
  discountId: number;
  productId: number;
  active: boolean;
  discountProgram: Discount;
  Product: Product;
}

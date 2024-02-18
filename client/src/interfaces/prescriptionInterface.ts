import { Product } from "./productInterface";

export interface Prescription {
  id: number;
  image: string;
  note: string;
  status: number;
  customerId: number;
  createdAt: Date;
  PrescriptionDetails: PrescriptionDetail[] | [];
}
export interface PrescriptionDetail {
  id: number;
  prescriptionId: number;
  productId: number;
  amount: number;
  Product: Product;
}

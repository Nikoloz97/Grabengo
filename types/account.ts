import { CartItem } from "./menu";

export interface Order {
  id: number;
  orderDate: Date;
  items: CartItem[];
  totalAmount: number;
  status: "paid" | "pending" | "refunded";
}

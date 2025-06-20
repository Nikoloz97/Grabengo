import { Item } from "./menu";

export interface CartItem extends Item {
  quantity: number;
}

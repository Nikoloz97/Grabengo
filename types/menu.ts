export interface Item {
  id: number;
  name: string;
  image: string;
  price: number;
  calories: number;
  protein: number;
  description?: string;
}

export interface CartItem extends Item {
  quantity: number;
}

export interface Category {
  name: string;
  items: Item[];
}

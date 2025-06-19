export interface Item {
  name: string;
  image: string;
  description: string;
  price: number;
  calories: number;
  protein: number;
}

export interface Category {
  name: string;
  items: Item[];
}

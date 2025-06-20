import { Category } from "@/types/menu";

export const menuCategories: Category[] = [
  {
    name: "Shakes",
    items: [
      {
        id: 1,
        name: "Vanilla Banana",
        image: "https://placehold.co/100x100/text=VanillaBanana",
        description: "Banana, Vanilla, and Peanut Butter",
        price: 9.0,
        calories: 100,
        protein: 35,
      },
      {
        id: 2,
        name: "Matcha Energizer",
        image: "https://placehold.co/100x100/text=MatchaEnergizer",
        description: "Matcha, Banana, Vanilla, and Peanut Butter",
        price: 9.0,
        calories: 100,
        protein: 35,
      },
      {
        id: 3,
        name: "Blueberry-Banana-Acai",
        image: "https://placehold.co/100x100/text=Blueberry-Banana-Acai",
        description: "Blueberries, Banana, and Strawberry Acai",
        price: 9.0,
        calories: 100,
        protein: 32,
      },
    ],
  },
  {
    name: "Smoothies",
    items: [
      {
        id: 4,
        name: "Mango-Berry Blast",
        image: "https://placehold.co/100x100/text=Mango-BerryBlast",
        description: "Strawberry, Mango, Honey and Orange Juice",
        price: 9.0,
        calories: 220,
        protein: 5,
      },
      {
        id: 5,
        name: "California Bliss",
        image: "https://placehold.co/100x100/text=California-Bliss",
        description:
          "Strawberry, Blueberry, Fat-Free Greek Yogurt and Orange Juice",
        price: 9.0,
        calories: 205,
        protein: 5,
      },
      {
        id: 6,
        name: "Green Energizer",
        image: "https://placehold.co/100x100/text=Green-Energizer",
        description:
          "Pineapple, Spinach, Honey, Banana and Green Matcha Powder",
        price: 9.0,
        calories: 262,
        protein: 5,
      },
    ],
  },

  {
    name: "Beverages & Desserts",
    items: [
      {
        id: 7,
        name: "Iced Matcha Green Tea",
        image: "https://placehold.co/100x100/text=Iced-Matcha-Green-Tea",
        description: "Almond Milk, Matcha Powder and Honey",
        price: 5.5,
        calories: 220,
        protein: 5,
      },
      {
        id: 8,
        name: "Protein Chocolate Chip Cookie",
        image:
          "https://placehold.co/100x100/text=Protein-Chocolate-Chip-Cookie",
        description: "Butter, Coconut Sugar, Oat Flour, Whey Protein, Aquafaba",
        price: 4.75,
        calories: 205,
        protein: 25,
      },
    ],
  },
];

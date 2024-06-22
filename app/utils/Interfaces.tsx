export interface productData {
  name: string;
  category: string;
  description: string;
  prices: {
    "60g": number;
    "120g": number;
  };
  images: string[];
  thumbnail: string;
  guide: string;
  suitable: string;
  ingredients: string;
}

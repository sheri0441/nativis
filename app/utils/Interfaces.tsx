export interface productData {
  name: string;
  category: string;
  description: string;
  price: {
    "60g": number;
    "120g": number;
  };
  images: string[];
  thumbnail: string;
  guide: string;
  suitable: string;
  ingredient: string;
  id: string;
}

export interface ProductCardType {
  name: string;
  thumbnail: string;
  id: string;
  price: {
    size: string;
  };
}

export interface BlogCardType {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  createdAt: Date;
  likes: number;
}

export interface categoriesType {
  name: string;
}

export interface ProductPageData {
  current: number;
  total: number;
  products: ProductCardType[];
  categories: categoriesType[];
}

export interface BlogPageData {
  current: number;
  total: number;
  blogs: BlogCardType[];
  categories: categoriesType[];
}

export interface SearchResultItem {
  name?: string;
  title?: string;
  thumbnail: string;
  category: string;
  id: string;
}

export interface SearchResultList {
  list: SearchResultItem[];
  total: number;
}

export interface ProductDetailPageData {
  product: productData;
  relatedProducts: ProductCardType[];
  otherProducts: ProductCardType[];
}

export interface UserType {
  id: string;
  name: string;
  image: string;
  email: string;
  provider: string;
}

export interface CartItemType {
  id: string;
  quantity: number;
  size?: string;
}

export interface CartItemFetchType {
  name: string;
  id: string;
  thumbnail: string;
  quantity: number;
  price: string;
}

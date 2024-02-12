interface Product {
  id: number;
  name: string;
  slug: string;
  shortDes: string;
  description: string;
  priceWithDiscount: number;
  price: number;
  amount: number;
  intendedUse: string;
  howToUse: string;
  sideEffects: string;
  country: string;
  ingredient: string;
  origin: string;
  lotNumber: number;
  manufactureDate: Date;
  expiriedDate: Date;
  unit: string;
  image?: string;
  images: Image[] | [];
  discountList: DiscountList[] | [];
  categoryId: number;
  Category?: {
    name: string;
  };
}

interface Image {
  url: string;
}
interface Discount {
  id: number;
  discountPercent: number;
  startAt: Date;
  endAt: Date;
}
interface DiscountList {
  active: boolean;
  minAmount: number;
  maxAmount: number;
  discountProgram: Discount;
}

type productListConfig = {
  page?: number | string;
  size?: number | string;
  name?: string;
  sort_by?: "createdAt" | "view" | "sold" | "price";
  order?: "asc" | "desc";
  category?: string;
  slugCat?: string;
  parentCatSlug?: string;
};

type PaginationResponse = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  children: Category[];
  parent: Category;
  parentId?: number;
}
export type { Product, productListConfig, Category, PaginationResponse };

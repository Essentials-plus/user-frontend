import { ExtendMeal } from "./meal";

export type ProductAttribute = {
  productId: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
};

export type ProductAttributeTerm = {
  id: string;
  name: string;
  slug: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  sortOrder: number;
  productAttributeId: string;
  productVariationId: string | null;
};

// export type ProductType = {
//   id: string;
//   name: string;
//   slug: string;
//   description: string;
//   salePrice: number;
//   regularPrice: number;
//   images: string[];
//   stock: number;
//   type: "simple" | "variable";
// };

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  salePrice: any;
  regularPrice: any;
  images: string[];
  stock: any;
  type: "simple" | "variable";
  createdAt: string;
  updatedAt: string;
  variations: Variation[];
  attributes: Attribute[];
  attributeTerms: AttributeTerm[];
  longDescription: string | null;
  faqs?:
    | {
        id: string;
        title: string;
        content: string;
      }[]
    | undefined;
  specs?:
    | {
        value: string;
        id: string;
        label: string;
      }[]
    | undefined;
  linkedProduct: ProductType | null;
}

export type WeeklyMenuRaw = {
  id: string;
  week: number;
  createdAt: string;
  updatedAt: string;
};

export interface Variation {
  id: string;
  termIds: string[];
  salePrice: number;
  regularPrice: number;
  stock: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

export interface Attribute {
  id: string;
  name: string;
  slug: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  terms: AttributeTerm[];
}

export interface AttributeTerm {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  productAttributeId: string;
  productId: string;
  productVariationId: any;
}

export type ProductCart = {
  id?: string;
  count: number;
  product: ProductType;
  productId: string;
  variationId?: string;
};

export type ProductOrder = {
  id: string;
  amount: number;
  couponId: string | undefined;
  products: ProductCart[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  status: string;
};

export type MealsForTheWeek = {
  id: string;
  day: number;
  meals: ExtendMeal[];
  planOrderId: string;
  createdAt: string;
  updatedAt: string;
};

export type PlanOrder = {
  id: string;
  week: number;
  mealsForTheWeek: MealsForTheWeek[];
  createdAt: string;
  updatedAt: string;
  planId: string;
  status: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  sortOrder: number;
};

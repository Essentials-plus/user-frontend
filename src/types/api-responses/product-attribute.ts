import {
  CouponPolicyEnum,
  CouponStatusEnum,
  CouponTypeEnum,
} from "@/types/api-responses/coupon-code";
import { Product } from "@/types/api-responses/product";
import { ProductTaxPercentType } from "@/types/api-responses/tax";
import { User } from "@/types/api-responses/users";
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
  linkedProducts: Product[];
  highestPrice: number | null;
  lowestPrice: number | null;
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
  image: string | null;
  imageSameAsVariationId: string | null;
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
  orderId: string;
  amount: number;
  coupon: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: CouponStatusEnum;
    name: string;
    code: string;
    type: CouponTypeEnum;
    value: number;
    policy: CouponPolicyEnum;
  } | null;
  couponId: string | undefined;
  shippingAddress: {
    nr: string;
    city: string;
    name: string;
    mobile: string;
    address: string;
    surname: string;
    zipCode: string;
    addition: string;
  };
  user: User;
  orderItems: {
    id: string;
    orderId: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    taxPercent: ProductTaxPercentType;
    attributes: {
      productVariations?: {
        attribute: {
          id: string;
          name: string;
          slug: string;
          createdAt: string;
          productId: string;
          updatedAt: string;
        };
        attributeTerm: {
          id: string;
          name: string;
          slug: string;
          createdAt: string;
          sortOrder: number;
          updatedAt: string;
          productAttributeId: string;
          productVariationId: string | null;
        };
      }[];
    };
    image: string;
    variationId: string | null;
    createdAt: string;
    updatedAt: string;
  }[];
  shippingAmount: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  status: "completed" | "processing" | "unpaid";
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
  totalAmount: number;
};

export type ProductCategory = {
  id: string;
  name: string;
  description: string | null;
  image: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  sortOrder: number;
};

export type ProductVariation = {
  id: string;
  salePrice: number | null;
  regularPrice: number | null;
  stock: number | null;
  lowStockThreshold: number | null;
  createdAt: Date;
  updatedAt: Date;
  productId: string | null;
  termIds: string[];
  image: string | null;
};

import { ApiResponseSuccessBase } from "@/types/api-responses";
import { Meal } from "@/types/api-responses/meal";
import { Product } from "@/types/api-responses/product";
import {
  ProductAttribute,
  ProductAttributeTerm,
  ProductCategory,
  ProductType,
  WeeklyMenuRaw,
} from "@/types/api-responses/product-attribute";
import { AxiosRequestConfig } from "axios";
import publicApiClient from "..";

export const getProductsQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-products", axiosReqConfig || null],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<ProductType[]>>(`/product`, axiosReqConfig)
        .then((res) => res.data),
  };
};

export const getProductsForProductsPageQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-products-for-products-page", axiosReqConfig || null],
    queryFn: () =>
      publicApiClient
        .get<
          ApiResponseSuccessBase<{
            data: ProductType[];
            filters: {
              subCategories: ProductCategory[];
              categories: ProductCategory[];
              productAttributes: (ProductAttribute & {
                terms: (ProductAttributeTerm & { products: Product[] })[];
              })[];
              maxPrice: number;
            };
          }>
        >(`/product/products-page`, axiosReqConfig)
        .then((res) => res.data),
  };
};

export const getSingleProductQueryOptions = (slug: string) => {
  return {
    queryKey: ["get-single-product", slug],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<ProductType>>(`/product/slug/${slug}`)
        .then((res) => res.data),
    enabled: !!slug,
  };
};

export const getWeeklyNumberQueryOptions = () => {
  return {
    queryKey: ["get-weekly-number"],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<WeeklyMenuRaw[]>>(`/meal/weeklymeal/raw`)
        .then((res) => res.data),
  };
};

export const getUnauthenticatedWeeklyMealsQueryOptions = ({
  week,
  mealType,
}: {
  week: number;
  mealType?: string | null;
}) => {
  return {
    queryKey: ["get-unauthenticated-weekly-meals", week, mealType],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      publicApiClient
        .get<ApiResponseSuccessBase<Meal[]>>(
          `/meal/weeklymeal/unauthenticated`,
          {
            params: { week, limit: 8, page: pageParam, mealType },
          },
        )
        .then((res) => res.data),
    getNextPageParam: (_: any, pages: ApiResponseSuccessBase<Meal[]>[]) => {
      const lastPage = pages.at(-1)?.meta;

      if (!lastPage) return null;

      if (lastPage?.isLastPage) return null;

      return lastPage?.currentPage + 1;
    },
    initialPageParam: 1,
  };
};

export const getAddressByZipcodeQueryOptions = ({
  houseNumber,
  zipCode,
  skipDbCheck,
  isValid = true,
}: {
  zipCode: string;
  houseNumber: string | number;
  skipDbCheck?: boolean;
  isValid?: boolean;
}) => {
  return {
    queryKey: ["get-address-by-zipcode", zipCode, houseNumber, skipDbCheck],
    queryFn: () =>
      publicApiClient
        .get<
          ApiResponseSuccessBase<{
            postcode: string;
            number: number;
            street: string;
            city: string;
            municipality: string;
            province: string;
            location: {
              type: string;
              coordinates: [5.0824818, 51.5591287];
            };
          }>
        >(`/zipcode/${zipCode}/${houseNumber}`, {
          params: {
            skipDbCheck,
          },
        })
        .then((res) => res.data),
    enabled: !!zipCode && !!houseNumber && !!isValid,
  };
};

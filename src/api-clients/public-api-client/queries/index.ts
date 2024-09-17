import { ApiResponseSuccessBase } from "@/types/api-responses";
import { Meal } from "@/types/api-responses/meal";
import {
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
    queryKey: ["get-products", axiosReqConfig],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<ProductType[]>>(`/product`, axiosReqConfig)
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

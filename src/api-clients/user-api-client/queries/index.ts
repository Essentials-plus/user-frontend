import publicApiClient from "@/api-clients/public-api-client";
import { MealOrder } from "@/constants/meal-order";
import { ApiResponseSuccessBase } from "@/types/api-responses";
import { ExtendMeal, Meal } from "@/types/api-responses/meal";
import {
  PlanOrder,
  ProductCart,
  ProductCategory,
  ProductOrder,
  ProductType,
} from "@/types/api-responses/product-attribute";
import { User } from "@/types/api-responses/users";
import { AxiosRequestConfig } from "axios";
import { userApiClient } from "..";

export const getUserQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-user", axiosReqConfig],
    queryFn: () =>
      userApiClient
        .get<ApiResponseSuccessBase<User>>(`/user`, axiosReqConfig)
        .then((res) => res.data),
  };
};

export const getProductCartQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-product-cart", axiosReqConfig],
    queryFn: () =>
      userApiClient
        .get<ApiResponseSuccessBase<ProductCart[]>>(
          `/product/cart`,
          axiosReqConfig,
        )
        .then((res) => res.data),
  };
};

export const getHomeMealsQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-meals", axiosReqConfig],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<Meal[]>>(`/meal/home`, axiosReqConfig)
        .then((res) => res.data),
  };
};

export const getWeeklyMealQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-weekly-meals", axiosReqConfig],
    queryFn: () =>
      userApiClient
        .get<
          ApiResponseSuccessBase<
            ExtendMeal[],
            { isOrder: boolean; orderHistory: PlanOrder | null }
          >
        >(`/meal`, axiosReqConfig)
        .then((res) => res.data),
  };
};

export const getOrderHistoryQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-orders-history", axiosReqConfig],
    queryFn: () =>
      userApiClient
        .get<ApiResponseSuccessBase<ProductOrder[]>>(`/order`, axiosReqConfig)
        .then((res) => res.data),
  };
};
export const getPlanOrderQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-plan-order", axiosReqConfig],
    queryFn: () =>
      userApiClient
        .get<ApiResponseSuccessBase<PlanOrder[]>>(`/plan/order`, axiosReqConfig)
        .then((res) => res.data),
  };
};

export const getCategoryQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-product-category", axiosReqConfig],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<ProductCategory[]>>(
          `/product/categories`,
          axiosReqConfig,
        )
        .then((res) => res.data),
  };
};

export const getHomePageBannerProductsQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-home-page-banner-products", axiosReqConfig],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<ProductType[]>>(
          `/product/home-page-banner-products`,
          axiosReqConfig,
        )
        .then((res) => res.data),
  };
};

export const getMealOrderByIdQueryOptions = ({ id }: { id: string }) => {
  return {
    queryKey: ["get-meal-order", id],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<MealOrder>>(`/plan/order/${id}`)
        .then((res) => res.data),
    enabled: !!id,
  };
};

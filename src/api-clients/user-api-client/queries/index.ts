import guestApiClient from "@/api-clients/guest-api-client";
import publicApiClient from "@/api-clients/public-api-client";
import { MealOrder } from "@/constants/meal-order";
import { ApiResponseSuccessBase } from "@/types/api-responses";
import { ExtendMeal, Meal } from "@/types/api-responses/meal";
import { Product, ProductReview } from "@/types/api-responses/product";
import {
  PlanOrder,
  ProductCart,
  ProductCategory,
  ProductOrder,
  ProductType,
} from "@/types/api-responses/product-attribute";
import { SpotlightsProductBanner } from "@/types/api-responses/spotlights-product-banner";
import { User } from "@/types/api-responses/users";
import { AxiosRequestConfig } from "axios";
import { userApiClient } from "..";

export const getUserQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-user", axiosReqConfig || null],
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
    queryKey: ["get-product-cart", axiosReqConfig || null],
    queryFn: () =>
      guestApiClient
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
    queryKey: ["get-meals", axiosReqConfig || null],
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
    queryKey: ["get-weekly-meals", axiosReqConfig || null],
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
    queryKey: ["get-orders-history", axiosReqConfig || null],
    queryFn: () =>
      userApiClient
        .get<ApiResponseSuccessBase<ProductOrder[]>>(`/order`, axiosReqConfig)
        .then((res) => res.data),
  };
};

export const getOrderHistoryByIdQueryOptions = ({ id }: { id: string }) => {
  return {
    queryKey: ["get-order-history", id],
    queryFn: () =>
      userApiClient
        .get<ApiResponseSuccessBase<ProductOrder>>(`/order/${id}`)
        .then((res) => res.data),
    enabled: !!id,
  };
};

export const getPlanOrderQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-plan-order", axiosReqConfig || null],
    queryFn: () =>
      userApiClient
        .get<ApiResponseSuccessBase<PlanOrder[]>>(`/plan/order`, axiosReqConfig)
        .then((res) => res.data),
  };
};

export const getPlanOrderByIdQueryOptions = ({ id }: { id: string }) => {
  return {
    queryKey: ["get-plan-order", id],
    queryFn: () =>
      userApiClient
        .get<ApiResponseSuccessBase<PlanOrder>>(`/plan/order/${id}`)
        .then((res) => res.data),
    enabled: !!id,
  };
};

export const getCategoryQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-product-category", axiosReqConfig || null],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<ProductCategory[]>>(
          `/product/categories`,
          axiosReqConfig,
        )
        .then((res) => res.data),
  };
};

export const getBestSellerProductsQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-best-seller-products", axiosReqConfig || null],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<ProductType[]>>(
          `/product/best-seller-products`,
          axiosReqConfig,
        )
        .then((res) => res.data),
  };
};
export const getCartRecommendationProductsQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-cart-recommendation-products", axiosReqConfig || null],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<ProductType[]>>(
          `/product/cart-recommendation-products`,
          axiosReqConfig,
        )
        .then((res) => res.data),
  };
};

export const getSearchProductsQueryOptions = ({
  axiosReqConfig,
}: {
  axiosReqConfig?: AxiosRequestConfig;
} = {}) => {
  return {
    queryKey: ["get-search-products", axiosReqConfig || null],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<Product[]>>(
          `/product/search`,
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

export const getSpotlightsProductBannersQueryOptions = () => {
  return {
    queryKey: ["get-spotlights-product-banners"],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<SpotlightsProductBanner[]>>(
          `/spotlights-product-banners`,
        )
        .then((res) => res.data),
  };
};

export const getRawDataByIdentifierQueryOptions = ({
  identifier,
}: {
  identifier: string;
}) => {
  return {
    queryKey: ["get-raw-data-by-identifier", identifier],
    queryFn: () =>
      publicApiClient
        .get<ApiResponseSuccessBase<any>>(`/raw-data/${identifier}`)
        .then((res) => res.data),
    enabled: !!identifier,
  };
};

export const getCanGiveReviewQueryOptions = ({
  productId,
}: {
  productId: string;
}) => {
  return {
    queryKey: ["get-can-give-review", productId],
    queryFn: () =>
      userApiClient
        .get<ApiResponseSuccessBase<{ status: boolean }>>(
          `/product/reviews/${productId}/can-give-review`,
        )
        .then((res) => res.data),
    enabled: !!productId,
  };
};

export const getProductReviewsQueryOptions = ({
  productId,
  axiosReqConfig,
}: {
  productId: string;
  axiosReqConfig?: AxiosRequestConfig;
}) => {
  return {
    queryKey: ["get-product-reviews", productId, axiosReqConfig || null],
    queryFn: () =>
      publicApiClient
        .get<
          ApiResponseSuccessBase<{
            reviews: ProductReview[];
            averageRating: number | null;
          }>
        >(`/product/reviews/${productId}`, axiosReqConfig)
        .then((res) => res.data),
    enabled: !!productId,
  };
};

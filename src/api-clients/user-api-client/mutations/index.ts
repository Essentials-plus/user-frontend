import guestApiClient from "@/api-clients/guest-api-client";
import { userApiClient } from "@/api-clients/user-api-client";
import { ShippingAddressValidationSchema } from "@/pages/checkout";
import { ProductReview } from "@/types/api-responses/product";
import { ReviewFormSchema } from "@/views/single-product/components/product-review-form";

export const getCreateProductPaymentSessionLinkMutationOptions = () => {
  return {
    mutationKey: ["create-product-payment-session-link"],
    mutationFn: (data: {
      couponCode?: string;
      saveAddressForLater?: boolean;
      shippingAddress: ShippingAddressValidationSchema;
    }) => guestApiClient.post("/order/payment/session", data),
  };
};

export const getCreateProductReviewMutationOptions = () => {
  return {
    mutationKey: ["create-product-review"],
    mutationFn: ({
      productId,
      body,
    }: {
      productId: string;
      body: ReviewFormSchema;
    }) =>
      userApiClient.post<ProductReview>(`/product/reviews/${productId}`, body),
  };
};

export const getCreateUnpaidOrderSessionMutationOptions = () => {
  return {
    mutationKey: ["create-unpaid-order-session"],
    mutationFn: ({ orderId }: { orderId: string }) =>
      userApiClient.post(`/order/pay-unpaid/${orderId}`),
  };
};

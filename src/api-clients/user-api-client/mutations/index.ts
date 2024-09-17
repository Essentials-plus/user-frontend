import { userApiClient } from "@/api-clients/user-api-client";

export const getCreateProductPaymentSessionLinkMutationOptions = () => {
  return {
    mutationKey: ["create-product-payment-session-link"],
    mutationFn: () => userApiClient.post("/order/payment/session"),
  };
};

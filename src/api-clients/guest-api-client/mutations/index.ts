import guestApiClient from "@/api-clients/guest-api-client";

export const updateGuestEmailMutationOptions = () => {
  return {
    mutationKey: [],
    mutationFn: (body: { email: string; guestId: string }) =>
      guestApiClient.post("/product/update-guest-email", body),
  };
};

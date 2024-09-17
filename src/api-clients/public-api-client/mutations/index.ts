import { LoginSchema } from "@/lib/schemas";
import publicApiClient from "@/api-clients/public-api-client";
import { ApiResponseSuccessBase } from "@/types/api-responses";

export const getUserLoginMutationOptions = () => {
  return {
    mutationKey: ["user-login"],
    mutationFn: (data: LoginSchema) =>
      publicApiClient.post<ApiResponseSuccessBase<string>>(
        "/auth/user/login",
        data
      ),
  };
};

import { getUserQueryOptions } from "@/api-clients/user-api-client/queries";
import { useUserSession } from "@/hooks/useUserSession";
import { getClientErrorMsg } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "sonner";

const useStartToday = () => {
  const router = useRouter();

  const { user: authUser } = useUserSession();

  const { data } = useQuery(getUserQueryOptions());

  const handleMealOrder = useCallback(
    async ({ replaceRoute }: { replaceRoute?: boolean } = {}) => {
      if (!data?.data) return;

      try {
        const user = data.data;

        if (
          !user.age ||
          !user.gender ||
          !user.zipCode ||
          !user.goal ||
          !user.height ||
          !user.customer
        ) {
          toast.error("U heeft de gebruiker nog niet bijgewerkt");
          (await replaceRoute)
            ? router.replace("/onboarding/credentials")
            : router.push("/onboarding/credentials");
          return;
        }
        //
        if (!user.plan) {
          toast.error("Je hebt het menu nog niet geselecteerd");
          (await replaceRoute)
            ? router.replace("/onboarding/menu")
            : router.push("/onboarding/menu");
          return;
        }

        if (user.plan && user.plan.status == "pending") {
          toast.error("U heeft de betaling nog niet bevestigd");
          (await replaceRoute)
            ? router.replace(`/onboarding/payment`)
            : router.push(`/onboarding/payment`);
          return;
        }
      } catch (error) {
        toast.error(getClientErrorMsg(error));
      }
    },
    [data?.data, router],
  );

  const handleStartToday = useCallback(
    async ({ replaceRoute }: { replaceRoute?: boolean } = {}) => {
      if (!authUser) {
        return replaceRoute
          ? await router.replace("/register")
          : await router.push("/register");
      }
      if (authUser && authUser.access == "product") {
        return await handleMealOrder({ replaceRoute });
      }
      if (authUser && authUser.access == "all") {
        return replaceRoute
          ? await router.replace("/weekly-menu")
          : await router.push("/weekly-menu");
      }
    },
    [handleMealOrder, router, authUser],
  );

  return { handleStartToday };
};

export default useStartToday;

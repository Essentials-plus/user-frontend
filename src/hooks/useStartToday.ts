import { getUserQueryOptions } from "@/api-clients/user-api-client/queries";
import routes, { registerRouteWithRedirectToOnboarding } from "@/config/routes";
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
            ? router.replace(routes.onboarding("credentials"))
            : router.push(routes.onboarding("credentials"));
          return;
        }
        //
        if (!user.plan) {
          toast.error("Je hebt het menu nog niet geselecteerd");
          (await replaceRoute)
            ? router.replace(routes.onboarding("menu"))
            : router.push(routes.onboarding("menu"));
          return;
        }

        if (user.plan && user.plan.status == "pending") {
          toast.error("U heeft de betaling nog niet bevestigd");
          (await replaceRoute)
            ? router.replace(routes.onboarding("payment"))
            : router.push(routes.onboarding("payment"));
          return;
        }

        (await replaceRoute)
          ? router.replace(routes.weeklyMenu)
          : router.push(routes.weeklyMenu);
        return;
      } catch (error) {
        toast.error(getClientErrorMsg(error));
      }
    },
    [data?.data, router],
  );

  const handleStartToday = useCallback(
    async ({ replaceRoute }: { replaceRoute?: boolean } = {}) => {
      console.log({ authUser, access: authUser?.access });
      if (!authUser) {
        return replaceRoute
          ? await router.replace(registerRouteWithRedirectToOnboarding)
          : await router.push(registerRouteWithRedirectToOnboarding);
      }
      if (authUser && authUser.access === "product") {
        return await handleMealOrder({ replaceRoute });
      }
      if (authUser && authUser.access === "all") {
        return replaceRoute
          ? await router.replace(routes.weeklyMenu)
          : await router.push(routes.weeklyMenu);
      }
    },
    [handleMealOrder, router, authUser],
  );

  return { handleStartToday };
};

export default useStartToday;

import { userApiClient } from "@/api-clients/user-api-client";
import { getUserQueryOptions } from "@/api-clients/user-api-client/queries";
import SettingsPageLayout from "@/common/components/settings-page-layout";
import Button from "@/common/components/ui/button";
import Spinner from "@/common/components/ui/spinner";
import routes from "@/config/routes";
import { useUserSession } from "@/hooks/useUserSession";
import { getClientErrorMsg } from "@/lib/utils";
import JouGegevens from "@/views/meal-box-settings/JouGegevens";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmationModal from "../confimation-modal";

const MealBoxSettings = () => {
  const { data, isLoading, refetch } = useQuery(getUserQueryOptions());

  const planStatus = data?.data?.plan?.status;

  const { user: u } = useUserSession();

  const [loading, setLoading] = useState(false);
  const cancelSubscription = async (onClose: () => any) => {
    if (loading) return;
    try {
      setLoading(true);
      await userApiClient.delete("/plan/cancel");
      await refetch();
      setLoading(false);
      toast.success("Abonnement opgezegd");
      onClose();
    } catch (error) {
      setLoading(false);
      toast.error(getClientErrorMsg(error));
    }
  };

  const reactiveSubscription = async (onClose: () => any) => {
    if (loading) return;
    try {
      setLoading(true);
      await userApiClient.post("/plan/active");
      await refetch();
      setLoading(false);
      toast.success("Abonnement opnieuw geactiveerd");
      onClose();
    } catch (error) {
      setLoading(false);
      toast.error(getClientErrorMsg(error));
    }
  };

  const router = useRouter();

  const [lloading, setLLoading] = useState(false);

  const handleMealOrder = async () => {
    if (!data?.data) return;
    if (lloading) return;

    try {
      setLLoading(true);
      const user = data.data;

      if (
        !user.age ||
        !user.gender ||
        !user.zipCode?.zipCode ||
        !user.goal ||
        !user.height
      ) {
        toast.error("U heeft de gebruiker nog niet bijgewerkt");
        await router.push(routes.onboarding("credentials"));
        return;
      }

      if (!user.plan) {
        toast.error("Je hebt het menu nog niet geselecteerd");
        await router.push(routes.onboarding("menu"));
        return;
      }

      if (user.plan && user.plan.status == "pending") {
        toast.error("U heeft de betaling nog niet bevestigd");
        await router.push(routes.onboarding(`payment`));
        return;
      }

      setLLoading(false);
    } catch (error) {
      toast.error(getClientErrorMsg(error));
      setLLoading(false);
    }
  };

  // const viewOnStripeMutation = useMutation({
  //   mutationKey: ["view-on-stripe"],
  //   mutationFn: () =>
  //     userApiClient.post<ApiResponseSuccessBase<{ url: string }>>(
  //       "/plan/view-on-stripe",
  //     ),
  //   onSuccess(data) {
  //     window.location.href = data.data.data.url;
  //   },
  // });

  return (
    <SettingsPageLayout title="Instellingen">
      {isLoading || !data ? (
        <div className="flex h-[300px] items-center justify-center">
          <div className="size-6">
            <Spinner />
          </div>
          Bezig met laden...
        </div>
      ) : (
        <div className="rounded-xl border border-app-dark-grey bg-app-grey p-5 lg:rounded-3xl lg:border-2 lg:px-10 lg:py-8">
          <h2 className="text-lg font-semibold text-app-black lg:text-4xl">
            {planStatus === "active" && "Actieve"}
            {planStatus === "canceled" && "Annuleer"} Maaltijdboxen
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold lg:text-xl">
                Essentials+ Maaltijdbox
              </h4>
              <p className="my-1.5 text-app-black max-lg:text-sm">
                {data?.data?.address}, {data?.data?.city},{" "}
                {data?.data?.zipCode?.zipCode}
              </p>
              {/* <div className="flex items-center gap-x-3">
              <IDealIcon className="w-8" />
              <p>H. Baydar - NL76***********5386</p>
            </div> */}
            </div>
            {u?.access == "product" ? (
              <Button className="max-md:text-sm" onClick={handleMealOrder}>
                Maaltijd bestellen
              </Button>
            ) : (
              <>
                {planStatus == "active" ? (
                  <div className="flex justify-end gap-2">
                    <ConfirmationModal
                      header="Abonnement opzeggen"
                      description="Weet u zeker dat u het abonnement wilt opzeggen? U kunt het opnieuw activeren"
                      onConfirm={cancelSubscription}
                      loading={loading}
                      // loading={true}
                    >
                      <Button className="max-lg:px-4 max-md:text-sm">
                        Annuleer of pauzeer mijn maaltijdbox
                      </Button>
                    </ConfirmationModal>

                    {/* <Button
                      size={"sm"}
                      onClick={() => viewOnStripeMutation.mutate()}
                      loading={viewOnStripeMutation.isPending}
                    >
                      View on Stripe
                    </Button> */}
                  </div>
                ) : (
                  <ConfirmationModal
                    header="Reactive Subscription"
                    description="Are you sure you want to active subscription? you can cancel anytime"
                    onConfirm={reactiveSubscription}
                    loading={loading}
                  >
                    <Button>Reactief mijn maaltijdbox</Button>
                  </ConfirmationModal>
                )}
              </>
            )}
          </div>
          <div className="mt-8">
            <JouGegevens />
          </div>
        </div>
      )}
    </SettingsPageLayout>
  );
};

export default MealBoxSettings;

import { userApiClient } from "@/api-clients/user-api-client";
import { getUserQueryOptions } from "@/api-clients/user-api-client/queries";
import SettingsPageLayout from "@/common/components/settings-page-layout";
import Button from "@/common/components/ui/button";
import Spinner from "@/common/components/ui/spinner";
import { useUserSession } from "@/hooks/useUserSession";
import { getClientErrorMsg } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmationModal from "../confimation-modal";
import JouGegevens from "./JouGegevens";

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
        await router.push("/onboarding/credentials");
        return;
      }

      if (!user.plan) {
        toast.error("Je hebt het menu nog niet geselecteerd");
        await router.push("/onboarding/menu");
        return;
      }

      if (user.plan && user.plan.status == "pending") {
        toast.error("U heeft de betaling nog niet bevestigd");
        await router.push(`/onboarding/payment`);
        return;
      }

      setLLoading(false);
    } catch (error) {
      toast.error(getClientErrorMsg(error));
      setLLoading(false);
    }
  };

  return (
    <SettingsPageLayout title="Instellingen">
      {isLoading || !data ? (
        <div className="flex items-center justify-center h-[300px]">
          <div className="h-6 w-6">
            <Spinner />
          </div>
          Bezig met laden...
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-app-dark-grey px-10 py-8 bg-app-grey">
          <h2 className="text-4xl font-semibold text-app-black">
            {planStatus === "active" && "Actieve"}
            {planStatus === "canceled" && "Annuleer"} Maaltijdboxen
          </h2>
          <div className="mt-8 flex items-center justify-between">
            <div>
              <h4 className="text-xl font-bold">Essentials+ Maaltijdbox</h4>
              <p className="my-1.5 text-app-black">
                {data?.data?.address}, {data?.data?.city},{" "}
                {data?.data?.zipCode?.zipCode}
              </p>
              {/* <div className="flex items-center gap-x-3">
              <IDealIcon className="w-8" />
              <p>H. Baydar - NL76***********5386</p>
            </div> */}
            </div>
            {u?.access == "product" ? (
              <Button onClick={handleMealOrder}>Maaltijd bestellen</Button>
            ) : (
              <>
                {planStatus == "active" ? (
                  <ConfirmationModal
                    header="Abonnement opzeggen"
                    description="Weet u zeker dat u het abonnement wilt opzeggen? U kunt het opnieuw activeren"
                    onConfirm={cancelSubscription}
                    loading={loading}
                    // loading={true}
                  >
                    <Button>Annuleer of pauzeer mijn maaltijdbox</Button>
                  </ConfirmationModal>
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

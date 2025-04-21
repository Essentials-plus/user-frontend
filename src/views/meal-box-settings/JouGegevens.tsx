import { getUserQueryOptions } from "@/api-clients/user-api-client/queries";
import MealPlansBrakdown from "@/common/components/MealPlansBrakdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { activityLevels, genders, goals } from "@/constants/form-select-data";
import useActiveCurrency from "@/hooks/useActiveCurrency";
import useTotalCalorie from "@/hooks/useTotalCalorie";
import { calculateUserCalorie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useMemo, useState } from "react";
import JouGevenesUpdateModal from "./JouGevenesUpdateModal";

export default function JouGegevens() {
  const { currency_symbol } = useActiveCurrency();

  const { data } = useQuery(getUserQueryOptions());
  const userData = data?.data;

  const plan = userData?.plan;

  const totalRequiredCalorie = useTotalCalorie(userData!);

  const [openJouGevenesModal, setOpenJouGevenesModal] =
    useState<boolean>(false);

  const { totalPrice } = useMemo(() => {
    if (!plan) return { totalPrice: 0, totalKcal: 0 };

    const totalKcal = (totalRequiredCalorie || 0) * plan.numberOfDays;
    const totalPrice = Number(
      (
        totalKcal * Number(process.env.NEXT_PUBLIC_CALORIE_PRICE || 0.0055)
      ).toFixed(2),
    );
    return {
      totalKcal,
      totalPrice,
    };
  }, [totalRequiredCalorie, plan]);

  const jouGegeves = [
    {
      name: userData?.age,
      label: "Leeftijd",
    },
    {
      name: userData?.weight,
      label: "Gewicht (kg)",
    },
    {
      name: userData?.height,
      label: "Lengte",
    },
    {
      name: genders.find((option) => option.value === userData?.gender)?.label,
      label: "Geslacht",
    },
    {
      name: activityLevels.find(
        (option) => option.value === userData?.activityLevel,
      )?.label,
      label: "Activiteitenniveau",
    },
    {
      name: goals.find((option) => option.value === userData?.goal)?.label,
      label: "Doel",
    },
    // {
    //   name: userData?.address,
    //   label: "Straatnaam",
    // },
  ];
  const totalKcalNeed =
    (calculateUserCalorie(userData as any) || 0) *
    (userData?.plan?.numberOfDays ?? 0);
  return (
    <>
      <div className="flex flex-col gap-[20px] gap-y-8">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <h1 className="font-bold">Jou gegevens:</h1>
          <button
            onClick={() => setOpenJouGevenesModal(true)}
            className="text-app-dark-green underline"
          >
            Gegevens bijwerken
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto,300px]">
          <div>
            <div className="grid grid-cols-1 gap-[16px] 2xl:grid-cols-2">
              {jouGegeves.map((item, index) => (
                <div key={`ud${index}`} className="flex flex-col gap-[8px]">
                  <label htmlFor="" className="font-medium">
                    {item.label}:
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={() => {}}
                    className="truncate rounded-[8px] p-[8px_16px] focus:outline-none"
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-3xl border border-black p-5">
              {plan ? (
                <>
                  <h4 className="text-base font-bold">Bestel overzicht:</h4>
                  <div className="mt-2.5 flex items-center gap-x-5">
                    <Image
                      src={"/imgs/afbeelding.png"}
                      alt="afbeelding"
                      width={288}
                      height={192}
                      className="max-w-[96px]"
                    />
                    <p>
                      {plan?.numberOfDays} dagen met {plan?.mealsPerDay}{" "}
                      maaltijden per dag.
                    </p>
                  </div>
                  <p className="mb-2.5 border-b border-app-dark-grey pb-2.5 pt-1">
                    {plan.numberOfDays} dagen -{" "}
                    {plan.numberOfDays * plan.mealsPerDay} maaltijden
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <p>Prijs per week:</p>
                    <p>
                      {currency_symbol}
                      {totalPrice}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <p>Bezorgkosten:</p>
                    <p>
                      {currency_symbol}
                      {process.env.NEXT_PUBLIC_SHIPPING_CHARGE}
                    </p>
                  </div>
                  {/* <a
              href="#"
              className="inline-block my-2 text-app-dark-green underline"
            >
              Heb je een kortingscode?
            </a> */}
                  <div className="my-4 h-px w-full bg-app-dark-grey"></div>
                  <div className="flex items-center justify-between bg-[#f3f3f3] text-lg">
                    <p> Totaal eerst box:</p>{" "}
                    <p>
                      {currency_symbol}
                      {(totalPrice + 5.99).toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between bg-[#f3f3f3] text-lg">
                    <p>Total kCal:</p> <p>{Math.round(totalKcalNeed)} kCal</p>
                  </div>
                </>
              ) : (
                <p className="py-8 text-center">
                  Je hebt nog steeds geen abonnement gekocht
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <MealPlansBrakdown
            mealsPerDay={plan?.mealsPerDay || 1}
            totalRequiredCalorie={totalKcalNeed}
          />
        </div>
      </div>

      {/* <Modal
        title="Gegevens bijwerken"
        isOpen={openJouGevenesModal}
        onClose={() => setOpenJouGevenesModal(false)}
      >
        <JouGevenesUpdateModal
          data={data?.data}
          onClose={() => setOpenJouGevenesModal(false)}
        />
      </Modal> */}

      <Dialog
        open={openJouGevenesModal}
        onOpenChange={() => setOpenJouGevenesModal(false)}
      >
        <DialogContent className="max-w-3xl max-md:p-5">
          <DialogHeader>
            <DialogTitle>Profiel bijwerken</DialogTitle>
          </DialogHeader>
          <JouGevenesUpdateModal
            data={data?.data}
            onClose={() => setOpenJouGevenesModal(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

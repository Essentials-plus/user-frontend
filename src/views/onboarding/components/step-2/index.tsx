import { userApiClient } from "@/api-clients/user-api-client";
import MealPlansBrakdown from "@/common/components/MealPlansBrakdown";
import NumberOfMealDays from "@/common/components/NumberOfMealDays";
import NumberOfMealsPerDay from "@/common/components/NumberOfMealsPerDay";
import Button from "@/common/components/ui/button";
import useTotalCalorie from "@/hooks/useTotalCalorie";
import { getClientErrorMsg } from "@/lib/utils";
import { User } from "@/types/api-responses/users";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

const fiveMealPlans = [
  {
    mealType: "breakfast",
    label: "Ontbijt:",
    mealPercentage: 21,
  },
  {
    mealType: "snacks1",
    label: "Snack 1:",
    mealPercentage: 9,
  },
  {
    mealType: "lunch",
    label: "Lunch:",
    mealPercentage: 30,
  },
  {
    mealType: "dinner",
    label: "Diner:",
    mealPercentage: 31,
  },
  {
    mealType: "snacks2",
    label: "Snack 2:",
    mealPercentage: 9,
  },
];

export const sixMealPlans = [
  {
    mealType: "breakfast",
    label: "Ontbijt:",
    mealPercentage: 18,
  },
  {
    mealType: "snacks1",
    label: "Snack 1",
    mealPercentage: 9,
  },
  {
    mealType: "lunch",
    label: "Lunch",
    mealPercentage: 27,
  },
  {
    mealType: "snacks2",
    label: "Snack 2:",
    mealPercentage: 9,
  },
  {
    mealType: "dinner",
    label: "Diner:",
    mealPercentage: 28,
  },
  {
    mealType: "snacks3",
    label: "Snack 3:",
    mealPercentage: 9,
  },
];

export const fourMealPlans = [
  {
    mealType: "lunch",
    label: "Lunch:",
    mealPercentage: 30,
  },
  {
    mealType: "snacks1",
    label: "Snack 1:",
    mealPercentage: 15,
  },
  {
    mealType: "dinner",
    label: "Diner:",
    mealPercentage: 40,
  },
  {
    mealType: "snacks2",
    label: "Snack 2:",
    mealPercentage: 15,
  },
];

export const mealPlans = (mealsPerDay: number) => {
  if (mealsPerDay == 5) {
    return fiveMealPlans;
  } else if (mealsPerDay == 6) {
    return sixMealPlans;
  } else {
    return fourMealPlans;
  }
};

export const getMealPlans = (mealsPerDay: number, kcal: number) => {
  return mealPlans(mealsPerDay).map((mealPlan) => {
    return {
      ...mealPlan,
      kCalNeed: Number(((kcal / 100) * mealPlan.mealPercentage).toFixed(0)),
    };
  });
};

type Props = {
  user: User;
};
const Step2 = ({ user }: Props) => {
  const [numberOfDays, setNumberOfDays] = useState(6);
  const [mealsPerDay, setMealsPerDay] = useState(6);

  const totalRequiredCalorie = useTotalCalorie(user);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async () => {
    if (loading) return;
    try {
      setLoading(true);

      const token = getCookie("temp_auth");

      const { data } = await userApiClient.post(
        "/plan",
        {
          numberOfDays,
          mealsPerDay,
        },
        {
          headers: {
            authorization: token,
          },
        },
      );

      const clientSecret = data.client_secret;

      await router.push(`/onboarding/payment?clientSecret=${clientSecret}`);

      toast.success("Plan gemaakt");

      setLoading(false);
    } catch (err) {
      toast.error(getClientErrorMsg(err));
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="__h3 font-bold">Uw maaltijd wensen: </h3>
      <p className="mt-2.5 text-base font-bold text-app-text">
        Zodra u bent aangemeld, heeft u de mogelijkheid om uw gezin toe te
        voegen
      </p>

      <div className="mt-6">
        <NumberOfMealDays
          value={numberOfDays}
          onValueChange={setNumberOfDays}
        />
      </div>

      <div className="mt-6">
        <NumberOfMealsPerDay
          value={mealsPerDay}
          onValueChange={setMealsPerDay}
        />
      </div>

      <hr className="border-t border-black my-8 w-full" />

      <div className="grid grid-cols-[auto,280px] gap-x-5">
        <MealPlansBrakdown
          mealsPerDay={mealsPerDay}
          totalRequiredCalorie={totalRequiredCalorie || 0}
        />

        <div className="flex items-end">
          <div>
            <div className="rounded-3xl border border-black py-5 px-6">
              <p className="text-base font-bold">Je caloriebehoefte</p>

              <div className="mt-2">
                <p className="text-2xl font-bold text-app-darker-green">
                  {totalRequiredCalorie ? (
                    <span className="underline">
                      {totalRequiredCalorie * numberOfDays}
                    </span>
                  ) : (
                    "_____"
                  )}{" "}
                  kcal
                </p>
              </div>
            </div>
            <div className="mt-5">
              <Button loading={loading} className="w-full" onClick={onSubmit}>
                Stel het menu samen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;

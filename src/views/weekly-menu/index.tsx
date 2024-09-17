import { getWeeklyNumberQueryOptions } from "@/api-clients/public-api-client/queries";
import { userApiClient } from "@/api-clients/user-api-client";
import {
  getUserQueryOptions,
  getWeeklyMealQueryOptions,
} from "@/api-clients/user-api-client/queries";
import MealCard from "@/common/components/meal-card";
import Button from "@/common/components/ui/button";
import Spinner from "@/common/components/ui/spinner";
import useClientRefetch from "@/hooks/useClientRefetch";
import {
  getClientErrorMsg,
  getDateFromDayAndWeek,
  rootWeekNumber,
  sortMealsByMealType,
} from "@/lib/utils";
import { ExtendMeal } from "@/types/api-responses/meal";
import { PlanOrder } from "@/types/api-responses/product-attribute";
import { User } from "@/types/api-responses/users";
import HeroSection from "@/views/weekly-menu/components/hero-section";
import MealsForPublicUsers from "@/views/weekly-menu/components/meals-for-public-users";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { mealPlans } from "../onboarding/components/step-2";
import SelectedDays from "./components/selected-days";

const WeeklyMenu = () => {
  const { data: weeklyMenuRawData, isLoading: menuRawLoading } = useQuery(
    getWeeklyNumberQueryOptions(),
  );

  const [weekNumber, setWeekNumber] = useState(rootWeekNumber);

  const weeklyNumber = useMemo(() => {
    return (
      weeklyMenuRawData?.data.map((v) => v.week).sort((a, b) => a - b) || [
        rootWeekNumber,
      ]
    );
  }, [weeklyMenuRawData]);

  const { data: userData, isLoading: userLoading } = useQuery(
    getUserQueryOptions(),
  );

  const { data: weeklyMeal, isLoading: weeklyMealLoading } = useQuery(
    getWeeklyMealQueryOptions({
      axiosReqConfig: {
        params: {
          week: weekNumber,
        },
      },
    }),
  );

  return (
    <>
      {userLoading || weeklyMealLoading || menuRawLoading ? (
        <div className="w-full">
          <div className="w-full h-[85vh] flex items-center justify-center">
            <div className="p-[20px] flex items-center gap-4 text-2xl rounded justify-center">
              <Spinner className="size-10" /> Bezig met laden...
            </div>
          </div>
        </div>
      ) : (
        (!userData || !weeklyMeal || !weeklyMenuRawData) && (
          <MealsForPublicUsers weekNumberList={weeklyNumber} />
        )
      )}

      {userData && weeklyMenuRawData && weeklyMeal && (
        <WeeklyMenuComponent
          weeklyNumbers={weeklyNumber}
          weekNumber={weekNumber}
          onWeekChange={(w) => setWeekNumber(w)}
          meals={weeklyMeal?.data || []}
          user={userData.data}
          isOrder={weeklyMeal.isOrder}
          orderHistory={weeklyMeal.orderHistory}
        />
      )}
    </>
  );
};

type Props = {
  meals: ExtendMeal[];
  user: User;
  weekNumber: number;
  weeklyNumbers: number[];
  // eslint-disable-next-line no-unused-vars
  onWeekChange: (w: number) => any;
  isOrder: boolean;
  orderHistory: PlanOrder | null;
};

function WeeklyMenuComponent({
  meals,
  user,
  onWeekChange,
  weekNumber,
  weeklyNumbers,
  isOrder,
  orderHistory,
}: Props) {
  const [selectedDay, setSelectedDay] = useState(1);

  const [selectedMeals, setSelectedMeals] = useState(
    generateRandomMeals(user, meals),
  );

  useEffect(() => {
    setSelectedMeals(generateRandomMeals(user, meals));
  }, [user, meals, weekNumber]);

  const totalDays = user.plan.numberOfDays;

  const currentDayMeals = useMemo(() => {
    return selectedMeals.find((v) => v.day == selectedDay)?.meals;
  }, [selectedMeals, selectedDay]);

  // selectedMeals[0].meals[0].ingredients[0].quantity
  const handleMealSwap = (swapMeal: ExtendMeal) => {
    const prevSelectedMeals = [...selectedMeals];

    const newSelectedMeals = prevSelectedMeals.map((v) => {
      if (v.day == selectedDay) {
        v.meals = v.meals.map((m) => {
          if (m.meal == swapMeal.meal) {
            m = swapMeal;
          }
          return m;
        });
      }
      return v;
    });

    setSelectedMeals(newSelectedMeals);
  };

  const totalNeedOfData = useMemo(() => {
    const totalNeedOfData = {
      totalNeedOfCarbohydrates: 0,
      totalNeedOfFats: 0,
      totalNeedOfFiber: 0,
      totalNeedOfKCal: 0,
      totalNeedOfProteins: 0,
    };
    selectedMeals.forEach((v) => {
      if (selectedDay === v.day) {
        v.meals.forEach((m) => {
          totalNeedOfData.totalNeedOfCarbohydrates =
            totalNeedOfData.totalNeedOfCarbohydrates +
            m.totalNeedOfCarbohydrates;
          totalNeedOfData.totalNeedOfFats =
            totalNeedOfData.totalNeedOfFats + m.totalNeedOfFats;
          totalNeedOfData.totalNeedOfFiber =
            totalNeedOfData.totalNeedOfFiber + m.totalNeedOfFiber;
          totalNeedOfData.totalNeedOfKCal =
            totalNeedOfData.totalNeedOfKCal + m.totalNeedOfKCal;
          totalNeedOfData.totalNeedOfProteins =
            totalNeedOfData.totalNeedOfProteins + m.totalNeedOfProteins;
        });
      }
    });

    return totalNeedOfData;
  }, [selectedMeals, selectedDay]);

  const confirmOrderWeek = user.plan.confirmOrderWeek;

  const [loading, setLoading] = useState(false);
  const clientRefetch = useClientRefetch();

  const onOrderConfirm = async () => {
    if (loading) return;
    try {
      setLoading(true);

      const newSelectedMeals = selectedMeals.map((v) => ({
        ...v,
        meals: v.meals.map((m) => ({ id: m.id })),
      }));

      await userApiClient.post("/plan/order/confirm", newSelectedMeals);
      await clientRefetch(["get-user"]);
      await clientRefetch(["get-weekly-meals"]);
      toast.success("Order bevestigd");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(getClientErrorMsg(err));
    }
  };

  // const lockdownDate = getLockdownDate(user.lockdownDay, weekNumber);
  const lockdownDate = getDateFromDayAndWeek(
    user.zipCode?.lockdownDay!,
    weekNumber,
  );

  const isButtonAvailable = useMemo(() => {
    return selectedMeals.every((e) => e.meals.length);
  }, [selectedMeals]);

  return (
    <>
      <HeroSection
        weeklyNumbers={weeklyNumbers}
        weekNumber={weekNumber}
        onWeekChange={onWeekChange}
        totalNeedOfData={totalNeedOfData}
        lockdownDate={lockdownDate}
      />
      <section className="my-[100px]">
        {orderHistory ? (
          <MealOrderHistory data={orderHistory} />
        ) : (
          <div className="container">
            <SelectedDays
              activeDay={selectedDay}
              onDayClick={(d) => setSelectedDay(d)}
              totalDays={totalDays}
            />
            <div className="grid grid-cols-2 gap-6 mt-20">
              {currentDayMeals && currentDayMeals.length > 0 ? (
                currentDayMeals.map((v) => (
                  <MealCard
                    key={v.id}
                    meal={v}
                    swapMeals={meals}
                    onMealSwap={handleMealSwap}
                  />
                ))
              ) : (
                <div>Er is geen maaltijd voor de dag</div>
              )}
            </div>
            {isButtonAvailable && (
              <div className="mt-12 flex justify-end">
                {isOrder ? (
                  <Button onClick={onOrderConfirm} loading={loading}>
                    Bezorg mijn box
                  </Button>
                ) : (
                  <>
                    {weekNumber !== confirmOrderWeek ? (
                      <div>
                        Deze week kunt u niet bestellen, selecteer week{" "}
                        {confirmOrderWeek}
                      </div>
                    ) : (
                      <div>Wacht alstublieft tot volgende week</div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}

function generateRandomMeals(user: User, meals: ExtendMeal[]) {
  const numberOfDays = user.plan.numberOfDays;
  const mealsPerDay = user.plan.mealsPerDay;

  const selectedMeals = [...Array(numberOfDays)].map((_, i) => ({
    day: i + 1,
    meals: mealPlans(mealsPerDay)
      .map((mp) => {
        const filterMeals = meals.filter((m) => m.meal == mp.mealType);
        const randomIndex = Math.floor(Math.random() * filterMeals.length);
        return filterMeals[randomIndex];
      })
      .filter((v) => v != undefined),
  }));

  return selectedMeals;
}

const MealOrderHistory = ({ data }: { data: PlanOrder }) => {
  let totalDays = data.mealsForTheWeek.length;

  const [selectedDay, setSelectedDay] = useState(1);

  const currentDayMeals = useMemo(() => {
    return data.mealsForTheWeek.find((v) => v.day == selectedDay)?.meals;
  }, [data, selectedDay]);

  return (
    <div className="container">
      <SelectedDays
        activeDay={selectedDay}
        onDayClick={(d) => setSelectedDay(d)}
        totalDays={totalDays}
      />
      <div className="grid grid-cols-2 gap-6 mt-20">
        {currentDayMeals && currentDayMeals.length > 0 ? (
          sortMealsByMealType(currentDayMeals).map((v, i) => (
            <MealCard key={"hello" + i} meal={v} />
          ))
        ) : (
          <div>Er is geen maaltijd voor de dag</div>
        )}
      </div>
    </div>
  );
};

export default WeeklyMenu;

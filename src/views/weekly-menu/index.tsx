import { getWeeklyNumberQueryOptions } from '@/api-clients/public-api-client/queries';
import { userApiClient } from '@/api-clients/user-api-client';
import {
  getUserQueryOptions,
  getWeeklyMealQueryOptions,
} from '@/api-clients/user-api-client/queries';
import MealCard from '@/common/components/meal-card';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/common/components/ui/alert';
import Button from '@/common/components/ui/button';
import Spinner from '@/common/components/ui/spinner';
import useClientRefetch from '@/hooks/useClientRefetch';
import {
  currentISOWeek,
  getClientErrorMsg,
  getNextLockdownDate,
  sortMealsByMealType,
} from '@/lib/utils';
import { ExtendMeal } from '@/types/api-responses/meal';
import { PlanOrder } from '@/types/api-responses/product-attribute';
import { User } from '@/types/api-responses/users';
import HeroSection from '@/views/weekly-menu/components/hero-section';
import MealsForPublicUsers from '@/views/weekly-menu/components/meals-for-public-users';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { mealPlans } from '../onboarding/components/step-2';
import SelectedDays from './components/selected-days';

const WeeklyMenu = () => {
  const { data: weeklyMenuRawData, isLoading: menuRawLoading } = useQuery(
    getWeeklyNumberQueryOptions(),
  );

  const [weekNumber, setWeekNumber] = useState(currentISOWeek);

  const weeklyNumber = useMemo(() => {
    return (
      weeklyMenuRawData?.data.map((v) => v.week).sort((a, b) => a - b) || [
        currentISOWeek,
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
          <div className="flex h-[85vh] w-full items-center justify-center">
            <div className="flex items-center justify-center gap-4 rounded p-[20px] text-2xl">
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
  console.log({ isOrder });
  const [selectedDay, setSelectedDay] = useState(1);

  const [selectedMeals, setSelectedMeals] = useState(() =>
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

    if (orderHistory) {
      orderHistory.mealsForTheWeek.forEach((v) => {
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
    } else {
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
    }

    return totalNeedOfData;
  }, [orderHistory, selectedDay, selectedMeals]);

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

      await userApiClient.post('/plan/order/confirm', newSelectedMeals, {
        params: {
          week: weekNumber,
        },
      });
      await clientRefetch(['get-user']);
      await clientRefetch(['get-weekly-meals']);
      toast.success('Order bevestigd');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(getClientErrorMsg(err));
    }
  };

  // const lockdownDate = getLockdownDate(user.lockdownDay, weekNumber);
  const lockdownDate = getNextLockdownDate(user.zipCode?.lockdownDay!);

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
      <section className="my-7 lg:my-[100px]">
        {orderHistory ? (
          <MealOrderHistory
            data={orderHistory}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        ) : (
          <div className="container">
            <SelectedDays
              activeDay={selectedDay}
              onDayClick={(d) => setSelectedDay(d)}
              totalDays={totalDays}
            />
            <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-2">
              {currentDayMeals && currentDayMeals.length > 0 ? (
                sortMealsByMealType(currentDayMeals).map((v) => (
                  <MealCard
                    key={v.id}
                    meal={v}
                    swapMeals={meals}
                    onMealSwap={handleMealSwap}
                  />
                ))
              ) : (
                <div className="col-span-2 py-5 text-center text-red-600">
                  Er is geen maaltijd voor de dag
                </div>
              )}
            </div>
            {isButtonAvailable && (
              <div className="mt-8 flex justify-end lg:mt-12">
                {isOrder ? (
                  <Button onClick={onOrderConfirm} loading={loading}>
                    Bezorg mijn box
                  </Button>
                ) : (
                  <>
                    <OrderNotification
                      confirmOrderWeek={confirmOrderWeek}
                      weekNumber={weekNumber}
                    />
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

interface OrderNotificationProps {
  weekNumber: number;
  confirmOrderWeek: number;
}
function OrderNotification({
  weekNumber,
  confirmOrderWeek,
}: OrderNotificationProps) {
  console.log({ confirmOrderWeek, weekNumber });
  if (weekNumber !== confirmOrderWeek) {
    return (
      <Alert className="border-yellow-200 bg-yellow-50">
        <Calendar className="size-5 text-yellow-600" />
        <AlertTitle className="text-yellow-700">
          Bestelling niet mogelijk
        </AlertTitle>
        <AlertDescription>
          Deze week kunt u niet bestellen. Selecteer week{' '}
          <span className="font-semibold">{confirmOrderWeek}</span> om uw
          bestelling te plaatsen.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive" className="border-red-200 bg-red-50">
      <Clock className="size-5 text-red-600" />
      <AlertTitle className="text-red-700">Even geduld</AlertTitle>
      <AlertDescription>
        Wacht alstublieft tot volgende week om uw bestelling te plaatsen.
      </AlertDescription>
    </Alert>
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

const MealOrderHistory = ({
  data,
  selectedDay,
  setSelectedDay,
}: {
  data: PlanOrder;
  selectedDay: number;
  setSelectedDay: (d: number) => void;
}) => {
  let totalDays = data.mealsForTheWeek.length;

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
      <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-2">
        {currentDayMeals && currentDayMeals.length > 0 ? (
          sortMealsByMealType(currentDayMeals).map((v, i) => (
            <MealCard key={v.id + i} meal={v} />
          ))
        ) : (
          <div>Er is geen maaltijd voor de dag</div>
        )}
      </div>

      <div className="mt-8 flex justify-end lg:mt-12">
        <Alert className="border-blue-200 bg-blue-50">
          <Calendar className="size-5 text-blue-600" />
          <AlertTitle className="text-blue-700">
            U heeft al een bestelling geplaatst voor week{' '}
            <span className="font-semibold">{data.week}</span>
          </AlertTitle>
          <AlertDescription>
            U kunt uw bestelling niet meer wijzigen. Neem contact op met de
            klantenservice als u hulp nodig heeft.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default WeeklyMenu;

import { getHomeMealsQueryOptions } from "@/api-clients/user-api-client/queries";
import StartTotdayButton from "@/common/components/start-totday-button";
import {
  FilterInputSelect,
  FilterSearchSelect,
} from "@/common/components/ui/select";
import Spinner from "@/common/components/ui/spinner";
import { activityLevels, genders, goals } from "@/constants/form-select-data";
import { homeTabs } from "@/constants/home-tabs";
import { FilterFormSchema, filterFormSchema } from "@/lib/schemas";
import { calculateUserCalorie } from "@/lib/utils";
import { ExtendMeal, Ingredient, Meal } from "@/types/api-responses/meal";
import { UserGenderEnum } from "@/types/api-responses/users";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Tabs from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { SVGProps, useMemo } from "react";
import { useForm } from "react-hook-form";

export const TabSectionWrapper = () => {
  const { data: mealsData, isLoading } = useQuery(getHomeMealsQueryOptions());

  if (isLoading || !mealsData)
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );

  return <TabSection meals={mealsData?.data} />;
};

type Props = {
  meals: Meal[];
};

const TabSection = ({ meals }: Props) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<FilterFormSchema>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      activityLevel: "1.55",
      age: 30,
      gender: UserGenderEnum["male"],
      goal: "-500",
      height: 180,
      weight: 85,
    },
  });

  const values = watch();
  const userKcalForAWeek = useMemo(
    () => calculateUserCalorie(values),
    [values],
  );

  const filteredMeals: Record<string, ExtendMeal[]> | undefined =
    useMemo(() => {
      if (!userKcalForAWeek || !meals) return undefined;

      const mealTypes = ["dinner", "breakfast", "lunch", "snack"];
      const mealPercentages = {
        dinner: 28,
        breakfast: 18,
        lunch: 27,
        snack: 27,
      };

      return mealTypes.reduce((acc, type) => {
        acc[type] = meals
          .filter((meal) => meal.meal === type)
          .slice(0, 4)
          .map((meal) =>
            extendedMeal(
              meal,
              (userKcalForAWeek / 100) *
                mealPercentages[type as keyof typeof mealPercentages],
            ),
          );
        return acc;
      }, {} as Record<string, ExtendMeal[]>);
    }, [meals, userKcalForAWeek]);

  return (
    <>
      <div className="max-lg:px-5">
        <div className="relative z-50 mx-auto w-full max-w-[1132px] rounded-2xl lg:rounded-3xl border border-black bg-white px-4 py-5 sm:px-6 md:px-12 md:py-10 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col gap-y-6 lg:flex-row md:items-center sm:gap-x-5 lg:gap-x-10">
            <h3 className="shrink-0 font-oswald text-xl lg:text-2xl uppercase">
              Laten we starten
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-[1fr,1fr,100px,100px,100px,1fr] max-sm:gap-y-3 gap-4 md:gap-x-2.5 w-full">
              <FilterSearchSelect
                {...register("goal")}
                label="Doel:"
                error={errors.goal?.message?.toString()}
              >
                {goals.map((level, i) => (
                  <option value={level.value} key={i}>
                    {level.label}
                  </option>
                ))}
              </FilterSearchSelect>
              <FilterSearchSelect
                {...register("gender")}
                label="Geslacht:"
                error={errors.gender?.message?.toString()}
              >
                {genders.map((level, i) => (
                  <option value={level.value} key={i}>
                    {level.label}
                  </option>
                ))}
              </FilterSearchSelect>
              <FilterInputSelect
                {...register("age")}
                label="Leeftijd:"
                className="pr-5"
                error={errors.age?.message?.toString()}
                type="number"
              />
              <FilterInputSelect
                {...register("weight")}
                label="Gewicht (kg):"
                className="pr-5"
                error={errors.weight?.message?.toString()}
                type="number"
              />
              <FilterInputSelect
                {...register("height")}
                label="Lengte (cm):"
                className="pr-5"
                error={errors.height?.message?.toString()}
                type="number"
              />
              <FilterSearchSelect
                {...register("activityLevel")}
                label="Activiteit"
                error={errors.activityLevel?.message?.toString()}
              >
                {activityLevels.map((level, i) => (
                  <option value={level.value} key={i}>
                    {level.label}
                  </option>
                ))}
              </FilterSearchSelect>
            </div>
          </div>
          <p className="mt-4 text-right text-sm font-semibold text-app-black">
            Je calorie behoefte per dag is:{" "}
            {typeof userKcalForAWeek === "number" ? (
              <span className="text-base font-bold">
                {userKcalForAWeek.toFixed(2)}
              </span>
            ) : (
              "_____"
            )}{" "}
            kcal
          </p>
        </div>

        <section className="mt-10">
          <Tabs.Root orientation="horizontal" defaultValue="home-tab-1">
            <div className="container">
              <div className="mx-auto w-full max-w-[736px]">
                <Tabs.List className="flex justify-between gap-4">
                  {homeTabs.map(({ tabKey, trigger: { icon, title } }, i) => (
                    <Tabs.Trigger key={i} value={tabKey} className="group">
                      <div className="relative h-[100px] lg:h-[180px] text-[#C4C4C4]/[.85] group-data-[state=active]:text-app-darker-green">
                        <div className="mx-auto w-fit">{icon}</div>
                        <h5 className="mt-3 text-center font-oswald text-base sm:text-xl uppercase">
                          {title}
                        </h5>
                        <PolygonShape className="absolute bottom-0 left-0 hidden w-[80%] translate-y-px lg:w-full group-data-[state=active]:block" />
                      </div>
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </div>
            </div>

            <div className="relative isolate">
              <div className="absolute left-0 z-[-1] h-full w-full md:w-[calc(50%+634px+16px+76px)] max-lg:rounded-2xl lg:rounded-r-[80px] bg-app-grey"></div>
              <div className="container max-lg:px-2 py-2 lg:pb-10 lg:pt-[76px]">
                {homeTabs.map(({ tabKey, contentKey }, i) => (
                  <Tabs.Content key={i} value={tabKey}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-6 font-montserrat">
                      {filteredMeals?.[contentKey].map((m, cIndex) => (
                        <div
                          key={cIndex}
                          className="grid grid-cols-1 md:grid-cols-[350px,auto] lg:grid-cols-[200px,auto] items-center overflow-hidden rounded-xl lg:rounded-[20px] bg-white"
                        >
                          <div className="h-full">
                            <Image
                              src={m.image}
                              width={183}
                              height={174}
                              alt={m.mealName}
                              className="aspect-video lg:aspect-square w-full object-cover"
                            />
                          </div>

                          <div className="p-4 sm:p-5">
                            <h3 className="__h5 font-semibold lg:__h3">
                              {m.mealName}
                            </h3>
                            <div className="mt-2.5 lg:mt-6 flex flex-wrap sm:justify-between gap-x-7 lg:gap-x-4 gap-y-3">
                              {[
                                {
                                  label: "Calorie",
                                  value: `${m.totalNeedOfKCal} kcal`,
                                },
                                {
                                  label: "Proteine",
                                  value: `${m.totalNeedOfProteins} gr`,
                                },
                                {
                                  label: "Koolhydraten",
                                  value: `${m.totalNeedOfCarbohydrates} gr`,
                                },
                                {
                                  label: "Vetten",
                                  value: `${m.totalNeedOfFats} gr`,
                                },
                                {
                                  label: "Vezels",
                                  value: `${m.totalNeedOfFiber} gr`,
                                },
                              ].map((item, i) => (
                                <div key={i} className="flex flex-col">
                                  <p className="text-xs md:text-sm text-app-black">
                                    {item.label}
                                  </p>
                                  <p className="text-xs md:text-sm font-bold text-app-dark-blue mt-1">
                                    {item.value}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tabs.Content>
                ))}

                <div className="__c_all mt-2 lg:mt-12">
                  <StartTotdayButton className="max-sm:w-full" />
                </div>
              </div>
            </div>
          </Tabs.Root>
        </section>
      </div>
    </>
  );
};

export default TabSection;

const PolygonShape = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 73 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M36.1993 0C36.1993 0 36.8382 14 27.2601 26.5C17.6819 39 0.254613 45 0.254613 45H72.1439C72.1439 45 54.7174 38 45.1393 26.5C35.5611 15 36.1993 0 36.1993 0Z"
      fill="#F5F5F5"
    />
  </svg>
);

// const calculateIngredients = (ingredients: Ingredient[], kCalNeed: number) => {
//   const sumOfKCal = sumOf(ingredients, "kcal");
//   const sumOfProteins = sumOf(ingredients, "proteins");
//   const sumOfCarbohydrates = sumOf(ingredients, "carbohydrates");
//   const sumOfFats = sumOf(ingredients, "fats");
//   const sumOfFiber = sumOf(ingredients, "fiber");

//   const totalNeededServings = Math.round(kCalNeed / sumOfKCal);

//   const newIngredients = ingredients.map((i) => ({
//     ...i,
//     totalNeed: i.quantity * totalNeededServings,
//   }));

//   return {
//     sumOfKCal,
//     sumOfProteins,
//     sumOfCarbohydrates,
//     sumOfFats,
//     sumOfFiber,
//     ingredients: newIngredients,
//     totalNeededServings,
//   };
// };

const calculateIngredients = (ingredients: Ingredient[], kCalNeed: number) => {
  let sumOfKCal = 0;
  let sumOfProteins = 0;
  let sumOfCarbohydrates = 0;
  let sumOfFats = 0;
  let sumOfFiber = 0;

  ingredients.forEach((i) => {
    sumOfKCal += i.kcal;
    sumOfProteins += i.proteins;
    sumOfCarbohydrates += i.carbohydrates;
    sumOfFats += i.fats;
    sumOfFiber += i.fiber;
  });

  const totalNeededServings = Math.round(kCalNeed / sumOfKCal);

  const newIngredients = ingredients.map((i) => ({
    ...i,
    totalNeed: i.quantity * totalNeededServings,
  }));

  return {
    sumOfKCal,
    sumOfProteins,
    sumOfCarbohydrates,
    sumOfFats,
    sumOfFiber,
    ingredients: newIngredients,
    totalNeededServings,
  };
};

// const extendedMeal = (meal: Meal, kCalNeed: number): ExtendMeal => {
//   const { totalNeededServings, ...value } = calculateIngredients(
//     meal.ingredients,
//     kCalNeed,
//   );

//   return {
//     ...meal,
//     kCalNeed,
//     ingredients: value.ingredients,
//     totalNeedOfKCal: round(value.sumOfKCal * totalNeededServings),
//     totalNeedOfProteins: round(value.sumOfProteins * totalNeededServings),
//     totalNeedOfCarbohydrates: round(
//       value.sumOfCarbohydrates * totalNeededServings,
//     ),
//     totalNeedOfFats: round(value.sumOfFats * totalNeededServings),
//     totalNeedOfFiber: round(value.sumOfFiber * totalNeededServings),
//   };
// };

const extendedMeal = (meal: Meal, kCalNeed: number): ExtendMeal => {
  const { totalNeededServings, ...value } = calculateIngredients(
    meal.ingredients,
    kCalNeed,
  );

  return {
    ...meal,
    kCalNeed,
    ingredients: value.ingredients,
    totalNeedOfKCal: round(value.sumOfKCal * totalNeededServings),
    totalNeedOfProteins: round(value.sumOfProteins * totalNeededServings),
    totalNeedOfCarbohydrates: round(
      value.sumOfCarbohydrates * totalNeededServings,
    ),
    totalNeedOfFats: round(value.sumOfFats * totalNeededServings),
    totalNeedOfFiber: round(value.sumOfFiber * totalNeededServings),
  };
};

// const sumOf = <T, K extends keyof T>(array: T[], key: K) => {
//   return array?.reduce((previousValue, currentItem) => {
//     return previousValue + currentItem[key as never];
//   }, 0);
// };

const round = (number: number) => {
  return Math.round(number);
};

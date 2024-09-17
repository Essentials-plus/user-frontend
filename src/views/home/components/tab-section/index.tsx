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
      if (!userKcalForAWeek || !meals || !values) return undefined;

      return {
        dinner: meals
          .filter((v) => v.meal == "dinner")
          .slice(0, 4)
          .map((m) => extendedMeal(m, (userKcalForAWeek / 100) * 28)),
        breakfast: meals
          .filter((v) => v.meal == "breakfast")
          .slice(0, 4)
          .map((m) => extendedMeal(m, (userKcalForAWeek / 100) * 18)),
        lunch: meals
          .filter((v) => v.meal == "lunch")
          .slice(0, 4)
          .map((m) => extendedMeal(m, (userKcalForAWeek / 100) * 27)),
        snack: meals
          .filter(
            (v) =>
              v.meal == "snacks1" || v.meal == "snacks2" || v.meal == "snacks3",
          )
          .slice(0, 4)
          .map((m) => extendedMeal(m, (userKcalForAWeek / 100) * 27)),
      };
    }, [meals, userKcalForAWeek, values]);

  return (
    <>
      <div className="relative z-50 border border-black rounded-3xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)] bg-white max-w-[1132px] mx-auto px-12 py-10">
        <div className="flex items-center">
          <div className="flex items-center gap-x-10">
            <h3 className="font-oswald text-2xl uppercase shrink-0">
              Laten we starten
            </h3>
            <div className="grid grid-cols-[1fr,1fr,100px,100px,100px,1fr] gap-x-2.5">
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
        </div>
        <p className="text-right text-sm font-semibold text-app-black mt-2.5">
          Je calorie behoefte per dag is:{" "}
          {typeof userKcalForAWeek === "number" ? (
            <span className="font-bold text-base">
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
            <div className="max-w-[736px] w-full mx-auto">
              <Tabs.List className="w-full flex items-center justify-between">
                {homeTabs.map(({ tabKey, trigger: { icon, title } }, i) => (
                  <Tabs.Trigger key={i} value={tabKey} className="group">
                    <div className="relative h-[180px] group-data-[state=active]:text-app-darker-green text-[#C4C4C4]/[.85]">
                      <div className="">{icon}</div>
                      <h5 className="mt-3 uppercase text-xl font-oswald">
                        {title}
                      </h5>

                      <PolygonShape className="absolute bottom-0 left-0 w-full hidden group-data-[state=active]:block" />
                    </div>
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </div>
          </div>
          {/* <div className="pt-[76px] pb-10 bg-app-grey rounded-r-[80px] w-[90%] pr-[76px] flex justify-end">
         
        </div> */}
          <div className="relative isolate">
            <div className="absolute left-0 h-full w-[calc(50%+634px+16px+76px)] bg-app-grey z-[-1] rounded-r-[80px]"></div>
            <div className="container pt-[76px] pb-10">
              {homeTabs.map(({ content: { cards }, tabKey, contentKey }, i) => (
                <Tabs.Content key={i} value={tabKey}>
                  <div className="grid grid-cols-2 gap-8 font-montserrat">
                    {filteredMeals?.[contentKey].map((m, cIndex) => (
                      <div
                        key={cIndex}
                        className="bg-white overflow-hidden rounded-[20px] grid grid-cols-[200px,auto] items-center"
                      >
                        <div className="h-full">
                          <Image
                            src={m.image}
                            width={183}
                            height={174}
                            alt={m.mealName}
                            className="object-cover w-full aspect-square"
                          />
                        </div>

                        <div className="p-5">
                          <h3 className="__h3">{m.mealName}</h3>
                          <div className="mt-6 flex justify-between">
                            <div>
                              <p className="text-sm text-app-black">Calorie</p>
                              <p className="text-sm font-bold text-app-dark-blue mt-2">
                                {m.totalNeedOfKCal} kcal
                              </p>
                            </div>
                            <div className="w-px h-11 bg-app-grey"></div>
                            <div>
                              <p className="text-sm text-app-black">Proteine</p>
                              <p className="text-sm font-bold text-app-dark-blue mt-2">
                                {m.totalNeedOfProteins} gr
                              </p>
                            </div>
                            <div className="w-px h-11 bg-app-grey"></div>
                            <div>
                              <p className="text-sm text-app-black">
                                Koolhydraten
                              </p>
                              <p className="text-sm font-bold text-app-dark-blue mt-2">
                                {m.totalNeedOfCarbohydrates} gr
                              </p>
                            </div>
                            <div className="w-px h-11 bg-app-grey"></div>
                            <div>
                              <p className="text-sm text-app-black">Vetten</p>
                              <p className="text-sm font-bold text-app-dark-blue mt-2">
                                {m.totalNeedOfFats} gr
                              </p>
                            </div>
                            <div className="w-px h-11 bg-app-grey"></div>
                            <div>
                              <p className="text-sm text-app-black">Vezels</p>
                              <p className="text-sm font-bold text-app-dark-blue mt-2">
                                {m.totalNeedOfFiber} gr
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tabs.Content>
              ))}

              <div className="__c_all mt-12">
                <StartTotdayButton />
              </div>
            </div>
          </div>
        </Tabs.Root>
      </section>
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

const calculateIngredients = (ingredients: Ingredient[], kCalNeed: number) => {
  const sumOfKCal = sumOf(ingredients, "kcal");
  const sumOfProteins = sumOf(ingredients, "proteins");
  const sumOfCarbohydrates = sumOf(ingredients, "carbohydrates");
  const sumOfFats = sumOf(ingredients, "fats");
  const sumOfFiber = sumOf(ingredients, "fiber");

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

const sumOf = <T, K extends keyof T>(array: T[], key: K) => {
  return array?.reduce((previousValue, currentItem) => {
    return previousValue + currentItem[key as never];
  }, 0);
};

const round = (number: number) => {
  return Math.round(number);
};

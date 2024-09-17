import { getUnauthenticatedWeeklyMealsQueryOptions } from "@/api-clients/public-api-client/queries";
import Spinner from "@/common/components/ui/spinner";
import { mealTypeOptions } from "@/constants/meal";
import useFetchInfinitely from "@/hooks/useFetchInfinitely";
import { cn, getApiErrorMessage, rootWeekNumber } from "@/lib/utils";
import WeekNumbersSlider from "@/views/weekly-menu/components/week-numbers-slider";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useMemo, useState } from "react";

const MealsForPublicUsers = ({
  weekNumberList,
}: {
  weekNumberList: number[];
}) => {
  const [activeWeekNumber, setActiveWeekNumber] = useState(rootWeekNumber);
  const [activeMealType, setActiveMealType] = useState<string | null>(null);

  const unauthenticatedWeeklyMealsQuery = useInfiniteQuery({
    ...getUnauthenticatedWeeklyMealsQueryOptions({
      week: activeWeekNumber,
      mealType: activeMealType,
    }),
  });

  const { getRef } = useFetchInfinitely({
    enableFetchNextPage: unauthenticatedWeeklyMealsQuery.hasNextPage,
    onFetchNextPage: unauthenticatedWeeklyMealsQuery.fetchNextPage,
  });

  const meals = useMemo(
    () =>
      unauthenticatedWeeklyMealsQuery.data?.pages.flatMap(
        (page) => page.data,
      ) || [],
    [unauthenticatedWeeklyMealsQuery.data?.pages],
  );

  return (
    <>
      <div className="min-h-[calc(70vh)] flex items-center relative max-w-[100vw] overflow-x-hidden">
        <div className="container">
          <div className="max-w-[659px]">
            <h1 className="__h1 uppercase">Essentials Menu</h1>
            <p className="__body_25 mt-5 mb-10 uppercase text-black">
              Wekelijks varierende recepten. <br />
              Simpel thuis bezorgt!
            </p>
            <p className="__h2 mt-14 uppercase">WEEKmenu Van</p>

            <div className="mt-5 max-w-[500px]">
              <WeekNumbersSlider
                onWeekChange={setActiveWeekNumber}
                weekNumber={activeWeekNumber}
                weekNumberList={weekNumberList}
              />
            </div>

            <div className="mt-9">
              <h3 className="__h3 uppercase font-bold">categorieën</h3>
              <div className="mt-3 flex items-center gap-x-2">
                {mealTypeOptions.map((option) => (
                  <button
                    onClick={() =>
                      setActiveMealType((prev) =>
                        prev === option.value ? null : option.value,
                      )
                    }
                    key={option.value}
                    className={cn(
                      "h-9 border-2 text-base border-app-black rounded-lg px-4 __c_all",
                      activeMealType === option.value &&
                        "text-white bg-app-darker-green border-app-darker-green",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-[45%] h-full bg-app-darker-green overflow-hidden">
          <Image
            src={"/imgs/women-cooking.jpg"}
            alt="women-cooking"
            width={1039}
            height={840}
            className="h-full w-full object-cover "
          />
        </div>
      </div>

      <section className="my-[113px]">
        <div className="container grid grid-cols-4 gap-x-7 gap-y-10 font-montserrat">
          {meals.map((meal, i) => (
            <div key={meal.id} ref={getRef(i, meals)}>
              <Image
                src={meal.image}
                alt={meal.mealName}
                width={356}
                height={263}
                className="h-[210px] object-cover bg-app-grey"
              />
              <h4 className="__h4 mt-4 line-clamp-2">{meal.mealName}</h4>
              <p className="__body_16 text-app-text">{meal.shortDescription}</p>
              <div className="mt-5 flex items-center gap-x-2.5">
                <div className="flex items-center gap-x-2">
                  <ClockIcon />
                  <p className="text-sm font-medium">{meal.cookingTime}</p>
                </div>
                {meal.label && (
                  <div className="flex items-center gap-x-2.5">
                    <span className="opacity-60">•</span>
                    <p className="text-xs font-medium bg-[#E2FAFF] rounded-full px-2.5 py-[3px] text-[#318F8C]">
                      {meal.label}
                    </p>
                  </div>
                )}
                {meal.subLabel && (
                  <div className="flex items-center gap-x-2.5">
                    <span className="opacity-60">•</span>
                    <p className="text-xs font-medium">{meal.subLabel}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="container">
          <div className="pt-16">
            {unauthenticatedWeeklyMealsQuery.isError ? (
              <div className="__subtitle text-center text-red-600">
                {getApiErrorMessage(unauthenticatedWeeklyMealsQuery.error)}
              </div>
            ) : unauthenticatedWeeklyMealsQuery.isFetchingNextPage ||
              unauthenticatedWeeklyMealsQuery.isLoading ? (
              <div className="flex justify-center text-fuchsia">
                <Spinner className="size-7" />
              </div>
            ) : meals?.length <= 0 ? (
              <div className="__subtitle text-center text-fg-60">
                Geen maaltijden gevonden
              </div>
            ) : !unauthenticatedWeeklyMealsQuery.hasNextPage ? (
              <div className="__subtitle text-center text-fg-60">
                Geen maaltijden meer
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default MealsForPublicUsers;

const ClockIcon = () => {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0.25C9.375 0.25 10.6875 0.625 11.875 1.3125C13.0625 2 14 2.9375 14.6875 4.125C15.375 5.3125 15.75 6.625 15.75 8C15.75 9.40625 15.375 10.6875 14.6875 11.875C14 13.0625 13.0625 14.0312 11.875 14.7188C10.6875 15.4062 9.375 15.75 8 15.75C6.59375 15.75 5.3125 15.4062 4.125 14.7188C2.9375 14.0312 1.96875 13.0625 1.28125 11.875C0.59375 10.6875 0.25 9.40625 0.25 8C0.25 6.625 0.59375 5.3125 1.28125 4.125C1.96875 2.9375 2.9375 2 4.125 1.3125C5.3125 0.625 6.59375 0.25 8 0.25ZM8 14.25C9.125 14.25 10.1562 13.9688 11.125 13.4062C12.0625 12.8438 12.8438 12.0938 13.4062 11.125C13.9688 10.1875 14.25 9.125 14.25 8C14.25 6.875 13.9688 5.84375 13.4062 4.875C12.8438 3.9375 12.0625 3.15625 11.125 2.59375C10.1562 2.03125 9.125 1.75 8 1.75C6.875 1.75 5.8125 2.03125 4.875 2.59375C3.90625 3.15625 3.15625 3.9375 2.59375 4.875C2.03125 5.84375 1.75 6.875 1.75 8C1.75 9.125 2.03125 10.1875 2.59375 11.125C3.15625 12.0938 3.90625 12.8438 4.875 13.4062C5.8125 13.9688 6.875 14.25 8 14.25ZM9.9375 11C10 11.0625 10.0938 11.0938 10.2188 11.0625C10.3125 11.0625 10.4062 11 10.4688 10.9062L11.0312 10.0938C11.0938 10.0312 11.0938 9.9375 11.0938 9.8125C11.0938 9.71875 11.0312 9.625 10.9688 9.5625L8.875 8.0625V3.625C8.875 3.53125 8.8125 3.4375 8.75 3.375C8.6875 3.3125 8.59375 3.25 8.5 3.25H7.5C7.375 3.25 7.28125 3.3125 7.21875 3.375C7.15625 3.4375 7.125 3.53125 7.125 3.625V8.75C7.125 8.875 7.15625 9 7.28125 9.0625L9.9375 11Z"
        fill="#A5A5A5"
      />
    </svg>
  );
};

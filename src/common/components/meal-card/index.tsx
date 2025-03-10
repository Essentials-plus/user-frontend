// import SwapMealDialog from "@/common/components/calorieCalculator/components/swapMealDialog";
// import { MealsForTheWeek } from "@/types/calorie-calculator";
import SwapMealDialog from "@/common/components/swapMealDialog";
import Button from "@/common/components/ui/button";
import { mealTypeOptions } from "@/constants/meal";
import { ExtendMeal } from "@/types/api-responses/meal";
import * as Collapsible from "@radix-ui/react-collapsible";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { IoChevronDownOutline } from "react-icons/io5";

const MealCard = ({
  hideSwapButton,
  meal,
  swapMeals,
  onMealSwap,
}: {
  hideSwapButton?: boolean;
  meal: ExtendMeal;
  swapMeals?: ExtendMeal[];
  // eslint-disable-next-line no-unused-vars
  onMealSwap?: (m: ExtendMeal) => any;
}) => {
  const [isOpenCollapsible, setisOpenCollapsible] = useState(false);

  const swapableMeals = useMemo(() => {
    return swapMeals?.filter((v) => v.meal == meal.meal);
  }, [swapMeals, meal]);

  return (
    <>
      <Collapsible.Root
        open={isOpenCollapsible}
        onOpenChange={setisOpenCollapsible}
      >
        <div className="overflow-hidden rounded-md bg-white shadow">
          <div className="grid grid-cols-1 md:grid-cols-[170px,auto]">
            <div className="relative isolate h-[250px] overflow-hidden md:h-full">
              <div className="absolute inset-0 z-[-1] animate-pulse bg-slate-200"></div>
              <Image
                fill
                src={meal.image}
                alt={"meal"}
                className="size-full object-cover object-center"
              />
            </div>
            <div className="space-y-3.5 p-3 md:space-y-5 md:px-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="line-clamp-1 text-base font-semibold">
                  {meal.mealName}
                </h3>
                <p className="shrink-0 rounded bg-app-primary/5 px-1.5 py-0.5 text-xs font-medium capitalize text-app-primary">
                  {mealTypeOptions.find((option) => option.value === meal.meal)
                    ?.label || "- - -"}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm font-medium text-black/60 [&>div]:space-y-1.5">
                <div>
                  <p className="font-semibold text-app-primary">
                    <span className="text-lg">{meal.totalNeedOfKCal}</span> kcal
                  </p>
                  <p className="flex items-center gap-1.5 text-sm">
                    <AiOutlineClockCircle className="size-4" />{" "}
                    {meal.cookingTime}
                  </p>
                </div>

                <div>
                  <p>
                    <span className="font-semibold text-app-primary">
                      {meal.totalNeedOfProteins}g
                    </span>{" "}
                    Proteins
                  </p>
                  <p>
                    <span className="font-semibold text-app-primary">
                      {meal.totalNeedOfFats}g
                    </span>{" "}
                    Fats
                  </p>
                </div>

                <div>
                  <p>
                    <span className="font-semibold text-app-primary">
                      {meal.totalNeedOfCarbohydrates}g
                    </span>{" "}
                    Carbohydrate
                  </p>
                  <p>
                    <span className="font-semibold text-app-primary">
                      {meal.totalNeedOfFiber}g
                    </span>{" "}
                    Fiber
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                {!hideSwapButton &&
                  swapableMeals &&
                  swapableMeals?.length > 0 && (
                    <SwapMealDialog
                      onMealSwap={onMealSwap}
                      swapableMeals={swapableMeals}
                      meal={meal}
                    />
                  )}
                <Collapsible.Trigger asChild>
                  <Button
                    className="ml-auto [&[data-state='open']>svg]:rotate-180"
                    onClick={(e) => {
                      e.stopPropagation();
                      setisOpenCollapsible((prev) => !prev);
                    }}
                    size={"sm"}
                    iconButton
                    intent={"outline-primary"}
                  >
                    <IoChevronDownOutline className="size-3.5" />
                  </Button>
                </Collapsible.Trigger>
              </div>
            </div>
          </div>

          <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-collapsible-slideUp data-[state=open]:animate-collapsible-slideDown">
            <div className="space-y-5 border-t border-slate-100 p-3 md:px-4">
              <div className="grid grid-cols-1 gap-5 gap-y-8 md:grid-cols-[45%,auto]">
                <div>
                  <h3 className="text-base font-semibold">Ingrediënten</h3>

                  <div className="mt-3.5 text-sm text-slate-900/80">
                    <ul className="space-y-1.5">
                      {meal.ingredients.map((ingredient) => (
                        <li
                          key={ingredient.id}
                          className="flex items-center gap-2 lowercase"
                        >
                          <BiCheck className="size-5 shrink-0 text-green-600" />
                          {ingredient.totalNeed} {ingredient.unit}{" "}
                          {ingredient.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-semibold">Bereidingswijze</h3>

                  <div className="mt-3.5 text-sm text-slate-900/80">
                    <ol className="space-y-1.5 pl-4 [&>li]:list-item [&>li]:list-decimal">
                      {meal.preparationMethod.map((method) => (
                        <li key={method.id} className="flex items-center gap-2">
                          {method.label}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-green-500/[0.08] px-3.5 py-3">
                <h4 className="text-base font-semibold text-green-600">
                  Tips:
                </h4>

                <div className="mt-2 text-sm font-medium text-slate-900/80">
                  <ol className="space-y-2 pl-5 [&>li]:list-item [&>li]:list-decimal">
                    {meal.tips.map((tip) => (
                      <li key={tip.id} className="flex items-center gap-2">
                        {tip.label}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </Collapsible.Content>
        </div>
      </Collapsible.Root>
    </>
  );
};

export default MealCard;

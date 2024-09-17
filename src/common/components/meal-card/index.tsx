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
        <div className="shadow rounded-md overflow-hidden bg-white">
          <div className="grid grid-cols-1 md:grid-cols-[170px,auto]">
            <div className="h-[250px] md:h-full overflow-hidden relative isolate">
              <div className="bg-slate-200 absolute inset-0 animate-pulse z-[-1]"></div>
              <Image
                fill
                src={meal.image}
                alt={"meal"}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="px-3 md:px-4 py-3 space-y-3.5 md:space-y-5">
              <div className="flex justify-between items-center gap-2">
                <h3 className="text-base font-semibold line-clamp-1">
                  {meal.mealName}
                </h3>
                <p className="text-xs bg-app-primary/5 text-app-primary rounded px-1.5 font-medium py-0.5 capitalize shrink-0">
                  {mealTypeOptions.find((option) => option.value === meal.meal)
                    ?.label || "- - -"}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 [&>div]:space-y-1.5 font-medium text-sm text-black/60">
                <div>
                  <p className="font-semibold text-primary">
                    <span className="text-lg">{meal.totalNeedOfKCal}</span> kcal
                  </p>
                  <p className="text-sm flex items-center gap-1.5">
                    <AiOutlineClockCircle className="w-4 h-4" />{" "}
                    {meal.cookingTime}
                  </p>
                </div>

                <div>
                  <p>
                    <span className="text-primary font-semibold">
                      {meal.totalNeedOfProteins}g
                    </span>{" "}
                    Proteins
                  </p>
                  <p>
                    <span className="text-primary font-semibold">
                      {meal.totalNeedOfFats}g
                    </span>{" "}
                    Fats
                  </p>
                </div>

                <div>
                  <p>
                    <span className="text-primary font-semibold">
                      {meal.totalNeedOfCarbohydrates}g
                    </span>{" "}
                    Carbohydrate
                  </p>
                  <p>
                    <span className="text-primary font-semibold">
                      {meal.totalNeedOfFiber}g
                    </span>{" "}
                    Fiber
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
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
                    <IoChevronDownOutline className="w-3.5 h-3.5" />
                  </Button>
                </Collapsible.Trigger>
              </div>
            </div>
          </div>

          <Collapsible.Content className="data-[state=open]:animate-collapsible-slideDown data-[state=closed]:animate-collapsible-slideUp overflow-hidden">
            <div className="px-3 md:px-4 py-3 border-t border-slate-100 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-[45%,auto] gap-5 gap-y-8">
                <div>
                  <h3 className="text-base font-semibold">Ingrediënten</h3>

                  <div className="mt-3.5 text-sm text-slate-900/80">
                    <ul className="space-y-1.5">
                      {meal.ingredients.map((ingredient, i) => (
                        <li
                          key={"hgadg" + i}
                          className="flex items-center gap-2 lowercase"
                        >
                          <BiCheck className="w-5 h-5 text-green-600 shrink-0" />
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
                    <ol className="space-y-1.5 [&>li]:list-item [&>li]:list-decimal pl-4">
                      {meal.preparationMethod.map((method, i) => (
                        <li
                          key={"gadsd" + i}
                          className="flex items-center gap-2"
                        >
                          {method.label}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/[0.08] rounded-md px-3.5 py-3">
                <h4 className="font-semibold text-green-600 text-base">
                  Tips:
                </h4>

                <div className="text-sm text-slate-900/80 font-medium mt-2">
                  <ol className="space-y-2 [&>li]:list-item [&>li]:list-decimal pl-5">
                    {meal.tips.map((tip, i) => (
                      <li key={"gdsa" + i} className="flex items-center gap-2">
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

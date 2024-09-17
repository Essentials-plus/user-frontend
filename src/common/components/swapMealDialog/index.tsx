import MealCard from "@/common/components/meal-card";
import Button from "@/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ExtendMeal } from "@/types/api-responses/meal";

import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type Props = {
  swapableMeals: ExtendMeal[];
  meal: ExtendMeal;
  // eslint-disable-next-line no-unused-vars
  onMealSwap?: (m: ExtendMeal) => any;
};

const SwapMealDialog = ({ swapableMeals, meal, onMealSwap }: Props) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button
          className="[&:active>svg]:rotate-180"
          size={"sm"}
          intent={"outline-primary"}
        >
          <FiRefreshCw className="w-3.5 h-3.5 duration-100" />
          Ruilen
        </Button>
      </DialogTrigger>
      <DialogContent className="max-xl:max-w-[95vw] xl:max-w-[1300px] overflow-hidden max-h-[95dvh] overflow-y-auto">
        <h3 className="text-xl font-semibold">
          Alsjeblieft kies uw <span className="capitalize">{meal.meal}</span>:
        </h3>

        <ResponsiveMasonry
          className="mt-2"
          columnsCountBreakPoints={{ 350: 1, 1150: 2 }}
        >
          <Masonry gutter="20px">
            {swapableMeals.map((m, i) => (
              <button
                key={"sdg" + i}
                onClick={() => {
                  if (m.id != meal.id) {
                    onMealSwap && onMealSwap(m);
                    setIsOpenDialog(false);
                  }
                }}
                className={cn(
                  "rounded-md text-left __focus_visible",
                  m.id == meal.id && "ring-2 ring-primary ring-offset-2",
                )}
              >
                <MealCard meal={m} hideSwapButton />
              </button>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </DialogContent>
    </Dialog>
  );
};

export default SwapMealDialog;

import { getMealPlans } from "@/views/onboarding/components/step-2";

const MealPlansBrakdown = ({
  mealsPerDay,
  totalRequiredCalorie,
}: {
  mealsPerDay: number;
  totalRequiredCalorie: number;
}) => {
  return (
    <div>
      <p className="text-base font-bold">Maaltijd plan:</p>
      <div className="flex items-center gap-x-4 flex-wrap mt-4">
        {getMealPlans(mealsPerDay, totalRequiredCalorie || 0).map((meal, i) => (
          <div key={i}>
            <p className="text-xs font-bold">{meal.label}</p>
            <div className="w-20 h-8 __c_all rounded border border-black mt-2">
              <span className="underline mr-1">{meal.kCalNeed}</span> kcal
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlansBrakdown;

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
      <div className="mt-4 flex flex-wrap items-center gap-x-4">
        {getMealPlans(mealsPerDay, totalRequiredCalorie || 0).map((meal, i) => (
          <div key={i}>
            <p className="text-xs font-bold">{meal.label}</p>
            <div className="__c_all mt-2 h-8 w-20 rounded border border-black">
              <span className="mr-1 underline">{meal.kCalNeed}</span> kcal
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlansBrakdown;

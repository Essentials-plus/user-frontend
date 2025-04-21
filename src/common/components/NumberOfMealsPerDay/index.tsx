import { cn } from "@/lib/utils";

const mealsPerDay = [
  {
    label: "Intermittent fasting",
    value: 4,
  },
  {
    label: "5",
    value: 5,
  },
  {
    label: "6",
    value: 6,
  },
];

const NumberOfMealsPerDay = ({
  onValueChange,
  value,
}: {
  value: number;
  // eslint-disable-next-line no-unused-vars
  onValueChange: (value: number) => void;
}) => {
  return (
    <div>
      <p className="text-sm font-bold">Aantal maaltijden per dag:</p>
      <div className="mt-2 flex w-fit overflow-hidden rounded border border-black">
        {mealsPerDay.map((item) => (
          <button
            type="button"
            key={item.value}
            onClick={() => onValueChange(item.value)}
            className={cn(
              "min-w-9 lg:min-w-12 px-3 lg:px-6 h-8 max-lg:text-sm border-r last:border-r-0 cursor-pointer border-black __c_all",
              value === item.value && "bg-app-yellow",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberOfMealsPerDay;

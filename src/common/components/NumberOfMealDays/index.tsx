import { cn } from "@/lib/utils";

const NumberOfMealDays = ({
  value,
  onValueChange,
}: {
  value: number;
  // eslint-disable-next-line no-unused-vars
  onValueChange: (day: number) => void;
}) => {
  return (
    <div>
      <p className="text-sm font-bold">Aantal maaltijd dagen:</p>
      <div className="mt-2 flex border border-black rounded w-fit overflow-hidden">
        {Array.from({ length: 7 }).map((num, i) => (
          <button
            type="button"
            key={i}
            onClick={() => {
              onValueChange(i + 1);
            }}
            className={cn(
              "w-12 h-8 border-r cursor-pointer border-black __c_all last:border-r-0",
              i + 1 === value && "bg-app-yellow",
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberOfMealDays;

import { cn } from "@/lib/utils";

type Props = {
  totalDays: number;
  activeDay: number;
  // eslint-disable-next-line no-unused-vars
  onDayClick: (d: number) => any;
  wrapperClassName?: string;
};

function SelectedDays({
  activeDay,
  onDayClick,
  totalDays,
  wrapperClassName,
}: Props) {
  return (
    <div
      className={cn(
        "flex max-sm:justify-between justify-center gap-5 lg:gap-6",
        wrapperClassName,
      )}
    >
      {[...Array(totalDays)].map((_, i) => {
        const isActive = activeDay == i + 1;
        return (
          <button
            key={i + 1}
            onClick={() => onDayClick(i + 1)}
            className={cn(
              "rounded-full p-1.5 lg:p-2 text-center text-sm space-y-1 pt-3 __focus_visible",
              isActive
                ? "bg-app-yellow text-white"
                : "hover:bg-slate-200 group",
            )}
          >
            <p
              className={cn(
                !isActive &&
                  "opacity-0 pointer-events-none group-hover:opacity-100",
                "max-lg:text-sm",
              )}
            >
              Dag
            </p>
            <div
              className={cn(
                "w-6 lg:w-7 max-lg:text-sm aspect-square rounded-full bg-white text-black flex items-center justify-center",
                !isActive && "opacity-70",
              )}
            >
              {i + 1}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default SelectedDays;

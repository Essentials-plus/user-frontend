import { cn } from "@/lib/utils";

type Props = {
  totalDays: number;
  activeDay: number;
  onDayClick: (d: number) => any;
};

function SelectedDays({ activeDay, onDayClick, totalDays }: Props) {
  return (
    <div className="flex justify-center gap-6">
      {[...Array(totalDays)].map((_, i) => {
        const isActive = activeDay == i + 1;
        return (
          <button
            key={"gdf" + i}
            onClick={() => onDayClick(i + 1)}
            className={cn(
              "rounded-full p-2 text-center text-sm space-y-1 pt-3 __focus_visible",
              isActive
                ? "bg-app-yellow text-white"
                : "hover:bg-slate-200 group",
            )}
          >
            <p
              className={cn(
                !isActive &&
                  "opacity-0 pointer-events-none group-hover:opacity-100",
              )}
            >
              Dag
            </p>
            <div
              className={cn(
                "w-7 aspect-square rounded-full bg-white text-black flex items-center justify-center",
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

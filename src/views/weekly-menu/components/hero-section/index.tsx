import { cn, getNextDeliveryDate, getWeekDate } from "@/lib/utils";
import WeekNumbersSlider from "@/views/weekly-menu/components/week-numbers-slider";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useMemo } from "react";
import useMeasure from "react-use-measure";
import "swiper/css";

type Props = {
  totalNeedOfData: {
    totalNeedOfCarbohydrates: number;
    totalNeedOfFats: number;
    totalNeedOfFiber: number;
    totalNeedOfKCal: number;
    totalNeedOfProteins: number;
  };
  weekNumber: number;
  // eslint-disable-next-line no-unused-vars
  onWeekChange: (w: number) => any;
  lockdownDate: Date;
  weeklyNumbers: number[];
};

const HeroSection = ({
  totalNeedOfData,
  weekNumber,
  onWeekChange,
  lockdownDate,
  weeklyNumbers: weekNumberList,
}: Props) => {
  const [ref, bounds] = useMeasure();

  const currentWeekDates = useMemo(() => getWeekDate(weekNumber), [weekNumber]);
  return (
    <section
      className={cn(
        "mt-[55px] duration-200",
        !bounds.left && "opacity-0 pointer-events-none",
      )}
    >
      <div className="container" ref={ref}></div>

      <div style={{ paddingLeft: bounds.left }}>
        <div className="grid grid-cols-[480px,auto] gap-12">
          <div className="pl-6">
            <h1 className="text-center text-4xl font-bold uppercase">
              WEEKmenu Van
            </h1>
            <div className="mt-5">
              <WeekNumbersSlider
                onWeekChange={onWeekChange}
                weekNumber={weekNumber}
                weekNumberList={weekNumberList}
              />
            </div>

            <div className="rounded-b-[40px] bg-[#D9D9D9] px-8 py-4 text-xl font-semibold">
              <p>
                Reeks: <br /> {currentWeekDates.start.toLocaleDateString()} tm{" "}
                {currentWeekDates.end.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <div
              style={{ paddingRight: bounds.left }}
              className="rounded-l-[40px] bg-app-darker-green"
            >
              <div className="py-11 pl-12 pr-6">
                <div className="flex flex-wrap items-center gap-5">
                  <div className="rounded-[10px] bg-white px-9 py-1.5 text-center">
                    <p className="text-lg font-bold">
                      {totalNeedOfData.totalNeedOfKCal}
                    </p>
                    <p className="text-sm">Kcal</p>
                  </div>
                  <div className="rounded-[10px] bg-white px-9 py-1.5 text-center">
                    <p className="text-lg font-bold">
                      {totalNeedOfData.totalNeedOfProteins} g
                    </p>
                    <p className="text-sm">Proteins</p>
                  </div>
                  <div className="rounded-[10px] bg-white px-9 py-1.5 text-center">
                    <p className="text-lg font-bold">
                      {totalNeedOfData.totalNeedOfCarbohydrates} g
                    </p>
                    <p className="text-sm">Carbohydrate</p>
                  </div>
                  <div className="rounded-[10px] bg-white px-9 py-1.5 text-center">
                    <p className="text-lg font-bold">
                      {totalNeedOfData.totalNeedOfFats} g
                    </p>
                    <p className="text-sm">Fats</p>
                  </div>
                  <div className="rounded-[10px] bg-white px-9 py-1.5 text-center">
                    <p className="text-lg font-bold">
                      {totalNeedOfData.totalNeedOfFiber} g
                    </p>
                    <p className="text-sm">Fiber</p>
                  </div>
                </div>

                <p className="mt-12 text-left font-semibold text-white">
                  Uw eerst volgende lockdown en bezorgmomenten zijn:
                </p>
                <p className="mt-2 flex items-center gap-4 text-3xl font-semibold text-white">
                  Lockdowndatum:
                  {format(new Date(lockdownDate), "EEEE, dd/MM/yyyy", {
                    locale: nl,
                  })}
                  {/* {lockdownDate.toLocaleDateString()} */}
                </p>
                <p className="mt-2 flex items-center gap-4 text-3xl font-semibold text-white">
                  Leverdatum:
                  {format(
                    getNextDeliveryDate(lockdownDate),
                    "EEEE, dd/MM/yyyy",
                    { locale: nl },
                  )}
                  {/* {lockdownDate.toLocaleDateString()} */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

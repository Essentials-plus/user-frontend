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
  const roundedContainerStyle =
    "rounded-lg lg:rounded-[10px] bg-white px-2 py-1 lg:px-9 lg:py-1.5 text-center max-lg:flex max-lg:items-center max-lg:gap-1.5";
  const heroSectionTitleClass =
    "text-sm lg:text-lg max-lg:font-semibold font-bold";

  return (
    <section
      className={cn(
        "mt-[55px] duration-200",
        // !bounds.left && "opacity-0 pointer-events-none",
      )}
    >
      <div className="container" ref={ref}></div>

      <div className="max-lg:!px-5" style={{ paddingLeft: bounds.left }}>
        <div className="grid grid-cols-1 gap-12 gap-y-4 lg:grid-cols-[480px,auto]">
          <div className="lg:pl-6">
            <h1 className="text-center text-xl font-semibold uppercase lg:text-4xl lg:font-bold">
              WEEKmenu Van
            </h1>
            <div className="mt-3 lg:mt-5">
              <WeekNumbersSlider
                onWeekChange={onWeekChange}
                weekNumber={weekNumber}
                weekNumberList={weekNumberList}
              />
            </div>

            <div className="rounded-b-2xl bg-[#D9D9D9] px-4 py-3 text-sm font-medium lg:rounded-b-[40px] lg:px-8 lg:py-4 lg:text-xl lg:font-semibold">
              <p>
                Reeks: <br /> {currentWeekDates.start.toLocaleDateString()} tm{" "}
                {currentWeekDates.end.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <div
              style={{ paddingRight: bounds.left }}
              className="bg-app-darker-green max-lg:rounded-xl lg:rounded-l-[40px]"
            >
              <div className="max-lg:p-4 lg:py-11 lg:pl-12 lg:pr-6">
                <div className="flex flex-wrap items-center gap-2 lg:gap-5">
                  <div className={roundedContainerStyle}>
                    <p className={heroSectionTitleClass}>
                      {totalNeedOfData.totalNeedOfKCal}
                    </p>
                    <p className="text-xs lg:text-sm">Kcal</p>
                  </div>
                  <div className={roundedContainerStyle}>
                    <p className={heroSectionTitleClass}>
                      {totalNeedOfData.totalNeedOfProteins} g
                    </p>
                    <p className="text-xs lg:text-sm">Proteins</p>
                  </div>
                  <div className={roundedContainerStyle}>
                    <p className={heroSectionTitleClass}>
                      {totalNeedOfData.totalNeedOfCarbohydrates} g
                    </p>
                    <p className="text-xs lg:text-sm">Carbohydrate</p>
                  </div>
                  <div className={roundedContainerStyle}>
                    <p className={heroSectionTitleClass}>
                      {totalNeedOfData.totalNeedOfFats} g
                    </p>
                    <p className="text-xs lg:text-sm">Fats</p>
                  </div>
                  <div className={roundedContainerStyle}>
                    <p className={heroSectionTitleClass}>
                      {totalNeedOfData.totalNeedOfFiber} g
                    </p>
                    <p className="text-xs lg:text-sm">Fiber</p>
                  </div>
                </div>

                <p className="mt-6 text-left text-sm font-medium text-white lg:mt-12 lg:font-semibold">
                  Uw eerst volgende lockdown en bezorgmomenten zijn:
                </p>
                <p className="mt-2 flex items-center gap-4 text-base font-semibold text-white lg:text-3xl">
                  Lockdowndatum:{" "}
                  {format(new Date(lockdownDate), "EEEE, dd/MM/yyyy", {
                    locale: nl,
                  })}
                </p>
                <p className="mt-1 flex items-center gap-4 text-base font-semibold text-white lg:mt-2 lg:text-3xl">
                  Leverdatum:{" "}
                  {format(
                    getNextDeliveryDate(lockdownDate),
                    "EEEE, dd/MM/yyyy",
                    { locale: nl },
                  )}
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

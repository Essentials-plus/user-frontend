import { getWeekDate } from "@/lib/utils";
import WeekNumbersSlider from "@/views/weekly-menu/components/week-numbers-slider";
import Moment from "react-moment";
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

  return (
    <section className="mt-[55px]">
      <div className="container" ref={ref}></div>

      <div style={{ paddingLeft: bounds.left }}>
        <div className="grid grid-cols-[480px,auto] gap-12">
          <div className="pl-6">
            <h1 className="text-4xl text-center font-bold uppercase">
              WEEKmenu Van
            </h1>
            <div className="mt-5">
              <WeekNumbersSlider
                onWeekChange={onWeekChange}
                weekNumber={weekNumber}
                weekNumberList={weekNumberList}
              />
            </div>

            <div className="bg-[#D9D9D9] px-8 py-4 rounded-b-[40px] font-semibold text-xl">
              <p>
                Reeks: <br />{" "}
                {getWeekDate(weekNumber).start.toLocaleDateString()} tm{" "}
                {getWeekDate(weekNumber).end.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <div
              style={{ paddingRight: bounds.left }}
              className="bg-app-darker-green rounded-l-[40px]"
            >
              <div className="py-11 pl-12 pr-6">
                <div className="flex items-center gap-5 flex-wrap">
                  <div className="bg-white rounded-[10px] py-1.5 px-9 text-center">
                    <p className="text-lg font-bold">
                      {totalNeedOfData.totalNeedOfKCal}
                    </p>
                    <p className="text-sm">Kcal</p>
                  </div>
                  <div className="bg-white rounded-[10px] py-1.5 px-9 text-center">
                    <p className="text-lg font-bold">
                      {totalNeedOfData.totalNeedOfProteins} g
                    </p>
                    <p className="text-sm">Proteins</p>
                  </div>
                  <div className="bg-white rounded-[10px] py-1.5 px-9 text-center">
                    <p className="text-lg font-bold">
                      {totalNeedOfData.totalNeedOfCarbohydrates} g
                    </p>
                    <p className="text-sm">Carbohydrate</p>
                  </div>
                  <div className="bg-white rounded-[10px] py-1.5 px-9 text-center">
                    <p className="text-lg font-bold">
                      {totalNeedOfData.totalNeedOfFats} g
                    </p>
                    <p className="text-sm">Fats</p>
                  </div>
                  <div className="bg-white rounded-[10px] py-1.5 px-9 text-center">
                    <p className="text-lg font-bold">
                      {totalNeedOfData.totalNeedOfFiber} g
                    </p>
                    <p className="text-sm">Fiber</p>
                  </div>
                </div>

                <p className="text-left font-semibold mt-12 text-white">
                  Jouw maaltijdbox wordt bezorgd op:
                </p>
                <p className="text-3xl font-semibold text-white mt-2 flex gap-4 items-center">
                  Lockdowndatum:
                  <Moment
                    locale="nl"
                    className="capitalize"
                    format="dddd, DD/MM/YYYY"
                  >
                    {lockdownDate}
                  </Moment>
                  {/* {lockdownDate.toLocaleDateString()} */}
                </p>
                <p className="text-3xl font-semibold text-white mt-2 flex gap-4 items-center">
                  Leverdatum:
                  <Moment
                    locale="nl"
                    className="capitalize"
                    format="dddd, DD/MM/YYYY"
                    add={{ days: 2 }}
                  >
                    {lockdownDate}
                  </Moment>
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

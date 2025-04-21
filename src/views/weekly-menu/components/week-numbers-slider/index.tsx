import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const WeekNumbersSlider = ({
  weekNumber,
  weekNumberList,
  onWeekChange,
}: {
  weekNumber: number;
  weekNumberList: number[];
  // eslint-disable-next-line no-unused-vars
  onWeekChange: (week: number) => void;
}) => {
  return (
    <div className="relative border-2 border-app-black">
      <Swiper
        slidesPerView={3.97}
        initialSlide={weekNumber - 1}
        slidesPerGroup={2}
        modules={[Navigation]}
        navigation={{
          prevEl: "#prevBtn",
          nextEl: "#nextBtn",
        }}
      >
        {weekNumberList.map((w) => {
          // const isLast = i === weekNumberList.length - 1;
          return (
            <SwiperSlide
              key={w.toString()}
              className={cn("shadow-[-2px_0px_0px_black]")}
            >
              <div
                onClick={() => onWeekChange(w)}
                className={cn(
                  "cursor-pointer text-center py-3 lg:py-4",
                  w === weekNumber && "bg-app-yellow",
                )}
              >
                <p className="lg:__body_18 text-sm font-semibold uppercase lg:font-bold">
                  Week
                </p>
                <h3 className="mt-1 text-xl font-bold lg:text-5xl">
                  {w.toString().padStart(2)}
                </h3>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button
        id="prevBtn"
        className="absolute right-[calc(100%-16px)] top-1/2 z-20 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-app-black/10 bg-app-grey disabled:cursor-not-allowed disabled:opacity-50 max-lg:disabled:hidden lg:right-[calc(100%+8px)]"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        id="nextBtn"
        className="absolute left-[calc(100%-16px)] top-1/2 z-20 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-app-black/10 bg-app-grey disabled:cursor-not-allowed disabled:opacity-50 max-lg:disabled:hidden lg:left-[calc(100%+8px)]"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

export default WeekNumbersSlider;

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
        slidesPerView={4}
        initialSlide={weekNumber - 1}
        slidesPerGroup={2}
        modules={[Navigation]}
        navigation={{
          prevEl: "#prevBtn",
          nextEl: "#nextBtn",
        }}
      >
        {weekNumberList.map((w) => (
          <SwiperSlide
            key={w.toString()}
            className="border-l-2 border-app-black"
          >
            <div
              onClick={() => onWeekChange(w)}
              className={cn(
                "cursor-pointer text-center py-4",
                w === weekNumber && "bg-app-yellow",
              )}
            >
              <p className="__body_18 font-bold uppercase">Week</p>
              <h3 className="mt-1 text-5xl font-bold">
                {w.toString().padStart(2)}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        id="prevBtn"
        className="absolute right-[calc(100%+8px)] top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-app-black/10 bg-app-grey disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        id="nextBtn"
        className="absolute left-[calc(100%+8px)] top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-app-black/10 bg-app-grey disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

export default WeekNumbersSlider;

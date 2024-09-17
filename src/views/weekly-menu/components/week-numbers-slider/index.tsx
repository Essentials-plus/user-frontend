import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useMeasure from "react-use-measure";
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
  const [slideRef, slideBounds] = useMeasure();

  return (
    <div className="border-2 border-app-black relative">
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
              ref={slideRef}
              onClick={() => onWeekChange(w)}
              className={cn(
                "cursor-pointer text-center py-4",
                w === weekNumber && "bg-app-yellow",
              )}
            >
              <p className="__body_18 font-bold uppercase">Week</p>
              <h3 className="text-5xl font-bold mt-1">
                {w.toString().padStart(2)}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        id="prevBtn"
        className="absolute top-1/2 grid place-items-center border border-app-black/10 disabled:opacity-50 disabled:cursor-not-allowed -translate-y-1/2 right-[calc(100%+8px)] size-8 rounded-full bg-app-grey"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        id="nextBtn"
        className="absolute top-1/2 grid place-items-center border border-app-black/10 disabled:opacity-50 disabled:cursor-not-allowed -translate-y-1/2 left-[calc(100%+8px)] size-8 rounded-full bg-app-grey"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

export default WeekNumbersSlider;

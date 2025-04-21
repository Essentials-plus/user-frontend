import { howDoesItWorksCards } from "@/constants/how-does-it-works-cards";
import { cn } from "@/lib/utils";

const HowDoesItWorkSection = () => {
  return (
    <section className="relative isolate pt-10 lg:pt-[63px]">
      <div className="container">
        <h2 className="__h3 max-lg:text-center lg:__h2">Hoe werkt het</h2>

        <div className="lg:mb-20 lg:mt-16 my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-7 lg:gap-x-10">
            {howDoesItWorksCards.map(({ description, title }, i) => (
              <div
                key={i}
                className={cn(
                  "p-7 lg:pt-14 lg:pb-10 lg:px-6 border-2 border-black rounded-2xl lg:rounded-3xl shadow-[11px_9px_16.2px_0px_rgba(0,0,0,0.25)] text-center bg-app-yellow relative",
                  i === 0 && "bg-white",
                  i === 1 && "bg-white",
                )}
              >
                <h4 className="text-lg lg:__h4 font-bold">{title}</h4>
                <p className="__body_16 lg:__body_18 mt-4 lg:mt-6 font-medium">
                  {description}
                </p>

                <div
                  className={cn(
                    "absolute top-0 left-0 -translate-x-[35%] -translate-y-[35%] lg:-translate-x-[40%] lg:-translate-y-[40%] h-10 lg:h-16 aspect-square rounded-full border-2 border-black text-2xl lg:text-[40px] bg-white font-medium __c_all",
                    i === 0 && "bg-app-yellow",
                    i === 1 && "bg-app-yellow",
                  )}
                >
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-0 z-[-1] h-[715px] max-lg:hidden w-1/2 bg-app-yellow"></div>
    </section>
  );
};

export default HowDoesItWorkSection;

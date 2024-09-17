import { howDoesItWorksCards } from "@/constants/how-does-it-works-cards";
import { cn } from "@/lib/utils";

const HowDoesItWorkSection = () => {
  return (
    <section className="relative isolate pt-[63px]">
      <div className="container">
        <h2 className="__h2">Hoe werkt het</h2>

        <div className="mb-20 mt-16">
          <div className="grid grid-cols-4 gap-x-10">
            {howDoesItWorksCards.map(({ description, title }, i) => (
              <div
                key={i}
                className={cn(
                  "pt-14 pb-10 px-6 border-2 border-black rounded-3xl shadow-[11px_9px_16.2px_0px_rgba(0,0,0,0.25)] text-center bg-app-yellow relative",
                  i === 0 && "bg-white",
                  i === 1 && "bg-white"
                )}
              >
                <h4 className="__h4 font-bold">{title}</h4>
                <p className="mt-6 __body_18 font-medium">{description}</p>

                <div
                  className={cn(
                    "absolute top-0 left-0 -translate-x-[40%] -translate-y-[40%] h-16 aspect-square rounded-full border-2 border-black text-[40px] bg-white font-medium __c_all",
                    i === 0 && "bg-app-yellow",
                    i === 1 && "bg-app-yellow"
                  )}
                >
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-1/2 h-[715px] absolute top-0 left-0 bg-app-yellow z-[-1]"></div>
    </section>
  );
};

export default HowDoesItWorkSection;

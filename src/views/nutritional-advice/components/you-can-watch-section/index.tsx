import PlayIcon from "@/common/components/icons/play-icon";
import Button from "@/common/components/ui/button";

const YouCanWatchSection = () => {
  return (
    <section className="my-[104px]">
      <div className="container">
        <div className="max-w-[1100px] mx-auto grid grid-cols-[405px,auto] gap-x-16">
          <div>
            <h2 className="__h2 font-oswald">
              U kunt de vertaling van het kookproces bekijken{" "}
            </h2>
            <p className="mt-4 mb-8 __body_16 text-app-text">
              In onze keuken werken hooggekwalificeerde koks. Wij houden ons
              allemaal aan sanitaire normen, en dit zijn niet alleen maar
              woorden, omdat het kan zie dit gemakkelijk zelf
            </p>
            <Button intent={"orange"} className="rounded-full">
              video afspelen
            </Button>
          </div>
          <div className="h-full w-full rounded-3xl __c_all bg-[#CCCCCC]">
            <button>
              <PlayIcon className="w-20 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouCanWatchSection;

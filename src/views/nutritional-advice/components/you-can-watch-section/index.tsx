import PlayIcon from "@/common/components/icons/play-icon";
import Button from "@/common/components/ui/button";

const YouCanWatchSection = () => {
  return (
    <section className="my-[104px]">
      <div className="container">
        <div className="mx-auto grid max-w-[1100px] grid-cols-[405px,auto] gap-x-16">
          <div>
            <h2 className="__h2 font-oswald">
              U kunt de vertaling van het kookproces bekijken{" "}
            </h2>
            <p className="__body_16 mb-8 mt-4 text-app-text">
              In onze keuken werken hooggekwalificeerde koks. Wij houden ons
              allemaal aan sanitaire normen, en dit zijn niet alleen maar
              woorden, omdat het kan zie dit gemakkelijk zelf
            </p>
            <Button intent={"orange"} className="rounded-full">
              video afspelen
            </Button>
          </div>
          <div className="__c_all size-full rounded-3xl bg-[#CCCCCC]">
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

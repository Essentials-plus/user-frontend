import StartTotdayButton from "@/common/components/start-totday-button";
import useHeaderHeight from "@/hooks/useHeaderHeight";
import Image from "next/image";
import { CSSProperties } from "react";

const HeroSection = () => {
  const { headerHeight } = useHeaderHeight();

  return (
    <section
      style={
        {
          "--headerHeight": `${headerHeight}px`,
        } as CSSProperties
      }
      className="relative flex max-w-[100vw] overflow-x-hidden max-lg:min-h-[calc(100dvh-var(--headerHeight))] max-lg:flex-col max-lg:bg-app-darker-green lg:min-h-[calc(100vh-93.74px)] lg:items-center"
    >
      <div className="container">
        <div className="max-w-[659px] max-lg:pt-16">
          <h1 className="lg:__h1 text-4xl font-bold uppercase max-lg:text-white">
            Gezond eten <br /> makkelijk gemaakt{" "}
          </h1>
          <p className="__body_16 lg:__body_25 mb-10 mt-5 font-medium uppercase text-black max-lg:text-white/90">
            Complete dagpakketen afgestemd op <br /> jou unieke behoeftes
          </p>
          <div className="flex lg:justify-center">
            <StartTotdayButton className="max-lg:bg-white max-lg:text-app-darker-green lg:-translate-x-10" />
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-app-darker-green max-lg:flex max-lg:min-h-[250px] max-lg:grow max-lg:items-end lg:absolute lg:right-0 lg:top-0 lg:h-full lg:max-w-[50%] lg:shadow-[1px_4px_10px_0px_rgba(0,0,0,0.25)]">
        {/* <div className="absolute right-0 top-0 h-full max-w-[50%] overflow-hidden bg-app-darker-green"> */}
        <Image
          src={"/imgs/home-hero-img.jpg"}
          alt="HERO IMAGE"
          width={2098}
          height={1708}
          className="object-cover max-lg:w-full lg:size-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;

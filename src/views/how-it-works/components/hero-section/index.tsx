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
        <div className="ml-auto max-w-[659px] max-lg:py-20 lg:pl-28">
          <h1 className="__h2 lg:__h1 uppercase max-lg:text-white">
            Hoe werkt het
          </h1>
          <p className="__body_16 lg:__body_18 mb-10 mt-5 font-medium max-lg:text-white/80 lg:max-w-[60%]">
            Hoe werkt de maaltijdplan van essentialsplus?
          </p>
          <StartTotdayButton className="max-lg:bg-white max-lg:text-app-darker-green" />
        </div>
      </div>

      <div className="overflow-hidden bg-app-darker-green max-lg:flex max-lg:min-h-[250px] max-lg:grow max-lg:items-end lg:absolute lg:left-0 lg:top-0 lg:h-full lg:max-w-[50%] lg:shadow-[1px_4px_10px_0px_rgba(0,0,0,0.25)]">
        <Image
          src={"/imgs/how-it-works/how-it-works-hero.png"}
          alt="how it works"
          width={2078}
          height={1680}
          className="object-cover max-lg:w-full lg:size-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;

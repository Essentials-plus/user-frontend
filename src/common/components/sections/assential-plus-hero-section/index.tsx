import { cn } from "@/lib/utils";
import Image from "next/image";
import { CSSProperties } from "react";
import useMeasure from "react-use-measure";

type SectionProps = {
  imgSrc?: string;
  title: string;
  accentColor: string;
};

const AssentialPlusHeroSection = ({
  imgSrc,
  title,
  accentColor,
}: SectionProps) => {
  const [heroRef, heroBounds] = useMeasure();

  return (
    <section className="lg:mt-[55px]">
      <div className="container" ref={heroRef}></div>
      <div
        className={cn(
          imgSrc && "lg:grid lg:grid-cols-[400px,auto] lg:gap-x-12",
          "lg:pl-[--paddingLeft]",
        )}
        style={{ "--paddingLeft": `${heroBounds.x + 24}px` } as CSSProperties}
      >
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="our-story-hero-img"
            width={854}
            height={706}
            className="rounded-[80px] max-lg:hidden"
          />
        )}

        <div
          className={cn(
            "flex h-fit items-center max-lg:gap-4 max-lg:pr-4 lg:rounded-l-[80px] lg:px-20 lg:py-16",
            !imgSrc && "px-5 py-10",
          )}
          style={{ backgroundColor: accentColor }}
        >
          {imgSrc && (
            <Image
              src={imgSrc}
              alt="our-story-hero-img"
              width={854}
              height={706}
              className="h-[130px] w-auto md:h-[220px] lg:hidden"
            />
          )}
          <div>
            <h4 className="__h5 lg:__h4 text-white">Essentials+</h4>
            <h1 className="font-semibold text-white max-lg:text-3xl max-md:text-2xl lg:text-[65px]">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssentialPlusHeroSection;

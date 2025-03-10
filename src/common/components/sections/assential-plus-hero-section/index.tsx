import { cn } from "@/lib/utils";
import Image from "next/image";
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
    <section className="mt-[55px]">
      <div className="container" ref={heroRef}></div>
      <div
        className={cn(imgSrc && "grid grid-cols-[400px,auto] gap-x-12")}
        style={{ paddingLeft: heroBounds.x + 24 }}
      >
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="our-story-hero-img"
            width={854}
            height={706}
            className="rounded-[80px]"
          />
        )}

        <div
          className="flex h-fit items-center rounded-l-[80px] px-20 py-16"
          style={{ backgroundColor: accentColor }}
        >
          <div>
            <h4 className="__h4 text-white">Essentials+</h4>
            <h1 className="text-[65px] font-semibold text-white">{title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssentialPlusHeroSection;

import Image from "next/image";
import useMeasure from "react-use-measure";

type SectionProps = {
  imgSrc: string;
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
        className="grid grid-cols-[400px,auto] gap-x-12"
        style={{ paddingLeft: heroBounds.x + 24 }}
      >
        <Image
          src={imgSrc}
          alt="our-story-hero-img"
          width={854}
          height={706}
          className="rounded-[80px]"
        />

        <div
          className="py-16 rounded-l-[80px] px-20 flex items-center h-fit"
          style={{ backgroundColor: accentColor }}
        >
          <div>
            <h4 className="text-white __h4">Essentials+</h4>
            <h1 className="text-[65px] font-semibold text-white">{title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssentialPlusHeroSection;

import StartTotdayButton from "@/common/components/start-totday-button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-93.74px)] flex items-center relative max-w-[100vw] overflow-x-hidden">
      <div className="container">
        <div className="max-w-[659px] ml-auto pl-28">
          <h1 className="__h1 uppercase">Hoe werkt het</h1>
          <p className="__body_18 font-medium mt-5 mb-10 max-w-[60%]">
            Hoe werkt de maaltijdplan van essentialsplus?
          </p>
          <StartTotdayButton />
        </div>
      </div>

      <div className="absolute top-0 left-0 max-w-[50%] h-full bg-app-darker-green overflow-hidden shadow-[1px_4px_10px_0px_rgba(0,0,0,0.25)]">
        <Image
          src={"/imgs/how-it-works/how-it-works-hero.png"}
          alt="how it works"
          width={2078}
          height={1680}
          className="h-full w-full object-cover "
        />
      </div>
    </section>
  );
};

export default HeroSection;

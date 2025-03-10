import StartTotdayButton from "@/common/components/start-totday-button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-93.74px)] max-w-[100vw] items-center overflow-x-hidden">
      <div className="container">
        <div className="ml-auto max-w-[659px] pl-28">
          <h1 className="__h1 uppercase">Hoe werkt het</h1>
          <p className="__body_18 mb-10 mt-5 max-w-[60%] font-medium">
            Hoe werkt de maaltijdplan van essentialsplus?
          </p>
          <StartTotdayButton />
        </div>
      </div>

      <div className="absolute left-0 top-0 h-full max-w-[50%] overflow-hidden bg-app-darker-green shadow-[1px_4px_10px_0px_rgba(0,0,0,0.25)]">
        <Image
          src={"/imgs/how-it-works/how-it-works-hero.png"}
          alt="how it works"
          width={2078}
          height={1680}
          className="size-full object-cover "
        />
      </div>
    </section>
  );
};

export default HeroSection;

import StartTotdayButton from "@/common/components/start-totday-button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-93.74px)] flex items-center relative max-w-[100vw] overflow-x-hidden">
      <div className="container">
        <div className="max-w-[659px]">
          <h1 className="__h1 uppercase">
            Gezond eten <br /> makkelijk gemaakt{" "}
          </h1>
          <p className="__body_25 mt-5 mb-10 uppercase text-black">
            Complete dagpakketen afgestemd op <br /> jou unieke behoeftes
          </p>
          <div className="flex justify-center">
            <StartTotdayButton className="-translate-x-10" />
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 max-w-[50%] h-full bg-app-darker-green overflow-hidden">
        <Image
          src={"/imgs/home-hero-img.jpg"}
          alt="HERO IMAGE"
          width={2098}
          height={1708}
          className="h-full w-full object-cover "
        />
      </div>
    </section>
  );
};

export default HeroSection;

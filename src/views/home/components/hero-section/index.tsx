import StartTotdayButton from "@/common/components/start-totday-button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-93.74px)] max-w-[100vw] items-center overflow-x-hidden">
      <div className="container">
        <div className="max-w-[659px]">
          <h1 className="__h1 uppercase">
            Gezond eten <br /> makkelijk gemaakt{" "}
          </h1>
          <p className="__body_25 mb-10 mt-5 uppercase text-black">
            Complete dagpakketen afgestemd op <br /> jou unieke behoeftes
          </p>
          <div className="flex justify-center">
            <StartTotdayButton className="-translate-x-10" />
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 h-full max-w-[50%] overflow-hidden bg-app-darker-green">
        <Image
          src={"/imgs/home-hero-img.jpg"}
          alt="HERO IMAGE"
          width={2098}
          height={1708}
          className="size-full object-cover "
        />
      </div>
    </section>
  );
};

export default HeroSection;

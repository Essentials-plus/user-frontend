import React from "react";
import Button from "@/common/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-93.74px)] flex items-center relative max-w-[100vw] overflow-x-hidden">
      <div className="container">
        <div className="max-w-[659px] ml-auto pl-28">
          <h1 className="__h1 uppercase">The E+ Lifestyle</h1>
          <p className="__body_18 font-medium mt-5 mb-10 max-w-[60%]">
            Maak je essentials compleet!
          </p>
          <Button>Bekijk de producten</Button>
        </div>
      </div>

      <div className="absolute top-0 left-0 max-w-[50%] h-full bg-app-darker-green overflow-hidden">
        <Image
          src={"/imgs/lifestyle-products/lifestyle-products-hero.png"}
          alt="how it works"
          width={1039}
          height={840}
          className="h-full w-full object-cover "
        />
      </div>
    </section>
  );
};

export default HeroSection;

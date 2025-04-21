import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-93.74px)] max-w-[100vw] flex-col-reverse overflow-x-hidden lg:flex-row lg:items-center">
      <div className="container">
        <div className="max-w-[559px] max-lg:pt-10">
          <h1 className="__h1 text-3xl uppercase sm:text-4xl lg:text-5xl">
            Essentials Menu
          </h1>
          <p className="__body_18 mt-3 max-w-[373px] text-base font-medium sm:text-lg">
            Wekelijks varierende recepten. Simpel thuis bezorgt!
          </p>

          <h2 className="__h2 mt-10 text-xl uppercase sm:mt-14 sm:text-2xl">
            WEEKmenu Van
          </h2>
          <div className="mt-4 overflow-x-auto sm:mt-5">
            <div className="flex w-fit border-2 border-r-0 border-black">
              <DateBox date="25 - 01" month="NOV - DEC" />
              <DateBox date="02 - 08" month="DEC" />
              <DateBox date="09 - 15" month="DEC" />
              <DateBox date="16 - 22" month="DEC" />
            </div>
          </div>

          <div className="mt-8 sm:mt-9">
            <h3 className="__h3 text-lg font-bold uppercase sm:text-xl">
              categorieën
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-x-4">
              <div className="__c_all h-10 rounded-lg border-2 border-app-black text-center text-base sm:w-auto sm:px-4">
                Ontbijt
              </div>
              <div className="__c_all h-10 rounded-lg border-2 border-app-black text-center text-base sm:w-auto sm:px-4">
                Lunch
              </div>
              <div className="__c_all h-10 rounded-lg border-2 border-app-black text-center text-base sm:w-auto sm:px-4">
                Dinner
              </div>
              <div className="__c_all h-10 rounded-lg border-2 border-app-black text-center text-base sm:w-auto sm:px-4">
                Snacks
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[300px] w-full bg-app-darker-green sm:h-[400px] md:h-[500px] lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
        <Image
          src="/imgs/alternatife-hero-img.jpg"
          alt="HERO IMAGE"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;

const DateBox = ({ date, month }: { month: string; date: string }) => {
  return (
    <div className="flex aspect-square min-w-[80px] flex-col justify-between border-r-2 border-black p-2 text-center text-sm font-bold uppercase max-sm:grow sm:text-base lg:min-w-[100px] lg:p-3">
      <span>{month}</span>
      <span>{date}</span>
    </div>
  );
};

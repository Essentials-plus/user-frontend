import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-93.74px)] max-w-[100vw] items-center overflow-x-hidden">
      <div className="container">
        <div className="max-w-[559px]">
          <h1 className="__h1 uppercase">Essentials Menu</h1>
          <p className="__body_18 mt-3 max-w-[373px] font-medium">
            Wekelijks varierende recepten. Simpel thuis bezorgt!
          </p>

          <h2 className="__h2 mt-14 uppercase">WEEKmenu Van</h2>
          <div className="mt-5">
            <div className="flex w-fit border-2 border-r-0 border-black">
              <DateBox date="25 - 01" month="NOV - DEC" />
              <DateBox date="02 - 08" month="DEC" />
              <DateBox date="09 - 15" month="DEC" />
              <DateBox date="16 - 22" month="DEC" />
            </div>
          </div>

          <div className="mt-9">
            <h3 className="__h3 font-bold uppercase"> categorieën</h3>
            <div className="mt-3 flex items-center gap-x-4">
              <div className="__c_all h-10 w-full rounded-lg border-2 border-app-black text-lg">
                Ontbijt
              </div>
              <div className="__c_all h-10 w-full rounded-lg border-2 border-app-black text-lg">
                Lunch
              </div>
              <div className="__c_all h-10 w-full rounded-lg border-2 border-app-black text-lg">
                Dinner
              </div>
              <div className="__c_all h-10 w-full rounded-lg border-2 border-app-black text-lg">
                Snacks
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 h-full max-w-[50%] overflow-hidden bg-app-darker-green">
        <Image
          src={"/imgs/alternatife-hero-img.jpg"}
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

const DateBox = ({ date, month }: { month: string; date: string }) => {
  return (
    <div className="flex aspect-square h-[100px] flex-col justify-between border-r-2 border-black p-3 text-center text-base font-bold uppercase">
      <span>{month}</span>
      <span>{date}</span>
    </div>
  );
};

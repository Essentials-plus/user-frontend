import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-93.74px)] flex items-center relative max-w-[100vw] overflow-x-hidden">
      <div className="container">
        <div className="max-w-[559px]">
          <h1 className="__h1 uppercase">Essentials Menu</h1>
          <p className="max-w-[373px] __body_18 font-medium mt-3">
            Wekelijks varierende recepten. Simpel thuis bezorgt!
          </p>

          <h2 className="__h2 mt-14 uppercase">WEEKmenu Van</h2>
          <div className="mt-5">
            <div className="flex border-2 border-black border-r-0 w-fit">
              <DateBox date="25 - 01" month="NOV - DEC" />
              <DateBox date="02 - 08" month="DEC" />
              <DateBox date="09 - 15" month="DEC" />
              <DateBox date="16 - 22" month="DEC" />
            </div>
          </div>

          <div className="mt-9">
            <h3 className="__h3 uppercase font-bold"> categorieën</h3>
            <div className="mt-3 flex items-center gap-x-4">
              <div className="h-10 border-2 border-app-black rounded-lg w-full text-lg __c_all">
                Ontbijt
              </div>
              <div className="h-10 border-2 border-app-black rounded-lg w-full text-lg __c_all">
                Lunch
              </div>
              <div className="h-10 border-2 border-app-black rounded-lg w-full text-lg __c_all">
                Dinner
              </div>
              <div className="h-10 border-2 border-app-black rounded-lg w-full text-lg __c_all">
                Snacks
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 max-w-[50%] h-full bg-app-darker-green overflow-hidden">
        <Image
          src={"/imgs/alternatife-hero-img.jpg"}
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

const DateBox = ({ date, month }: { month: string; date: string }) => {
  return (
    <div className="h-[100px] aspect-square border-r-2 border-black flex flex-col justify-between p-3 text-base font-bold uppercase text-center">
      <span>{month}</span>
      <span>{date}</span>
    </div>
  );
};

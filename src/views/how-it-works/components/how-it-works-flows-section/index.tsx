import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

const HowItWorksFlowsSection = () => {
  return (
    <section className="my-[100px] space-y-[100px]">
      <Flow
        title="1. BEREKEN JOUW UNIEKE CALORIEEN BEHOEFTE"
        description="Doorloop ons simpel registratie systeem en bereken hiermee automatisch hoeveel calorieën jou lichaam nodig heeft om jou doelen te behalen. Geef ons ook aan hoeveel dagen van de week jij dit schema wilt volgen."
        imgSrc="/imgs/how-it-works/flow-1.png"
        imgLabel={{
          children: "Bereken",
          className: "bg-app-orange",
        }}
      />
      <Flow
        title="2. KIES JOUW RECEPTEN  "
        description="Na je registratie kun je elke week je favoriete maaltijden selecteren. Elke maaltijd is afgestemd op jouw dagelijkse behoeft om er voor te zorgen dat je alles uit je voeding haalt om al je doelen te behalen."
        imgSrc="/imgs/how-it-works/flow-2.png"
        imgLabel={{
          children: "Kies",
          className: "bg-app-green",
        }}
        reverseLayout
      />
      <Flow
        title="3. WEKELIJKS THUISBEZORGD"
        description="Jouw maaltijdboxen met de beste ingrediënten worden per dag verpakt en in de juiste porties compleet thuis bezorgd zodat jij het gemak hebt om direct aan de slag te kunnen gaan en geen tijd verliest met voorbereiding en/of boodschappen. Ook voorkomen we samen overschot aan voedsel, WIN-WIN dus!"
        imgSrc="/imgs/how-it-works/flow-3.png"
        imgLabel={{
          children: "Bezorg",
          className: "bg-app-orange",
        }}
      />
      <Flow
        title="4. KOOK MET DE GEZONDSTE INGREDIENTEN"
        description="Onze ingrediënten worden vers ingekocht en direct verzonden. Hierdoor geniet jij van de verste ingrediënten. Geniet volop van variatie in jou unieke maaltijdplan dankzij onze wekelijks wisselende recepten. Maaltijden perfect afgestemd op jouw doelen, vers gekookt en gemakkelijk in elkaar gezet, waar wacht je nog op?"
        imgSrc="/imgs/how-it-works/flow-4.png"
        imgLabel={{
          children: "Kook",
          className: "bg-app-green",
        }}
        reverseLayout
      />
    </section>
  );
};

export default HowItWorksFlowsSection;

type FlowProps = {
  title: string;
  description: string;
  imgSrc: string;
  imgLabel: HTMLAttributes<HTMLDivElement>;
  reverseLayout?: boolean;
};

const Flow = ({
  description,
  imgLabel: { className, ...imgLabelProps },
  imgSrc,
  title,
  reverseLayout,
}: FlowProps) => {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-[auto,600px] items-center gap-x-[100px]">
          <div className={cn(reverseLayout && "order-2")}>
            <h2 className="__h2 text-app-darker-green uppercase font-oswald font-normal">
              {title}
            </h2>
            <p className="__body_18 text-app-black max-w-[500px] mt-4">
              {description}
            </p>
          </div>
          <div className="bg-app-dark-grey/20 rounded-[20px] overflow-hidden relative">
            <div
              {...imgLabelProps}
              className={cn(
                "absolute top-10 left-0 z-10 rounded-r-2xl px-8 h-14 flex items-center justify-center __body_16 font-montserrat font-bold text-white bg-app-orange",
                className,
              )}
            />
            <Image src={imgSrc} width={800} height={580} alt={title} />
          </div>
        </div>
      </div>
    </section>
  );
};

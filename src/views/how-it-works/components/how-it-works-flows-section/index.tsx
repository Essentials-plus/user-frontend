import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

const HowItWorksFlowsSection = () => {
  return (
    <section className="my-[100px] space-y-[100px]">
      <Flow
        title="1. Bereken jouw persoonlijke caloriebehoefte"
        description="Om je te helpen met een maaltijdplan dat past bij jouw lichaam en doelen, beginnen we met een eenvoudige berekening. Tijdens het aanmeldproces vragen we om wat basisinformatie, zoals je leeftijd, gewicht, lengte en activiteitenniveau. Dit helpt ons te bepalen hoeveel calorieën je nodig hebt om gezond te blijven, aan te komen, of juist af te vallen. Geen zorgen als dit nieuw voor je is; we leggen alles uit en doen het rekenen voor jou!"
        imgSrc="/imgs/how-it-works/flow-1.png"
        imgLabel={{
          children: "Bereken",
          className: "bg-app-orange",
        }}
      />
      <Flow
        title="2. Kies de maaltijden die je lekker vindt"
        description="Na het berekenen van je caloriebehoefte kun je elke week kiezen uit verschillende maaltijden die speciaal voor jou zijn samengesteld. Elke maaltijd past binnen jouw energiebehoefte, zodat je precies krijgt wat je nodig hebt om je doel te bereiken. Je hoeft geen kookexpert te zijn; we kiezen recepten die lekker en makkelijk te maken zijn. Blader simpelweg door de opties en klik op de gerechten die je wilt ontvangen!"
        imgSrc="/imgs/how-it-works/flow-2.png"
        imgLabel={{
          children: "Kies",
          className: "bg-app-green",
        }}
        reverseLayout
      />
      <Flow
        title="3. Wekelijkse levering aan huis"
        description="Geen tijd om boodschappen te doen? Wij zorgen ervoor dat alle ingrediënten die je nodig hebt, netjes bij jou thuis worden bezorgd. Je ontvangt een box met verse producten, allemaal klaar voor gebruik. Op die manier hoef je niet na te denken over wat je in huis moet halen - wij doen het werk voor je! Dit zorgt ook voor minder voedselverspilling, omdat je precies krijgt wat je nodig hebt."
        imgSrc="/imgs/how-it-works/flow-3.png"
        imgLabel={{
          children: "Bezorg",
          className: "bg-app-orange",
        }}
      />
      <Flow
        title="4. Koken met de beste, verse ingrediënten"
        description="Nu komt het leukste gedeelte: koken en genieten van je maaltijden! Wij leveren alleen de meest verse en gezonde ingrediënten, zodat je elke week kunt genieten van gevarieerde en smakelijke gerechten. Elk recept is gemakkelijk te volgen en we sturen ook instructies mee. Dus zelfs als je niet vaak kookt, zul je merken dat het eenvoudig is om een heerlijke en voedzame maaltijd op tafel te zetten."
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
            <h2 className="__h2 font-oswald font-normal uppercase text-app-darker-green">
              {title}
            </h2>
            <p className="__body_18 mt-4 max-w-[500px] text-app-black">
              {description}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[20px] bg-app-dark-grey/20">
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

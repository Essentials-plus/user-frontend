import Image from "next/image";
import { ReactNode } from "react";

const YourGoalsSection = () => {
  return (
    <section className="my-[100px]">
      <div className="container">
        <h2 className="mx-auto max-w-[1148px] text-4xl font-semibold">
          Behaal je doelen met een persoonlijk supplementen advies{" "}
        </h2>
        <p className="max-w-[1148px] mx-auto __body_18 mt-6">
          Het supplementeren van je voeding is niet altijd nodig, maar kan wel
          een handje helpen. Onze experts creëren voor jou een op maat gemaakt
          supplementen gebaseerd op je voorkeuren en leefstijl. Haal je doelen
          alsof het niks is met onze tips en een uitgekiende maaltijdenplan. Bij
          interesse kunt u vrijblijvend uw vragen stellen via onze chat systeem
          of via de e-mail: advies@essentialsplus.eu.
        </p>

        <div className="mt-14">
          <div className="max-w-[1148px] mx-auto">
            <h2 className="mb-16 text-4xl font-semibold">
              Ons standaard aanbevolen supplementen
            </h2>

            <div className="space-y-16">
              <SingleRow
                circleColor="#39A137"
                product={{ title: "E+ Creatine", prcie: "€9,90" }}
                text={
                  <p>
                    <strong>Creatine</strong> <br />
                    Creatine voorziet spieren bij inspanning de eerste 6 tot 8
                    seconden van energie. Creatine is als supplement beschikbaar
                    als creatine monohydraat. Dit supplement kan sporters helpen
                    om beter te presteren tijdens kortdurende intensieve
                    inspanningen, zoals gewichtheffen of sprintjes kort op
                    elkaar.
                    <br />
                    <br />
                    Dit supplement helpt ook je prestaties tijdens reguliere
                    werkzaamheden. Klik hiernaast om de E+ Creatine in je
                    winkelwagen toe te voegen.
                  </p>
                }
              />
              <SingleRow
                circleColor="#EE4E34"
                product={{ title: "E+ Whey Poeder" }}
                text={
                  <p>
                    <strong> Whey Poeder</strong> <br />
                    Whey eiwitpoeder is een bekend middel onder intensieve
                    sporters, zoals bodybuilders en fanatieke krachtsporters.
                    Het helpt bij het opbouwen van spiermassa en bij het herstel
                    van spieren. Het kan helpen bij afvallen door honger gevoel
                    te verminderen en stofwisseling te verhogen. <br />
                    <br />
                    Whey eiwitpoeder helpt met het eenvoudig behalen of
                    supplementeren van je eiwitdoelen. Klik hiernaast om de E+
                    Whey in je winkelwagen toe te voegen.
                  </p>
                }
                isRtl
              />

              <SingleRow
                circleColor="#39A137"
                product={{ title: "E+ Multivitaminen", prcie: "€44,90" }}
                text={
                  <p>
                    <strong>Multivitaminen</strong> <br />
                    Een multivitamine is een voedingssupplement met een groot
                    aantal verschillende voedingsstoffen. Een multivitamine
                    bevat diverse vitamines waaronder vitamine B, C, D en E maar
                    ook koper, magnesium, zink en foliumzuur. <br />
                    <br />
                    Een multivitamine kan een waardevolle aanvulling zijn op een
                    gezonde levensstijl, juist als het even niet lukt om deze
                    vitamines en mineralen uit je dagelijkse voeding te halen.
                    Klik hiernaast om de E+ Multivitaminen in je winkelwagen toe
                    te voegen.
                  </p>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourGoalsSection;

const SingleRow = ({
  circleColor,
  product,
  text,
  isRtl,
}: {
  circleColor: string;
  product: {
    title: string;
    prcie?: string;
  };
  text: ReactNode | string;
  isRtl?: boolean;
}) => {
  return (
    <div
      className="grid grid-cols-[259px,auto] gap-x-16"
      style={{ direction: isRtl ? "rtl" : "unset" }}
    >
      <div>
        <div className="flex justify-center">
          <div className="relative isolate">
            <div
              className="w-[125px] aspect-square rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[-1]"
              style={{ background: circleColor }}
            ></div>
            <Image
              src={"/imgs/pouch-mockup.png"}
              alt="POUCH-MOCKUP"
              width={646}
              height={1024}
              className="max-w-[104px]"
            />
          </div>
        </div>
        <h4 className="mt-3.5 mb-2 text-lg font-bold text-center">
          {product.title}
        </h4>
        <p className="__body_18 text-center mb-2">{product.prcie}</p>
        <div className="flex justify-center mb-2">
          <button className="rounded-lg border-2 border-app-dark-green h-10 px-5">
            In winkelmandje +
          </button>
        </div>
        <a
          href="#"
          className="text-sm underline mx-auto block text-center w-fit"
        >
          Bekijk product
        </a>
      </div>

      <div className="__body_18" style={{ direction: isRtl ? "ltr" : "unset" }}>
        {text}
      </div>
    </div>
  );
};

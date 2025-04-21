import Image from "next/image";

const OverAssentialsSection = () => {
  return (
    <section className="mt-8 lg:mt-[112px]">
      <div className="container">
        <div className="flex flex-col-reverse gap-x-[100px] gap-y-5 lg:grid lg:grid-cols-[auto,550px] lg:items-center">
          <div>
            <h2 className="__h4 lg:__h2">Word Partner van Essentials+</h2>
            <div className="__body_16 lg:__body_18 mt-2 lg:mt-4">
              Ben jij enthousiast over gezond leven en voeding? Wil je jouw
              passie delen en tegelijkertijd extra inkomsten genereren? Sluit je
              aan bij ons Affiliates Partner-programma en word onderdeel van
              onze missie om gezond eten toegankelijk te maken voor iedereen!{" "}
              <br />
              <br />
              Waarom Partner Worden? <br />
              <br />
              <ul className="space-y-2.5 pl-10 [&>li]:list-item [&>li]:list-disc">
                <li>
                  Hoge Commissies: Verdien aantrekkelijke commissies op iedere
                  aankoop die via jouw unieke link wordt gedaan.
                </li>
                <li>
                  Exclusieve Voordelen: Toegang tot speciale acties, kortingen
                  en campagnes, alleen beschikbaar voor onze partners.
                </li>
                <li>
                  Eenvoudig Te Delen: Maak gebruik van onze marketingtools,
                  zoals banners, socialmediaposts en gepersonaliseerde links, om
                  jouw publiek te bereiken.
                </li>
                <li>
                  Persoonlijke Ondersteuning: Ons team staat altijd klaar om je
                  te helpen succesvol te worden.
                </li>
              </ul>
            </div>
          </div>
          <div className="h-full">
            <Image
              src={"/imgs/affiliates-partner/section-1-img.jpg"}
              alt="section-1-img"
              width={1000}
              height={667}
              className="size-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverAssentialsSection;

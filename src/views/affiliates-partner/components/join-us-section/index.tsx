import { button } from "@/common/components/ui/button";
import { essentialsPlusEmail } from "@/constants";
import Image from "next/image";

const JoinUsSection = () => {
  return (
    <section className="mb-8 mt-14 lg:my-[112px]">
      <div className="container">
        <div className="flex flex-col gap-x-[100px] gap-y-5 lg:grid lg:grid-cols-[550px,auto] lg:items-center">
          <Image
            src={"/imgs/affiliates-partner/section-2-img.jpg"}
            alt="section-2-img"
            width={1358}
            height={1086}
            className="size-full object-cover object-center"
          />

          <div>
            <h2 className="__h4 lg:__h2">Hoe Werkt Het?</h2>
            <div className="__body_16 lg:__body_18 mt-2 lg:mt-4">
              <ul className="space-y-2.5 pl-10 [&>li]:list-item [&>li]:list-disc">
                <li>
                  Meld Je Aan: Vul eenvoudig het aanmeldformulier in en maak een
                  account aan.
                </li>
                <li>
                  Deel Jouw Link: Ontvang een unieke affiliate-link en deel deze
                  via jouw website, sociale media of nieuwsbrieven.
                </li>
                <li>
                  Verdien Commissies: Krijg betaald voor elke verkoop die wordt
                  gegenereerd via jouw link.
                </li>
              </ul>
            </div>

            <h3 className="__h4 lg:__h2 mt-6">Sluit Je Vandaag Nog Aan!</h3>
            <div className="__body_16 lg:__body_18 mt-2 lg:mt-4">
              <p>
                Samen maken we gezonde keuzes eenvoudiger en toegankelijker.
                Klik op de knop hieronder en meld je aan om vandaag nog te
                starten.
              </p>

              <a
                className={button({
                  intent: "primary",
                  className: "w-fit mt-5",
                })}
                href={`mailto:${essentialsPlusEmail}`}
              >
                Word Partner
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;

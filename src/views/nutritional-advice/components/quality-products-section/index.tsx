import CheckIcon from "@/common/components/icons/check-icon";
import { button } from "@/common/components/ui/button";
import { registerRouteWithRedirectToOnboarding } from "@/config/routes";
import Image from "next/image";
import Link from "next/link";

const QualityProductsSection = () => {
  return (
    <section className="my-8 lg:my-[104px]">
      <div className="container">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-x-16 gap-y-4 lg:grid-cols-[405px,auto]">
          <div className="size-full bg-[#CCCCCC]">
            <Image
              src={"/imgs/nutritional-advice/section-1.jpg"}
              alt="Gezond, Lekker en Makkelijk"
              width={1000}
              height={667}
              className="size-full object-cover object-center"
            />
          </div>
          <div>
            <h2 className="__h4 lg:__h2 font-oswald">
              Gezond, Lekker en Makkelijk
            </h2>
            <p className="__body_16 mb-4 mt-2 text-app-text lg:mb-10 lg:mt-7">
              Met Essentialst maak je een einde aan ingewikkelde diëten en
              eentonige maaltijden. Onze recepten zijn:
            </p>
            <ul className="space-y-3 font-montserrat text-app-green lg:space-y-5">
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5 shrink-0" />
                <span>
                  Voedzaam: Elk gerecht zit boordevol essentiële
                  voedingsstoffen.
                </span>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5 shrink-0" />
                <span>
                  Smaakvol: Geniet van heerlijke smaken die passen bij jouw
                  doelen.
                </span>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5 shrink-0" />
                <span>
                  Eenvoudig: Geen ingewikkelde bereidingswijzen - onze recepten
                  zijn makkelijk te volgen en klaar in een handomdraai.
                </span>
              </li>
            </ul>

            <p className="__body_16 mt-7 text-app-text">Start Vandaag Nog!</p>
            <p className="__body_16 mt-3 text-app-text">
              Kies voor gemak en kwaliteit. Laat Essentials+ jou begeleiden naar
              een gezonder leven met voedzame, gevarieerde maaltijden die
              speciaal voor jou zijn samengesteld.
            </p>

            <Link
              className={button({ className: "mt-5 w-fit" })}
              href={registerRouteWithRedirectToOnboarding}
            >
              Start Nu Jouw Schema
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityProductsSection;

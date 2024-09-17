import CheckIcon from "@/common/components/icons/check-icon";
import Image from "next/image";

const QualityProductsSection = () => {
  return (
    <section className="mt-[72px]">
      <div className="container">
        <div className="grid grid-cols-[500px,auto] gap-x-20 items-center">
          <Image
            src={"/imgs/our-story/quality-products-section-img.jpg"}
            alt="quality-products-section-img"
            width={1358}
            height={1142}
            className="h-full object-cover"
          />

          <div>
            <h2 className="uppercase __h2 font-oswald font-normal max-w-[620px]">
              Alleen kwaliteitsproducten voor jou
            </h2>
            <p className="my-8 __body_16 leading-8">
              Als je de gemiddelde persoon vraagt ​​die lijdt aan overgewicht,
              gastritis, zweren of andere problemen die deze toestand van het
              lichaam veroorzaken, zal hij zeker een baan aangeven. Omdat we ons
              realiseerden hoe hard caloriearm voedsel nodig is voor mensen die
              worstelen met verschillende problemen of een banaal gebrek aan
              tijd, hebben we nagedacht over de nuances van het verstrekken van
              voedsel dat gezonde voeding thuis biedt.
            </p>

            <ul className="space-y-5">
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5" />
                <p className="__body_16 font-medium text-app-green">
                  Mensen die willen afvallen;
                </p>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5" />
                <p className="__body_16 font-medium text-app-green">
                  Atleten en degenen die een actieve levensstijl leiden;
                </p>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5" />
                <p className="__body_16 font-medium text-app-green">
                  Zwangere en zogende vrouwen;
                </p>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5" />
                <p className="__body_16 font-medium text-app-green">
                  Vegetariërs en veganisten;
                </p>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5" />
                <p className="__body_16 font-medium text-app-green">Vasten;</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityProductsSection;

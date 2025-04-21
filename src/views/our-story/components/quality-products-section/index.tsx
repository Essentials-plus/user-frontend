import CheckIcon from "@/common/components/icons/check-icon";
import Image from "next/image";

const QualityProductsSection = () => {
  return (
    <section className="mb-8 mt-5 lg:mb-[107px] lg:mt-[72px]">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-x-20 gap-y-4 lg:grid-cols-[500px,auto]">
          <Image
            src={"/imgs/our-story/quality-products-section-img.jpg"}
            alt="quality-products-section-img"
            width={1358}
            height={1142}
            className="h-full object-cover"
          />

          <div>
            <h2 className="__h4 lg:__h2 max-w-[620px] font-oswald font-normal uppercase">
              Kwaliteit en versheid voor iedereen
            </h2>
            <p className="__body_16 my-2 leading-8 lg:my-8">
              Bij Essentials+ draait alles om kwaliteit. Wij selecteren de beste
              ingrediënten en ontwerpen onze maaltijden met zorg en aandacht
              voor verschillende doelgroepen:
            </p>

            <ul className="space-y-3 max-lg:mt-4 lg:space-y-5">
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5 shrink-0" />
                <p className="__body_16 font-medium text-app-green">
                  Mensen die willen afvallen.
                </p>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5 shrink-0" />
                <p className="__body_16 font-medium text-app-green">
                  Atleten en actieve levensgenieters. leiden;
                </p>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5 shrink-0" />
                <p className="__body_16 font-medium text-app-green">
                  Zwangere en borstvoedende vrouwen.
                </p>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5 shrink-0" />
                <p className="__body_16 font-medium text-app-green">
                  Vegetariërs en veganisten.
                </p>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5 shrink-0" />
                <p className="__body_16 font-medium text-app-green">
                  Edereen die kiest voor een gezondere levensstijl.
                </p>
              </li>
            </ul>

            <p className="__body_16 my-8 leading-8">
              Elke maaltijd is afgestemd op jouw behoeften, zodat jij zonder
              moeite kunt genieten van voedzaam eten dat perfect in balans is.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityProductsSection;

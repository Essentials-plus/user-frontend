import CheckIcon from "@/common/components/icons/check-icon";

const QualityProductsSection = () => {
  return (
    <section className="mt-[104px]">
      <div className="container">
        <div className="max-w-[1100px] mx-auto grid grid-cols-[405px,auto] gap-x-16">
          <div className="w-full h-full bg-[#CCCCCC]"></div>
          <div>
            <h2 className="__h2 font-oswald">
              Alleen kwaliteitsproducten voor u
            </h2>
            <p className="mt-7 mb-10 __body_16 text-app-text">
              Als je de gemiddelde persoon met overgewicht vraagt: gastritis,
              zweren of andere problemen die deze aandoening veroorzaakten het
              lichaam, hij zal zeker werkgelegenheid aangeven. Realiseren hoe Er
              is slecht caloriearm voedsel nodig voor mensen die het moeilijk
              hebben met allerlei problemen of een banaal gebrek aan tijd,
              hebben we gedacht door de nuances van het verstrekken van voedsel
              dat gezond is voeding thuis.
            </p>
            <ul className="space-y-5 font-montserrat text-app-green">
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5" />
                <span>mensen die willen afvallen;</span>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5" />
                <span>
                  atleten en degenen die een actieve levensstijl leiden;
                </span>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5" />
                <span>zwangere en zogende vrouwen;</span>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5" />
                <span>vegetariërs en veganisten;</span>
              </li>
              <li className="flex items-center gap-x-4">
                <CheckIcon className="w-5" />
                <span>vasten;</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityProductsSection;

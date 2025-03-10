import { helpSectionCards } from "@/constants/help-section-cards";

const HelpSection = () => {
  return (
    <section className="mb-[104px] mt-[60px]">
      <div className="container">
        <h2 className="__h2 text-center">Hoe kunnen we je helpen?</h2>
        <p className="__body_16 mx-auto mt-5 max-w-[1100px] text-center">
          Heb je een vraag over onze producten, plantaardig eten of gezondheid?
          We zijn er voor je. Je mag ons mailen, appen of bellen. We horen graag
          waarmee we je kunnen helpen. En fanmail sturen mag altijd.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-x-6">
          {helpSectionCards.map(({ description, icon, title, value }, i) => (
            <div key={i} className="bg-app-darker-green p-10">
              <div className="__c_all mx-auto aspect-square w-20 rounded-full border-4 border-white text-4xl text-white">
                {icon}
              </div>
              <div className="mt-5 text-center text-white">
                <h4 className="__h4">{title}</h4>
                <p className="__body_16 mx-auto mt-3">{description}</p>
                <div className="__body_16 mx-auto mt-3">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;

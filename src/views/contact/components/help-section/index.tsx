import { helpSectionCards } from "@/constants/help-section-cards";

const HelpSection = () => {
  return (
    <section className="mt-[60px] mb-[104px]">
      <div className="container">
        <h2 className="__h2 text-center">Hoe kunnen we je helpen?</h2>
        <p className="max-w-[1100px] mx-auto text-center __body_16 mt-5">
          Heb je een vraag over onze producten, plantaardig eten of gezondheid?
          We zijn er voor je. Je mag ons mailen, appen of bellen. We horen graag
          waarmee we je kunnen helpen. En fanmail sturen mag altijd.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-x-6">
          {helpSectionCards.map(({ description, icon, title }, i) => (
            <div key={i} className="p-10 bg-app-darker-green">
              <div className="mx-auto w-20 aspect-square rounded-full border-4 border-white __c_all text-white text-4xl">
                {icon}
              </div>
              <div className="mt-5 text-center text-white">
                <h4 className="__h4">{title}</h4>
                <p className="__body_16 mx-auto lg:max-w-[60%] mt-3">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;

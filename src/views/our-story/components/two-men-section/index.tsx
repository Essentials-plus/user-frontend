import Image from "next/image";

const TwoMenSection = () => {
  return (
    <section className="mt-8 bg-app-yellow pb-4 lg:mt-[108px] lg:py-16">
      <div className="container max-lg:px-0">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-4 lg:grid-cols-[450px,auto] lg:px-20">
          <Image
            src={"/imgs/our-story/two-men-section-img.jpg"}
            alt="two-men-section-img"
            width={916}
            height={1018}
          />

          <div className="max-lg:px-4">
            <h2 className="__h4 lg:__h2">
              Een visie om de fitness- en voedingswereld te veranderen{" "}
            </h2>
            <p className="__body_16 mt-4 lg:mt-10">
              Essentials+ is ontstaan uit een gedeelde passie om mensen te
              helpen gezonder te leven. Waar andere merken zich vaak richten op
              één maaltijd of algemene oplossingen, hebben wij gekozen voor een
              allesomvattende aanpak.
              <br />
              <br />
              Ons concept gaat verder dan alleen gezond eten. Het draait om
              gemak, persoonlijke aandacht en een focus op jouw unieke
              behoeften. Voor ons betekent gezondheid meer dan goede voeding:
              het is een complete levensstijl.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoMenSection;

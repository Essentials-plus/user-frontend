import Image from "next/image";

const TwoMenSection = () => {
  return (
    <section className="mt-[108px] bg-app-yellow py-16">
      <div className="container">
        <div className="grid grid-cols-[450px,auto] items-center gap-x-16 px-20">
          <Image
            src={"/imgs/our-story/two-men-section-img.jpg"}
            alt="two-men-section-img"
            width={916}
            height={1018}
          />

          <div>
            <h2 className="__h2">
              Een visie om de fitness- en voedingswereld te veranderen{" "}
            </h2>
            <p className="__body_16 mt-10">
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

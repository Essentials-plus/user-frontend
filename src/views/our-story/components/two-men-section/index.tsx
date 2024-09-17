import Image from "next/image";

const TwoMenSection = () => {
  return (
    <section className="mt-[108px] py-16 bg-app-yellow">
      <div className="container">
        <div className="grid grid-cols-[450px,auto] gap-x-16 items-center px-20">
          <Image
            src={"/imgs/our-story/two-men-section-img.jpg"}
            alt="two-men-section-img"
            width={916}
            height={1018}
          />

          <div>
            <h2 className="__h2">
              Twee mannen met het idee om de Fitness-game te veranderen.
            </h2>
            <p className="mt-10 __body_16">
              Bij andere merken draaide het alleen om 1 maaltijd, bevroren of
              vers te leveren voor een gezonder leven. Wij richting ons de
              gehele week en afgestemd op jou unieke lichaamskaraktristieken
              zoals lengte, gewicht en activiteiten niveau.
              <br />
              <br />
              Echte gezondenheid begint met je voedingspatroon, supplementen
              zijn zoals ze genoemd zijn ter supplementie.
              <br />
              <br />
              Voor een gezonder generatie, Essentials+
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoMenSection;

import Image from "next/image";

const OverAssentialsSection = () => {
  return (
    <section className="mt-[112px]">
      <div className="container">
        <div className="grid grid-cols-[auto,450px] gap-x-[150px] items-center">
          <div>
            <h2 className="__h2">Over Essentials+</h2>
            <p className="mt-4 __body_18">
              Essentials+ maakt van je dagelijkse voedingsroutine een moment om
              naar uit te kijken. Nooit meer nadenken over wat je moet koken,
              geen gehaaste bezoekjes aan de supermarkt én geen
              voedselverspilling. <br />
              <br />
              Krijg een box vol met de beste verse ingrediënten en makkelijk te
              volgen receptkaarten thuisbezorgd en zet in een handomdraai verse,
              gevarieerde maaltijden op tafel of on the go! <br />
              <br />
              Voor de kei harde fitness enthousiast tot en met de
              kantoorgebonden work-a-holic. Essentials+ calculeert op basis van
              jou karakteristieke eigenschappen het exacte hoeveelheid voeding
              welke jij moet nuttigen.
            </p>
          </div>
          <Image
            src={"/imgs/affiliates-partner/section-1-img.png"}
            alt="section-1-img"
            width={1000}
            height={1234}
          />
        </div>
      </div>
    </section>
  );
};

export default OverAssentialsSection;

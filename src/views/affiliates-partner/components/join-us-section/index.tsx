import Image from "next/image";

const JoinUsSection = () => {
  return (
    <section className="my-[112px]">
      <div className="container">
        <div className="grid grid-cols-[500px,auto] gap-x-20 items-center">
          <Image
            src={"/imgs/affiliates-partner/section-2-img.jpg"}
            alt="section-2-img"
            width={1358}
            height={1086}
          />

          <div>
            <h2 className="__h2">Sluit je aan bij ons partnerprogramma</h2>
            <p className="mt-4 __body_18">
              Heb jij een eigen website? Ben je een food- of lifestyleblogger?
              Of misschien een expert op het gebied van sociale media? Word dan
              partner van Essentials+ en profiteer van de voordelen van ons
              succesvolle groeiende merk.
              <br />
              <br />
              Met het Essentials+ Partnerprogramma stimuleer je een beter
              eetpatroon en inspireer je anderen met lekkere gevarieerde
              recepten.
              <br />
              <br />
              Bovendien kun je er zelf ook nog wat aan verdienen! Je wordt
              beloond voor elke betalende klant die je naar ons doorstuurt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;

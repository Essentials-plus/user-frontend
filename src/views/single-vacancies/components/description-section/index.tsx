const DescriptionSection = () => {
  return (
    <section className="mt-[76px] mb-[101px]">
      <div className="container">
        <div className="max-w-[1010px] mx-auto">
          <p className="text-lg font-semibold">
            Locatie: Tilburg | Aantal uur: 40 (full time) | Contract: Flexibel |
            Opleiding: MBO | Werkervaring: +1 jaar
          </p>
          <div className="mt-7">
            <h4 className="__h4">Over het werk</h4>
            <p className="mt-3">
              Team Essentials+ is op zoek naar een orderpicker voor in ons
              magazijn. Een nette maar fanatieke werker die het lekker vindt de
              handen uit de mouwen te steken en tegelijkertijd netjes te werk
              gaat. Benieuwd hoe je werk eruitziet? <br />
              <br />
              Samen met je collega’s verwerk je alle bestellingen van onze
              klanten, zowel particulier (online) als zakelijk (B2B). Alle
              pakketten pak je netjes in en je zorgt ervoor dat de klanten de
              volgende werkdag hun bestelling in huis hebben. Je bent natuurlijk
              samen met het team aan het werk maar zelfstandig werken is ook erg
              belangrijk :)
            </p>
          </div>

          <div className="mt-12">
            <h4 className="__h4">Over het werk</h4>
            <div className="mt-3">
              <ul className="list-disc list-inside">
                <li>Per direct aan de slag;</li>
                <li>
                  Full time inzetbaar: 40 uur per week, van maandag t/m vrijdag
                  van 08.30 tot 17.00 uur;
                </li>
                <li>
                  Lichamelijk goed in conditie want je bent veel aan het lopen;
                </li>
                <li>
                  Werkzaamheden zelfstandig en soepel uitvoeren is voor jou geen
                  probleem;
                </li>
                <li>
                  Het liefst heb je minimaal 1 jaar gerelateerde werkervaring;
                </li>
                <li>Wonen doe je in de buurt van Alkmaar of omgeving;</li>
                <li>
                  Secuur: je vindt het leuk om alle pakketten netjes in te
                  pakken;
                </li>
                <li>
                  Teamplayer: je werkt goed zelfstandig, maar uiteindelijk doen
                  we het met ze allen:
                </li>
                <li>
                  Goed in de beheersing van de Nederlandse taal (zowel in woord
                  als geschrift).
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="__h4">Wat mag je van ons verwachten:</h4>
            <ul className="list-disc list-inside mt-3">
              <li>
                Leuke baan bij een nuchter bedrijf met Europese groeiambitie;
              </li>
              <li>Een goed salaris en een gezellig team;</li>
              <li>Gloednieuw kantoor met de mogelijkheid om te sporten;</li>
              <li>Leuke personeelsuitjes;</li>
              <li>Mogelijkheid om mee te groeien met onze Europese ambitie;</li>
              <li>
                Vakantiedagen, vakantiegeld, reiskostenvergoeding en pensioen;
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <h4 className="__h4">Stuur een mailtje met je motivatie:</h4>
            <a
              href={`mailto:vacature@essentialsplus.eu`}
              className="h-10 px-10 __c_all text-lg font-bold text-white bg-app-darker-green rounded-md w-fit duration-200 hover:bg-app-dark-green/80 mt-3"
            >
              vacature@essentialsplus.eu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;

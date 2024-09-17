const DescriptionSection = () => {
  return (
    <section className="my-[101px]">
      <div className="container">
        <div className="max-w-[1010px] mx-auto __body_16">
          <p>
            Ben je niet tevreden over een van onze producten of is iets toch
            niet naar wens? Jammer, maar geen probleem! We hanteren een niet
            goed, geld terug-garantie. Daarmee kun je de bestelling retourneren
            en je geld terug ontvangen. Zelfs als de verpakking al geopend is.
            Hoe dat werkt? Dat lees je hieronder.
          </p>
          <p className="mt-5">
            <strong className="block">Hoe retourneer ik?</strong>
            Stuur ons een mailtje via info@essentialsplus.eu, en laat ons weten
            dat je iets wilt retourneren.
          </p>
          <div className="mt-5">
            <strong className="block">Wat zijn de voorwaarden?</strong>
            <ul>
              <li className="list-disc list-inside">
                Retourneren mag binnen maximaal 14 dagen nadat je je bestelling
                ontvangen hebt.
              </li>
              <li className="list-disc list-inside">
                Retourneren kan alleen via ons eigen retour portaal en als je
                een bestelling hebt geplaatst via de EssentialsPlus website.
              </li>
              <li className="list-disc list-inside">
                Er mogen niet meer dan 5 schepjes of 10% (bij vitamines en
                mineralen) uit een verpakking gehaald zijn - de geretourneerde
                verpakking(en) worden nadat we ze ontvangen hebben gewogen.
              </li>
              <li className="list-disc list-inside">
                Deze service geldt alleen als je een product of smaak nog niet
                eerder hebt besteld.
              </li>
              <li className="list-disc list-inside">
                De verzendkosten voor het retourneren zijn voor eigen rekening.
              </li>
              <li className="list-disc list-inside">
                Heb je bij je bestelling producten ontvangen die bij een pakket
                horen? Dan dien je die ook te retourneren.
              </li>
            </ul>
          </div>
          <div className="mt-5">
            <strong className="block">Herroepingsrecht</strong>
            <ul>
              <li className="list-disc list-inside">
                Je hebt het recht om binnen een termijn van 14 dagen je
                bestelling te annuleren. Als je dat niet wilt, hoef je daar geen
                reden voor op te geven. De herroepingstermijn verstrijkt 14
                dagen na de dag waarop jij (of een door jouw aangewezen derde
                die niet de vervoerder is) het product in bezit krijgt.Om het
                herroepingsrecht in werking te laten treden moet je ons via een
                ondubbelzinnige verklaring (bijvoorbeeld schriftelijk, per post,
                fax of e-mail) op de hoogte stellen de overeenkomst te
                herroepen. Klinkt ingewikkeld, maar dat valt reuze mee. We
                hebben een modelformulier voor herroeping voor je gemaakt om te
                gebruiken, al ben je daar niet toe verplicht. Om de
                herroepingstermijn na te leven is het genoeg om je mededeling
                omtrent het uitoefenen ervan te verzenden voordat de
                herroepingstermijn van 14 dagen is verstreken. De snelste manier
                om dat te doen is gewoon ons eigen retourformulier.
              </li>
              <li className="list-disc list-inside">
                Als je de overeenkomst herroept, ontvang je alle betalingen die
                je tot op dat moment hebt gedaan, inclusief leveringskosten
                (maar met uitzondering van eventuele extra kosten omdat je hebt
                gekozen iets anders dan de ons geboden goedkoopste
                standaardlevering) onverwijld en in ieder geval niet later dan
                14 dagen nadat wij op de hoogte zijn gesteld van je beslissing
                de overeenkomst te herroepen, van ons terug.
              </li>
              <li className="list-disc list-inside">
                {
                  "Als je slechts een deel van je bestelling retour stuurt, worden de kosten voor retourzending niet teruggestort. We betalen je terug via hetzelfde betaalmiddel als waarmee je de oorspronkelijke betaling hebt verricht, tenzij je uitdrukkelijk anderszins hebt ingestemd; in ieder geval zal voor zo'n terugbetaling geen kosten in rekening worden gebracht. We mogen wachten met terugbetaling totdat we de producten hebben teruggekregen, of je hebt aangetoond dat je de producten hebt teruggestuurd."
                }
              </li>
              <li className="list-disc list-inside">
                {
                  "Je dient de producten in ieder geval niet later dan 14 dagen na de dag waarop je het besluit de overeenkomst te herroepen aan ons hebt medegedeeld, aan ons terug te sturen of overhandigen. Je bent op tijd als je de goederen terugstuurt voordat de termijn van 14 dagen is verstreken. Directe kosten van het terugzenden van je bestelling zijn voor eigen rekening."
                }
              </li>
            </ul>
          </div>
          <p className="mt-5"></p>
          <p className="mt-5"></p>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;

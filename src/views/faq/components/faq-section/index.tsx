import { essentialsPlusEmail } from "@/constants";
import FaqDynamicDivision from "@/views/faq/components/faq-dynamic-division";

const FaqSection = () => {
  return (
    <section className="my-[101px]">
      <div className="container">
        <div className="mx-auto max-w-[1000px] space-y-[100px]">
          <FaqDynamicDivision
            title="E+ maaltijdplannen"
            faqs={[
              {
                title: "Hoe werkt het persoonlijke maaltijdplan precies?",
                description:
                  "Bij EssentialsPlus hoef je je geen zorgen te maken over het zelf samenstellen van maaltijden. Wij doen het werk voor jou! Je krijgt per maaltijd de keuze uit 3 tot 4 recepten die speciaal zijn afgestemd op jouw persoonlijke doelen en voorkeuren. De ingrediënten voor elk recept worden precies afgemeten en per maaltijd verpakt, zodat je altijd de juiste hoeveelheden hebt. Alles wat je nog hoeft te doen, is het recept volgen om een heerlijke en voedzame maaltijd op tafel te zetten. Zo wordt gezond eten eenvoudig en haalbaar!",
              },
              {
                title:
                  "Zijn de ingrediënten vers en gezond, en hoe vaak worden de maaltijden bezorgd?",
                description:
                  "Bij EssentialsPlus werken we met verse ingrediënten die direct na bestelling worden ingepakt. Zodra de bestellingen voor jouw postcodegebied zijn verwerkt, bestellen wij de ingrediënten en zorgen we dat ze de volgende ochtend worden verzonden. Voor maaltijdplannen van 1 tot 4 dagen is er één bezorgmoment per week. Voor maaltijdplannen van 5, 6 of 7 dagen zijn er twee bezorgmomenten, zodat je ook op de laatste dag kunt genieten van de versheid van de ingrediënten. Op deze manier zorgen we ervoor dat jouw maaltijden altijd zo vers mogelijk zijn!",
              },
              {
                title:
                  "Kan ik de maaltijden aanpassen voor specifieke dieetwensen, zoals vegetarisch of veganistisch, of als ik allergieën heb?",
                description:
                  "Bij EssentialsPlus hebben we elke week een ruime selectie van 7 tot 14 verschillende recepten per maaltijd, speciaal ontworpen voor diverse dieetwensen. Hoewel de individuele recepten niet aangepast kunnen worden, kun je zelf kiezen welke maaltijden het beste bij jouw dieet passen. Of je nu vegetarisch, veganistisch eet of specifieke voedingsvoorkeuren hebt, er is altijd wel een geschikte optie in ons aanbod. Zo kun je elke week variëren en toch trouw blijven aan jouw voedingsbehoeften!",
              },
              {
                title:
                  "Hoeveel kost een abonnement, en kan ik het op elk moment pauzeren of annuleren?",
                description:
                  "De kosten van je abonnement bij EssentialsPlus zijn volledig afgestemd op jouw persoonlijke caloriebehoefte en het aantal dagen dat je maaltijden ontvangt. We hanteren een vaste prijs per calorie, zodat je altijd eerlijk betaalt voor wat je nodig hebt. Bijvoorbeeld, iemand met een behoefte van 2000 kcal per dag voor 7 dagen betaalt een andere abonnementsprijs dan iemand die 2400 kcal per dag nodig heeft voor 2 dagen, maar de prijs per calorie blijft gelijk. Je kunt je abonnement op elk moment opzeggen. Zodra je opzegt, stopt de wekelijkse betalingsverplichting direct. Zo bieden we je maximale flexibiliteit!",
              },
            ]}
          />
          <FaqDynamicDivision
            title="E+ Supplementen"
            faqs={[
              {
                title:
                  "Welke supplementen passen het beste bij mijn persoonlijke doelen?",
                description:
                  "Zoals de naam al zegt, zijn supplementen bedoeld om je maaltijden aan te vullen en niet om deze te vervangen. Bij EssentialsPlus zorgen we ervoor dat je met ons volledige pakket al alle essentiële voedingsstoffen binnenkrijgt, zodat extra supplementen meestal niet nodig zijn. Toch zijn er enkele supplementen die voor bijna iedereen nuttig kunnen zijn, ongeacht je doelen. Denk hierbij aan creatine voor extra spierkracht, vitamine D en zink voor je immuunsysteem, en Omega-3 voor een gezonde hartfunctie. Deze supplementen kunnen je helpen om nog net dat beetje extra uit je voeding en training te halen!",
              },
              {
                title: "Zijn de supplementen veilig en gecertificeerd?",
                description: `Ja, al onze supplementen zijn veilig en gecertificeerd, zodat je ze met een gerust hart kunt gebruiken. We werken samen met betrouwbare leveranciers die voldoen aan de hoogste kwaliteitsnormen. Heb je nog vragen of wil je inzicht in de leverancier en certificaten? Stuur ons gerust een e-mail op ${essentialsPlusEmail}, dan voorzien we je graag van de benodigde informatie.`,
              },
              {
                title:
                  "Kan ik supplementen en kleding combineren in mijn abonnement of bestelling?",
                description:
                  "Supplementen en kleding zijn apart verkrijgbaar in onze webshop onder de pagina 'Lifestyle' en staan los van de maaltijdabonnementen. Dit betekent dat we deze producten ook apart leveren. Onze maaltijdboxen worden in een gecontroleerde, gekoelde omgeving bezorgd, wat voor supplementen en kleding niet nodig is. Als je zowel supplementen als een maaltijdbox bestelt, kun je dus verschillende leveringen verwachten. Op deze manier zorgen we ervoor dat elk product onder de beste omstandigheden bij jou aankomt.",
              },
              {
                title: "Waar kan ik mijn kortingscode invoeren?",
                description:
                  "Tijdens het afrekenen kun je eenvoudig je kortingscode invoeren op de winkelmandpagina. Zodra je de code hebt ingevoerd en bevestigd, wordt de korting direct verwerkt in het totaalbedrag. Zo zie je meteen hoeveel je bespaart!",
              },
            ]}
          />
          <FaqDynamicDivision
            title="Account"
            faqs={[
              {
                title: "Hoe maak ik een account aan bij EssentialsPlus?",
                description: (
                  <>
                    Je kunt eenvoudig een account aanmaken door op het
                    profielicoontje rechtsboven te klikken. EssentialsPlus biedt
                    twee soorten accounts:
                    <ul className="my-5 list-item list-disc space-y-2.5 pl-5 [&>li]:pl-3">
                      <li>
                        <span className="font-bold">
                          Webshop/Lifestyle Account:
                        </span>{" "}
                        Dit account kun je aanmaken tijdens het bestellen van
                        producten in onze webshop. Je hebt de keuze om in te
                        loggen, een nieuw account aan te maken, of als gast af
                        te rekenen.
                      </li>
                      <li>
                        <span className="font-bold">
                          Maaltijdbox Abonnementsaccount:
                        </span>{" "}
                        Dit account wordt aangemaakt wanneer je een
                        maaltijdbox-abonnement afsluit. Tijdens het aanmaken
                        vragen we enkele persoonlijke gegevens om jouw
                        caloriebehoefte te berekenen en je maaltijden daarop af
                        te stemmen.
                      </li>
                    </ul>
                    Zo zorgen we ervoor dat je account perfect aansluit bij jouw
                    bestellingen en doelen!
                  </>
                ),
              },
              {
                title:
                  "Hoe kan ik mijn persoonlijke gegevens of abonnementsvoorkeuren aanpassen?",
                description:
                  "Zodra je bent ingelogd in je account, kun je eenvoudig je basisgegevens voor de maaltijdbox aanpassen. Denk hierbij aan je caloriebehoefte, doelen, activiteitenniveau en het aantal dagen. Je maandelijkse abonnement wordt automatisch aangepast op basis van deze nieuwe gegevens. Ook je adresgegevens kun je makkelijk bijwerken via het instellingenmenu in je account. Zo blijft alles altijd up-to-date!",
              },
              {
                title:
                  "Ik ben mijn wachtwoord vergeten. Hoe stel ik een nieuw wachtwoord in?",
                description:
                  "Ben je je wachtwoord vergeten? Geen zorgen! Ga naar de inlogpagina en klik op 'Wachtwoord vergeten.' Voer het e-mailadres in dat aan je account is gekoppeld, en je ontvangt direct een e-mail met een link om een nieuw wachtwoord in te stellen. Volg de stappen in de e-mail, en je bent binnen enkele minuten weer ingelogd!",
              },
              {
                title:
                  "Hoe kan ik mijn account of abonnement pauzeren of opzeggen?",
                description:
                  "Wil je je account of abonnement pauzeren of opzeggen? Geen probleem! In je accountinstellingen vind je de optie om je abonnement tijdelijk te pauzeren of volledig op te zeggen. Zodra je op ‘Pauzeren’ of ‘Opzeggen’ klikt, stopt je abonnement automatisch vanaf de aangegeven datum, en worden eventuele betalingen stopgezet. Zo houd je volledige controle over je lidmaatschap bij EssentialsPlus.",
              },
            ]}
          />
          <FaqDynamicDivision
            title="Levering"
            faqs={[
              {
                title: "Hoe vaak worden mijn maaltijdboxen geleverd?",
                description:
                  "De frequentie van je leveringen hangt af van het aantal dagen dat je maaltijdbox-abonnement dekt. Voor abonnementen van 1 tot 4 dagen leveren we eenmaal per week. Voor abonnementen van 5, 6 of 7 dagen zijn er twee levermomenten per week. Zo zorgen we ervoor dat je ingrediënten altijd vers zijn, ongeacht de lengte van je abonnement!",
              },
              {
                title:
                  "Wat gebeurt er als ik niet thuis ben op het moment van levering?",
                description:
                  "Als je niet thuis bent tijdens de levering, kan de bezorger je pakketje op een veilige plek achterlaten, zoals bij de buren of in een vooraf afgesproken ruimte. Je kunt deze instructies aan ons doorgeven tijdens het bestellen. Zo hoef je je geen zorgen te maken als je even weg bent. Je maaltijdbox wordt altijd geleverd.",
              },
              {
                title:
                  "Hoe worden de maaltijden vers gehouden tijdens de levering?",
                description:
                  "Onze maaltijdboxen worden geleverd in speciale gekoelde verpakkingen en getransporteerd in koelwagens die ervoor zorgen dat de ingrediënten vers blijven tot je ze kunt opbergen. Of je nu thuis bent of iets later, je kunt rekenen op de versheid van je maaltijden. We raden wel aan om de box meteen in de koelkast te zetten zodra je hem ontvangt.",
              },
              {
                title:
                  "Kan ik mijn levering tijdelijk pauzeren als ik op vakantie ben?",
                description:
                  "Ja, je kunt je levering eenvoudig pauzeren als je bijvoorbeeld op vakantie bent! Log in op je account en ga naar je abonnementsinstellingen. Daar kun je de leveringen tijdelijk stopzetten voor de gewenste periode. Zodra je terug bent, worden de leveringen automatisch hervat volgens je abonnement. Zo geniet je altijd van verse maaltijden wanneer je ze nodig hebt!",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

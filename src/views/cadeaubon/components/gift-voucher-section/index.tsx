import Button from "@/common/components/ui/button";
import Input from "@/common/components/ui/input";
import TextArea from "@/common/components/ui/textarea";

const GiftVoucherSection = () => {
  return (
    <section className="my-8 lg:my-[100px]">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-5 lg:grid-cols-[420px,auto]">
          <div className="h-full">
            <h3 className="text-xl font-semibold lg:text-3xl">
              Bestel een cadeaubon
            </h3>
            <div className="__c_all mt-4 h-[260px] bg-[#D9D9D9] px-16 lg:mt-8">
              <h4 className="__h4">Cadeaubon 1dag maaltijd €25,-</h4>
            </div>
          </div>

          <div>
            <h4 className="__h4">Wie is de ontvanger?</h4>
            <div className="my-4 grid grid-cols-1 gap-y-6 lg:my-5">
              <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
                <Input bordered label="Naam:" />
                <Input bordered label="Email:" />
                <Input bordered label="Verzenddatum" />
              </div>
              <div>
                <TextArea
                  bordered
                  label="Voeg een persoonlijke bericht toe:"
                  rows={6}
                />
              </div>
              <p>
                Één cadeaubon t.w.v. €25,- bevat een dagmaaltijd van 6
                maaltijdmomenten voor één persoon.
                <br />
                <br />
                Ontvangers kunnen met de cadeaubon zelf hun maaltijdvoorkeuren
                en recepten kiezen.
                <br />
                <br />
                Cadeaubonnen worden per post naar de ontvanger gestuurd, een
                kopie van verzending zal de verzender ontvangen.
                <br />
                <br />
                Op onze cadeaubonnen zijn de volgende voorwaarden van
                toepassing.
              </p>
            </div>
            <div className="mt-8">
              <Button intent={"yellow"} className="w-full">
                Ga naar de betaling
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftVoucherSection;

import Button from "@/common/components/ui/button";
import Input from "@/common/components/ui/input";
import TextArea from "@/common/components/ui/textarea";

const GiftVoucherSection = () => {
  return (
    <section className="my-[100px]">
      <div className="container">
        <div className="grid grid-cols-[420px,auto] gap-x-20">
          <div className="h-full">
            <h3 className="text-3xl font-semibold">Bestel een cadeaubon</h3>
            <div className="mt-8 h-[260px] bg-[#D9D9D9] px-16 __c_all">
              <h4 className="__h4">Cadeaubon 1dag maaltijd €25,-</h4>
            </div>
          </div>

          <div>
            <h4 className="__h4">Wie is de ontvanger?</h4>
            <div className="my-5 grid grid-cols-3 gap-y-6 gap-x-10">
              <Input bordered label="Naam:" />
              <Input bordered label="Email:" />
              <Input bordered label="Verzenddatum" />
              <div className="col-span-3">
                <TextArea
                  bordered
                  label="Voeg een persoonlijke bericht toe:"
                  rows={6}
                />
              </div>
              <p className="col-span-3">
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

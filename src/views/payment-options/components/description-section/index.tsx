import ClarnaIcon from "@/common/components/icons/clarna-icon";
import IDealIcon from "@/common/components/icons/i-deal-icon";
import MasterCashIcon from "@/common/components/icons/master-cash-icon";
import MasterCardIcon from "@/common/components/icons/mastercard-icon";
import PayPalIcon from "@/common/components/icons/paypal-icon";
import { ReactNode } from "react";

const DescriptionSection = () => {
  return (
    <section className="mt-[65px] mb-[105px]">
      <div className="container">
        <div className="max-w-[680px] mx-auto">
          <div className="space-y-6">
            <Row
              icon={<IDealIcon className="w-8" />}
              description="Betaal alle artikelen veilig, vertrouwd en gemakkelijk met iDEAL. iDEAL is gebaseerd op internetbankieren. Dit betekent dat je kunt afrekenen in je vertrouwde betaalomgeving, op basis van de beveiligingsmethodes van je bank."
              title="iDeal"
            />
            <Row
              icon={<ClarnaIcon className="w-[50px]" />}
              description="Probeer het eerst en betaal later. Met Klarna betaal je niets voordat je jouw bestelling hebt ontvangen."
              title="Klarna"
            />
            <Row
              icon={<PayPalIcon className="w-[50px]" />}
              description="PayPal is een internationale online betaalrekening waarbij je ervoor kunt kiezen een bankrekening of credit card te koppelen voor snelle en veilige betalingen."
              title="Paypal"
            />
            <Row
              icon={<MasterCashIcon className="w-[50px]" />}
              description={
                <>
                  Bancontact / Mister Cash is het online betaalsysteem
                  ontwikkeld door de gezamenlijke banken in België en is de
                  meest geaccepteerde online betaalmethode in België.
                  <br />
                  <br />
                  Alle Belgische klanten die gebruik maken van
                  internetbankieren, kunnen gebruik maken van Bancontact /
                  Mister Cash. Zo kan je direct aankopen betalen in een
                  vertrouwde bankomgeving.
                </>
              }
              title="Bancontact / Mister Cash"
            />
            <Row
              icon={<MasterCardIcon className="w-[50px]" />}
              description="Wanneer je kiest voor een betaling met creditcard (VISA of Mastercard) wordt het bedrag gereserveerd en pas afgeschreven nadat je artikel is geleverd."
              title="Creditcard"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;

type RowProps = {
  title: string;
  description: ReactNode;
  icon: ReactNode;
};
const Row = ({ description, icon, title }: RowProps) => {
  return (
    <div>
      <div className="flex items-center gap-x-5">
        {icon}
        <h4 className="__h4">{title}</h4>
      </div>
      <p className="mt-3 text-app-black __body_16">{description}</p>
    </div>
  );
};

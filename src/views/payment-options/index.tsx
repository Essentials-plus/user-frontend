import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import DescriptionSection from "@/views/payment-options/components/description-section";

const PaymentOptions = () => {
  return (
    <>
      <AssentialPlusHeroSection
        imgSrc="/imgs/payment-options-hero-img.jpg"
        title="Betaal Mogelijkheden"
        accentColor="#317773"
      />
      <DescriptionSection />
    </>
  );
};

export default PaymentOptions;

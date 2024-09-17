import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import DescriptionSection from "@/views/returns/components/description-section";

const Returns = () => {
  return (
    <>
      <AssentialPlusHeroSection
        imgSrc="/imgs/returns-hero-img.jpg"
        title="Retourneren"
        accentColor="#FFBE34"
      />
      <DescriptionSection />
    </>
  );
};

export default Returns;

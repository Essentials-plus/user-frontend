import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import DescriptionSection from "@/views/single-vacancies/components/description-section";

const SingleVacancies = () => {
  return (
    <>
      <AssentialPlusHeroSection
        imgSrc="/imgs/vacancies-hero-img.jpg"
        title="Vacature:
        Orderpicker"
        accentColor="#FFBE34"
      />
      <DescriptionSection />
    </>
  );
};

export default SingleVacancies;

import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import CategoriesSection from "@/views/vacancies/components/categories-section";

const Vacancies = () => {
  return (
    <>
      <AssentialPlusHeroSection
        imgSrc="/imgs/vacancies-hero-img.jpg"
        title="Vacatures"
        accentColor="#FFBE34"
      />
      <CategoriesSection />
    </>
  );
};

export default Vacancies;

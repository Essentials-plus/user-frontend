import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import ExpectResultsSection from "@/views/nutritional-advice/components/expect-results-section";
import FitLifeSection from "@/views/nutritional-advice/components/fit-life-section";
import QualityProductsSection from "@/views/nutritional-advice/components/quality-products-section";
import YouCanWatchSection from "@/views/nutritional-advice/components/you-can-watch-section";

const NutritionalAdvice = () => {
  return (
    <>
      <AssentialPlusHeroSection
        imgSrc="/imgs/our-story/our-story-hero-img.jpg"
        title="Voedingadvies"
        accentColor="#FFBE34"
      />
      <FitLifeSection />
      <ExpectResultsSection />
      <QualityProductsSection />
      <YouCanWatchSection />
    </>
  );
};

export default NutritionalAdvice;

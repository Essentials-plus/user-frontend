import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import FitLifeSection from "@/views/our-story/components/fit-life-section";
import QualityProductsSection from "@/views/our-story/components/quality-products-section";
import TwoMenSection from "@/views/our-story/components/two-men-section";
import ViewHereSection from "@/views/our-story/components/view-here-section";

const OurStory = () => {
  return (
    <>
      <AssentialPlusHeroSection
        imgSrc="/imgs/our-story/our-story-hero-img.jpg"
        title="Ons Verhaal"
        accentColor="#FFBE34"
      />
      <FitLifeSection />
      <TwoMenSection />
      <QualityProductsSection />
      <ViewHereSection />
    </>
  );
};

export default OurStory;

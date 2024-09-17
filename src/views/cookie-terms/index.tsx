import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import TermsSection from "@/views/cookie-terms/components/terms-section";

const CookieTerms = () => {
  return (
    <>
      <AssentialPlusHeroSection
        imgSrc="/imgs/our-story/our-story-hero-img.jpg"
        title="Cookies"
        accentColor="#317773"
      />
      <TermsSection />
    </>
  );
};

export default CookieTerms;

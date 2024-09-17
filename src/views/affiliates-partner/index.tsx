import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import JoinUsSection from "@/views/affiliates-partner/components/join-us-section";
import OverAssentialsSection from "@/views/affiliates-partner/components/over-assentials-section";

const AffiliatesPartner = () => {
  return (
    <>
      <AssentialPlusHeroSection
        imgSrc="/imgs/our-story/our-story-hero-img.jpg"
        title="Partner programma"
        accentColor="#317773"
      />
      <OverAssentialsSection />
      <JoinUsSection />
    </>
  );
};

export default AffiliatesPartner;

import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import PolicySection from "@/views/privacy-policy/components/policy-section";

const PrivacyPolicy = () => {
  return (
    <div>
      <AssentialPlusHeroSection
        imgSrc="/imgs/privacy-policy-hero-img.jpg"
        title="Privacy"
        accentColor="#317773"
      />
      <PolicySection />
    </div>
  );
};

export default PrivacyPolicy;

import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import HelpSection from "@/views/contact/components/help-section";

const Contact = () => {
  return (
    <>
      <AssentialPlusHeroSection
        imgSrc="/imgs/contact-hero-img.jpg"
        title="Contact"
        accentColor="#FFBE34"
      />
      <HelpSection />
    </>
  );
};

export default Contact;

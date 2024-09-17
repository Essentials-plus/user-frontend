import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import FaqSection from "@/views/faq/components/faq-section";

const Faq = () => {
  return (
    <>
      <AssentialPlusHeroSection
        imgSrc="/imgs/faq-hero-img.jpg"
        title="Veel gestelde vragen"
        accentColor="#317773"
      />
      <FaqSection />
    </>
  );
};

export default Faq;

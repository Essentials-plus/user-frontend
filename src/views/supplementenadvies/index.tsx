import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import YourGoalsSection from "@/views/supplementenadvies/components/your-goals-section";

const Supplementenadvies = () => {
  return (
    <>
      <AssentialPlusHeroSection
        imgSrc="/imgs/supplementenadvies-hero-img.jpg"
        title="Supplementen advies"
        accentColor="#317773"
      />
      <YourGoalsSection />
    </>
  );
};

export default Supplementenadvies;

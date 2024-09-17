import AssentialPlusHeroSection from "@/common/components/sections/assential-plus-hero-section";
import GiftVoucherSection from "@/views/cadeaubon/components/gift-voucher-section";

const Cadeaubon = () => {
  return (
    <>
      <AssentialPlusHeroSection
        imgSrc="/imgs/our-story/our-story-hero-img.jpg"
        title="Cadeaubon"
        accentColor="#FFBE34"
      />
      <GiftVoucherSection />
    </>
  );
};

export default Cadeaubon;

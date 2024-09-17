import BestSellersSection from "@/views/home/components/best-sellers-section";
import HeroSection from "@/views/home/components/hero-section";
import HowDoesItWorkSection from "@/views/home/components/how-does-it-work-section";
import { TabSectionWrapper } from "@/views/home/components/tab-section";

const Home = () => {
  return (
    <>
      <HeroSection />
      <HowDoesItWorkSection />

      <TabSectionWrapper />
      <BestSellersSection />
    </>
  );
};

export default Home;

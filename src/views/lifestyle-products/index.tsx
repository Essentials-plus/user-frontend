import BannersSection from "@/views/lifestyle-products/components/banners-section";
import CategoriesSection from "@/views/lifestyle-products/components/categories-section";
import HeroSection from "@/views/lifestyle-products/components/hero-section";
import ProductsByCategorySection from "@/views/lifestyle-products/components/products-by-category-section";

const LifestyleProducts = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ProductsByCategorySection />
      <BannersSection />
    </>
  );
};

export default LifestyleProducts;

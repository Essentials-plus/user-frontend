import { getProductsQueryOptions } from "@/api-clients/public-api-client/queries";
import ProductCard from "@/views/lifestyle-products/components/product-card";
import { useQuery } from "@tanstack/react-query";

const RecommendedProductsSection = () => {
  const { data: productData } = useQuery(getProductsQueryOptions());

  return (
    <section className="my-[100px]">
      <div className="container">
        <h2 className="__h2 text-center">Aanbevolen producten</h2>

        <div className="mt-12 grid grid-cols-4 gap-5">
          {productData?.data.map((v, i) => (
            <ProductCard key={"dgs" + i} data={v} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProductsSection;

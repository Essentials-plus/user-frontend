import { getCartRecommendationProductsQueryOptions } from "@/api-clients/user-api-client/queries";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import ProductCard from "@/views/lifestyle-products/components/product-card";

const RecommendedProductsSection = () => {
  const cartRecommendationProductsQuery = usePaginatedQuery(({ page }) =>
    getCartRecommendationProductsQueryOptions({
      axiosReqConfig: {
        params: {
          page,
        },
      },
    }),
  );

  const products = cartRecommendationProductsQuery.query.data?.data || [];

  if (products.length <= 0) return null;
  return (
    <section className="my-8 lg:my-[100px]">
      <div className="container">
        <h2 className="__h4 lg:__h2 text-center">Aanbevolen producten</h2>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProductsSection;

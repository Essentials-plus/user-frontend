import { getBestSellerProductsQueryOptions } from "@/api-clients/user-api-client/queries";
import Spinner from "@/common/components/ui/spinner";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import { getApiErrorMessage } from "@/lib/utils";
import DataTablePagination from "@/views/data-table-pagination";
import ProductCard from "@/views/lifestyle-products/components/product-card";

const ProductsByCategorySection = () => {
  const bestSelletProductsQuery = usePaginatedQuery(({ page }) =>
    getBestSellerProductsQueryOptions({
      axiosReqConfig: {
        params: {
          page,
        },
      },
    }),
  );

  return (
    <section className="my-20">
      <div className="container">
        <div className="mt-16 space-y-20">
          <section className="scroll-mt-40">
            <div>
              <div className="flex items-center gap-4">
                <h2 className="__h2 shrink-0 capitalize text-app-black">
                  Bestsellers
                </h2>
                <div className="h-px grow bg-black" />
              </div>
            </div>
            {bestSelletProductsQuery.isLoading ? (
              <div className="flex h-[300px] items-center justify-center">
                <Spinner className="size-6" />
              </div>
            ) : bestSelletProductsQuery.isError ? (
              <div className="flex h-[300px] items-center justify-center">
                <p className="text-red-500">
                  {getApiErrorMessage(bestSelletProductsQuery.error)}
                </p>
              </div>
            ) : (bestSelletProductsQuery.data?.data || []).length <= 0 ? (
              <div className="flex h-[300px] items-center justify-center">
                <p className="text-black/80">
                  Er zijn geen producten om voor te tonen{" "}
                  <span className="capitalize">{`"Afslanken"`}</span>
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-5 mt-10 grid grid-cols-4 gap-8">
                  {bestSelletProductsQuery.data?.data.map((product) => (
                    <ProductCard key={product.id} data={product} />
                  ))}
                </div>
                <DataTablePagination query={bestSelletProductsQuery} />
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default ProductsByCategorySection;

import { getProductsQueryOptions } from "@/api-clients/public-api-client/queries";
import { getCategoryQueryOptions } from "@/api-clients/user-api-client/queries";
import { button } from "@/common/components/ui/button";
import Spinner from "@/common/components/ui/spinner";
import useHeaderHeight from "@/hooks/useHeaderHeight";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import { cn, getApiErrorMessage } from "@/lib/utils";
import DataTablePagination from "@/views/data-table-pagination";
import ProductCard from "@/views/lifestyle-products/components/product-card";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

const ProductsByCategorySection = () => {
  const { data: categoriesData } = useQuery(getCategoryQueryOptions());
  const router = useRouter();
  const { headerHeight } = useHeaderHeight();

  const activeHash = router.asPath.split("#")[1];

  return (
    <section className="my-20">
      <div className="container">
        <div
          className="flex gap-8 justify-center flex-wrap sticky bg-white pt-5 pb-2.5 z-50 left-0 w-full"
          style={{ top: headerHeight }}
        >
          {categoriesData?.data?.map((category) => (
            <Link
              href={`#${category.name}`}
              className={cn(
                button({
                  size: "sm",
                  intent:
                    activeHash === category.name ? "primary" : "outline-green",
                }),
              )}
              key={category.id}
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="mt-16 space-y-20">
          {categoriesData?.data.map((category) => (
            <ProductSection
              key={category.id}
              header={category.name}
              description=""
              categoryId={category.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsByCategorySection;

type ProductSectionProps = {
  header: string;
  description: string;
  categoryId: string | null;
};

const ProductSection = ({
  description,
  categoryId,
  header,
}: ProductSectionProps) => {
  const productsQuery = usePaginatedQuery(({ page }) =>
    getProductsQueryOptions({
      axiosReqConfig: {
        params: {
          page,
          category: categoryId === null ? "null" : categoryId,
        },
      },
    }),
  );

  const products = productsQuery.data?.data || [];
  return (
    <section id={header} className="scroll-mt-40">
      <div>
        <div className="flex items-center gap-4">
          <h2 className="shrink-0 __h2 text-app-black capitalize">{header}</h2>
          <div className="grow h-px bg-black" />
        </div>
        <p className="__body_16 text-app-text mt-1">{description}</p>
      </div>
      {productsQuery.isLoading ? (
        <div className="flex items-center justify-center h-[300px]">
          <Spinner className="size-6" />
        </div>
      ) : productsQuery.isError ? (
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-red-500">
            {getApiErrorMessage(productsQuery.error)}
          </p>
        </div>
      ) : products.length <= 0 ? (
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-black/80">
            Er zijn geen producten om voor te tonen{" "}
            <span className="capitalize">{`"${header}"`}</span>
          </p>
        </div>
      ) : (
        <div>
          <div className="mt-10 grid grid-cols-4 gap-8 mb-5">
            {products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
          <DataTablePagination query={productsQuery} />
        </div>
      )}
    </section>
  );
};

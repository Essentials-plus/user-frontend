import { getHomePageBannerProductsQueryOptions } from "@/api-clients/user-api-client/queries";
import Button from "@/common/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import useMeasure from "react-use-measure";

const BestSellersSection = () => {
  const [ref, bounds] = useMeasure();

  const homePageBannerProductsQuery = useQuery({
    ...getHomePageBannerProductsQueryOptions(),
  });

  const products = homePageBannerProductsQuery.data?.data || [];
  return (
    <section className="mt-[119px] mb-[106px]">
      <div ref={ref} className="container">
        <div
          style={{ width: bounds.width + bounds.left - 24 }}
          className="grid grid-cols-[573px,auto] gap-x-3 items-center"
        >
          <div>
            <h4 className="__h4">Bestsellers</h4>
            <h2 className="__h2 uppercase mt-[22px] mb-[30px]">
              alles voor een gezonde lifestyle{" "}
            </h2>

            <Button className="px-6">Bekijk alle producten</Button>
          </div>

          <div
            className="grid h-[600px]"
            style={{
              gridTemplateColumns: `repeat(${products.length}, 1fr)`,
            }}
          >
            {products.map((product) => (
              <Link
                href={`/products/${product.slug}`}
                key={product.id}
                className="h-full w-full first:rounded-l-[60px] bg-app-yellow last:bg-app-grey __c_all relative isolate"
              >
                <Image
                  src={product.images[0]}
                  width={646}
                  height={1024}
                  alt={product.name}
                  className="max-w-[200px] scale-[1.15] rounded-lg rotate-6"
                />

                <h2 className="absolute w-full text-center top-8 left-1/2 -translate-x-1/2 text-[32px]/[36px] font-bold uppercase">
                  {product.name}
                </h2>
                <div className="h-[280px] aspect-square bg-white rounded-full absolute m-auto z-[-1]"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;

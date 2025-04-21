import { getSpotlightsProductBannersQueryOptions } from "@/api-clients/user-api-client/queries";
import Button from "@/common/components/ui/button";
import routes from "@/config/routes";
import { calculateDiscount } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const BestSellersSection = () => {
  const spotlightsProductBannersQuery = useQuery(
    getSpotlightsProductBannersQueryOptions(),
  );

  const spotlightsProductBanners =
    spotlightsProductBannersQuery.data?.data || [];

  if (spotlightsProductBanners.length <= 0) return null;

  return (
    <section className="my-16 md:mb-10 md:mt-10 lg:mb-[106px] lg:mt-[119px]">
      <div className="mx-auto max-w-[1920px]">
        <h2 className="text-center text-xl font-extrabold uppercase sm:text-2xl">
          In de spotlights
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {spotlightsProductBanners.map((item) => {
            const product = item.product;
            const discountPercentage =
              product.type === "simple"
                ? calculateDiscount(product.regularPrice, product.salePrice)
                : product.type === "variable"
                ? Math.max(
                    ...(product.variations || []).map((variation) =>
                      calculateDiscount(
                        variation.regularPrice,
                        variation.salePrice,
                      ),
                    ),
                  )
                : 0;
            return (
              <Link
                href={routes.product(product.slug)}
                key={item.id}
                className="group relative isolate block aspect-[16/10] sm:aspect-[4/3] md:aspect-[3/2]"
              >
                <div className="absolute inset-0.5 z-[-1] bg-gray-900" />
                <Image
                  fill
                  src={item.image}
                  alt={item.title}
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {discountPercentage > 0 && (
                  <div className="absolute right-2 top-2 sm:top-4 sm:right-4 flex min-h-[25px] items-center justify-center bg-app-primary px-2.5 py-0.5 text-xs font-semibold text-white">
                    -{discountPercentage.toFixed(0)}% Korting
                  </div>
                )}

                <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 px-4 sm:px-6">
                  <div
                    className="max-w-[150px] text-lg font-extrabold text-white sm:text-2xl"
                    dangerouslySetInnerHTML={{
                      __html: item.title,
                    }}
                  />
                  <Button className="mt-3 px-4 py-2 text-xs font-bold sm:mt-5 sm:px-6 sm:text-sm">
                    SHOP NU
                  </Button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;

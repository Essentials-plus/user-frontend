import { getSingleProductQueryOptions } from "@/api-clients/public-api-client/queries";
import Spinner from "@/common/components/ui/spinner";
import ProductCard from "@/views/lifestyle-products/components/product-card";
import HeroSection from "@/views/single-product/components/hero-section";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const SingleProduct = () => {
  const router = useRouter();

  const slug = router.query.slug as string;

  const { data, isLoading } = useQuery(getSingleProductQueryOptions(slug));

  if (isLoading || !data)
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center gap-4 text-xl">
        <div className="size-8">
          <Spinner />
        </div>
        Bezig met laden...
      </div>
    );

  return (
    <>
      <HeroSection data={data?.data} />
      {data.data.linkedProducts.length > 0 ? (
        <>
          <div className="my-12 h-px bg-app-black/20" />
          <section className="mb-12">
            <div className="container">
              <h2 className="__h3 text-center">
                Misschien vind je dit ook leuk
              </h2>
              <div className="mt-10 grid grid-cols-4 gap-5">
                {data.data.linkedProducts.map((product) => (
                  <ProductCard key={product.id} data={product as any} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
};

export default SingleProduct;

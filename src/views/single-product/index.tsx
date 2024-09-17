import { getSingleProductQueryOptions } from "@/api-clients/public-api-client/queries";
import Spinner from "@/common/components/ui/spinner";
import AccordionSection from "@/views/single-product/components/accordion-section";
import HeroSection from "@/views/single-product/components/hero-section";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const SingleProduct = () => {
  const router = useRouter();

  const slug = router.query.slug as string;

  const { data, isLoading } = useQuery(getSingleProductQueryOptions(slug));

  if (isLoading || !data)
    return (
      <div className="flex items-center gap-4 text-xl justify-center h-[calc(100vh-100px)]">
        <div className="w-8  h-8">
          <Spinner />
        </div>
        Bezig met laden...
      </div>
    );

  return (
    <>
      <HeroSection data={data?.data} />
      {data.data.linkedProduct && <AccordionSection data={data.data} />}
    </>
  );
};

export default SingleProduct;

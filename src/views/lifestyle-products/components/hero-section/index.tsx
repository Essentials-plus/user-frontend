import { getRawDataByIdentifierQueryOptions } from "@/api-clients/user-api-client/queries";
import { button } from "@/common/components/ui/button";
import useHeaderHeight from "@/hooks/useHeaderHeight";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

export const lifestyleHeroSectionApiIdentifier = "products-page.hero-section";

const HeroSection = () => {
  const { headerHeight } = useHeaderHeight();

  const heroSectionQuery = useQuery(
    getRawDataByIdentifierQueryOptions({
      identifier: lifestyleHeroSectionApiIdentifier,
    }),
  );
  const data = heroSectionQuery.data?.data?.data;

  if (Object.values(data || {}).length <= 0) return null;

  return (
    <section
      style={
        {
          "--headerHeight": `${headerHeight}px`,
        } as CSSProperties
      }
      className="relative flex max-w-[100vw] overflow-x-hidden max-lg:flex-col lg:min-h-[calc(100vh-93.74px)] lg:items-center"
    >
      <div className="container">
        <div className="ml-auto max-w-[659px] max-lg:py-14 lg:pl-28">
          <h1 className="lg:__h1 text-4xl font-bold uppercase">
            {data?.title}
          </h1>
          <div
            className="__body_16 lg:__body_18 prose mb-10 mt-5 font-medium"
            dangerouslySetInnerHTML={{
              __html: data?.description,
            }}
          />
          <Link
            href={data?.buttonUrl}
            className={button({
              className: "w-fit",
            })}
          >
            {data?.buttonText}
          </Link>
        </div>
      </div>

      <Link
        href={data?.buttonUrl}
        className="block overflow-hidden bg-app-darker-green lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-1/2"
      >
        <Image
          src={data?.image}
          alt={data?.title}
          width={1039}
          height={840}
          className="size-full object-cover "
        />
      </Link>
    </section>
  );
};

export default HeroSection;

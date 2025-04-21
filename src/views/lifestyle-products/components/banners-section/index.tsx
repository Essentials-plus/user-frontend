import { getRawDataByIdentifierQueryOptions } from "@/api-clients/user-api-client/queries";
import Button from "@/common/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export const lifestyleBannersSectionApiIdentifier = "products-page.banners";

const BannersSection = () => {
  const heroSectionQuery = useQuery(
    getRawDataByIdentifierQueryOptions({
      identifier: lifestyleBannersSectionApiIdentifier,
    }),
  );
  const banners = heroSectionQuery.data?.data?.data?.banners || [];

  if (banners.length <= 0) return null;

  return (
    <section className="my-10 lg:my-[60px]">
      <div className="mx-auto max-w-[1920px]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {banners.map((banner: any) => {
            return (
              <Link
                href={banner.buttonUrl}
                key={banner.id}
                className="group relative isolate block pb-[48%] lg:pb-[41.667%]"
              >
                <div className="absolute inset-0.5 z-[-1] bg-gray-900" />
                <Image
                  fill
                  src={banner.image}
                  alt={banner.title}
                  objectFit="cover"
                  objectPosition="top"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 duration-300 group-hover:opacity-100" />

                <div className="absolute inset-0 flex flex-col items-start justify-between p-5 md:p-7 lg:p-10">
                  <div
                    className="text-2xl font-extrabold text-white"
                    dangerouslySetInnerHTML={{
                      __html: banner.title || "",
                    }}
                  />
                  <Button className="mt-5 px-6 max-md:px-5 max-md:h-9 text-sm font-bold">
                    {banner.buttonText}
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

export default BannersSection;

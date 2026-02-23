import { getCategoryQueryOptions } from '@/api-clients/user-api-client/queries';
import routes from '@/config/routes';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

type CategoriesSectionProps = {
  disableTitle?: boolean;
  section?: ComponentPropsWithoutRef<'div'>;
  categoryLinkHref?: string;
  swiperSlideClassName?: string;
};

const CategoriesSection = ({
  disableTitle,
  section,
  categoryLinkHref,
  swiperSlideClassName,
}: CategoriesSectionProps) => {
  const categoriesQuery = useQuery(
    getCategoryQueryOptions({
      axiosReqConfig: {
        params: {
          where: {
            parentCategoryId: 'null',
          },
        },
      },
    }),
  );
  return (
    <section {...section} className={cn('mt-12 lg:mt-20', section?.className)}>
      <div className="mx-auto max-w-[1920px]">
        {!disableTitle && (
          <h2 className="text-center text-xl font-extrabold uppercase lg:text-2xl">
            Ontdek onze categorieën
          </h2>
        )}
        <div className="lg:mt-5">
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 2.2,
              },
              640: {
                slidesPerView: 3.2,
              },
              1024: {
                slidesPerView: 4.2,
              },
              1280: {
                slidesPerView: 5.2,
              },
              1536: {
                slidesPerView: 6.2,
              },
            }}
            spaceBetween={0}
          >
            {categoriesQuery.data?.data.map((category) => (
              <SwiperSlide
                key={category.id}
                className={cn(
                  '!h-[150px] [&_img]:object-cover',
                  swiperSlideClassName,
                )}
              >
                <Link
                  href={`${routes.productByCategory(category.slug)}${
                    categoryLinkHref || ''
                  }`}
                  className="group relative isolate block size-full"
                >
                  <div className="absolute inset-0.5 z-[-1] bg-gray-900" />
                  <Image fill src={category.image} alt={category.name} />
                  <div className="absolute inset-0 bg-black/40 opacity-20 duration-300 group-hover:opacity-100" />

                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <h3 className="max-w-[150px] text-2xl font-extrabold uppercase text-white">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

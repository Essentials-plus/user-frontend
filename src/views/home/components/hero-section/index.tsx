import { getRawDataByIdentifierQueryOptions } from '@/api-clients/user-api-client/queries';
import { button } from '@/common/components/ui/button';
import useHeaderHeight from '@/hooks/useHeaderHeight';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';

export const homeHeroSectionApiIdentifier = 'home-page.hero-section';

const HeroSection = () => {
  const { headerHeight } = useHeaderHeight();

  const heroSectionQuery = useQuery(
    getRawDataByIdentifierQueryOptions({
      identifier: homeHeroSectionApiIdentifier,
    }),
  );
  const data = heroSectionQuery.data?.data?.data;

  // Fallback values when API data is not available
  const title = data?.title ?? (
    <>
      Gezond eten <br /> makkelijk gemaakt
    </>
  );
  const description =
    data?.description ??
    'Complete dagpakketen afgestemd op <br /> jou unieke behoeftes';
  const buttonText = data?.buttonText ?? 'Begin Vandaag';
  const buttonUrl = data?.buttonUrl ?? '/onboarding/credentials';
  const image = data?.image ?? '/imgs/home-hero-img.jpg';
  const buttonBackgroundColor = data?.buttonBackgroundColor;
  const buttonTextColor = data?.buttonTextColor;

  return (
    <section
      style={
        {
          '--headerHeight': `${headerHeight}px`,
        } as CSSProperties
      }
      className="relative flex max-w-[100vw] overflow-x-hidden max-lg:min-h-[calc(100dvh-var(--headerHeight))] max-lg:flex-col lg:min-h-[calc(100vh-93.74px)] lg:items-center"
    >
      <div className="container">
        <div className="max-w-[659px] max-lg:pb-8 max-lg:pt-16">
          <h1 className="lg:__h1 break-words text-4xl font-bold uppercase">
            {title}
          </h1>
          <div
            className="__body_16 lg:__body_25 prose mb-6 mt-5 font-medium uppercase text-black lg:mb-10"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
          <div className="flex lg:justify-center">
            <Link
              href={buttonUrl}
              className={button({
                className:
                  'w-fit max-lg:bg-white max-lg:text-app-darker-green lg:-translate-x-10 border-none hover:brightness-110 duration-150',
              })}
              style={{
                ...(buttonBackgroundColor && {
                  backgroundColor: buttonBackgroundColor,
                }),
                ...(buttonTextColor && {
                  color: buttonTextColor,
                }),
              }}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>

      <Link
        href={buttonUrl}
        className="block flex-col overflow-hidden bg-app-darker-green max-lg:flex max-lg:min-h-[250px] max-lg:grow max-lg:items-end lg:absolute lg:right-0 lg:top-0 lg:h-full lg:max-w-[50%] lg:shadow-[1px_4px_10px_0px_rgba(0,0,0,0.25)]"
      >
        <Image
          src={image}
          alt={title}
          width={2098}
          height={1708}
          className="object-cover max-lg:w-full max-lg:grow lg:size-full"
        />
      </Link>
    </section>
  );
};

export default HeroSection;

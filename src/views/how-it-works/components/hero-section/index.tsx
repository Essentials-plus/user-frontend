import { getRawDataByIdentifierQueryOptions } from '@/api-clients/user-api-client/queries';
import { button } from '@/common/components/ui/button';
import useHeaderHeight from '@/hooks/useHeaderHeight';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';

export const howItWorksHeroSectionApiIdentifier =
  'how-it-works-page.hero-section';

const HeroSection = () => {
  const { headerHeight } = useHeaderHeight();

  const heroSectionQuery = useQuery(
    getRawDataByIdentifierQueryOptions({
      identifier: howItWorksHeroSectionApiIdentifier,
    }),
  );
  const data = heroSectionQuery.data?.data?.data;

  // Fallback values when API data is not available
  const title = data?.title ?? 'Hoe werkt het';
  const description =
    data?.description ?? 'Hoe werkt de maaltijdplan van essentialsplus?';
  const buttonText = data?.buttonText ?? 'Begin Vandaag';
  const buttonUrl = data?.buttonUrl ?? '/onboarding/credentials';
  const image = data?.image ?? '/imgs/how-it-works/how-it-works-hero.png';
  const buttonBackgroundColor = data?.buttonBackgroundColor;
  const buttonTextColor = data?.buttonTextColor;

  return (
    <section
      style={
        {
          '--headerHeight': `${headerHeight}px`,
        } as CSSProperties
      }
      className="relative flex max-w-[100vw] overflow-x-hidden max-lg:min-h-[calc(100dvh-var(--headerHeight))] max-lg:flex-col max-lg:bg-app-darker-green lg:min-h-[calc(100vh-93.74px)] lg:items-center"
    >
      <div className="container">
        <div className="ml-auto max-w-[659px] max-lg:py-20 lg:pl-28">
          <h1 className="__h2 lg:__h1 uppercase max-lg:text-white">{title}</h1>
          <div
            className="__body_16 lg:__body_18 prose mb-10 mt-5 font-medium max-lg:text-white/80 lg:max-w-[60%]"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
          <Link
            href={buttonUrl}
            className={button({
              className:
                'w-fit max-lg:bg-white max-lg:text-app-darker-green border-none duration-150 hover:brightness-110',
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

      <Link
        href={buttonUrl}
        className="block overflow-hidden bg-app-darker-green max-lg:flex max-lg:min-h-[250px] max-lg:grow max-lg:items-end lg:absolute lg:left-0 lg:top-0 lg:h-full lg:max-w-[50%] lg:shadow-[1px_4px_10px_0px_rgba(0,0,0,0.25)]"
      >
        <Image
          src={image}
          alt={title}
          width={2078}
          height={1680}
          className="object-cover max-lg:w-full lg:size-full"
        />
      </Link>
    </section>
  );
};

export default HeroSection;

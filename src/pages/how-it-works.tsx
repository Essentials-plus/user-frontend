import { getRawDataByIdentifierQueryOptions } from '@/api-clients/user-api-client/queries';
import { authUserCookieName } from '@/constants';
import { parseJson } from '@/hooks/useUserSession';
import HowItWorks from '@/views/how-it-works';
import { howItWorksHeroSectionApiIdentifier } from '@/views/how-it-works/components/hero-section';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';

const HowItWorksPage = () => {
  return (
    <>
      <HowItWorks />
    </>
  );
};

export default HowItWorksPage;

export const getServerSideProps = (async ({ req, res }) => {
  const queryClient = new QueryClient();
  const userStr = getCookie(authUserCookieName, { req, res });

  await queryClient.prefetchQuery(
    getRawDataByIdentifierQueryOptions({
      identifier: howItWorksHeroSectionApiIdentifier,
    }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session: {
        user: parseJson(userStr),
      },
    },
  };
}) satisfies GetServerSideProps;

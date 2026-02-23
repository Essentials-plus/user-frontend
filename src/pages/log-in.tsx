import { getRawDataByIdentifierQueryOptions } from '@/api-clients/user-api-client/queries';
import { authUserCookieName } from '@/constants';
import { parseJson } from '@/hooks/useUserSession';
import LogIn, { loginHeroSectionApiIdentifier } from '@/views/log-in';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';

const LogInPage = () => {
  return <LogIn />;
};

export default LogInPage;

export const getServerSideProps = (async ({ req, res }) => {
  const queryClient = new QueryClient();
  const userStr = getCookie(authUserCookieName, { req, res });

  await queryClient.prefetchQuery(
    getRawDataByIdentifierQueryOptions({
      identifier: loginHeroSectionApiIdentifier,
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

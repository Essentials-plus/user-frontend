import { getSpotlightsProductBannersQueryOptions } from "@/api-clients/user-api-client/queries";
import { authUserCookieName } from "@/constants";
import { parseJson } from "@/hooks/useUserSession";
import Home from "@/views/home";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";

const HomePage = () => {
  return <Home />;
};

export default HomePage;

export const getServerSideProps = (async ({ req, res }) => {
  const queryClient = new QueryClient();
  const userStr = getCookie(authUserCookieName, { req, res });

  await queryClient.prefetchQuery({
    ...getSpotlightsProductBannersQueryOptions(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session: {
        user: parseJson(userStr),
      },
    },
  };
}) satisfies GetServerSideProps;

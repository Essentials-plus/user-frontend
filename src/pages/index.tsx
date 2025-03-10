import { getSpotlightsProductBannersQueryOptions } from "@/api-clients/user-api-client/queries";
import Home from "@/views/home";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

const HomePage = () => {
  return <Home />;
};

export default HomePage;

export const getServerSideProps = (async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...getSpotlightsProductBannersQueryOptions(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps;

import { getSingleProductQueryOptions } from "@/api-clients/public-api-client/queries";
import { authUserCookieName } from "@/constants";
import { parseJson } from "@/hooks/useUserSession";
import SingleProduct from "@/views/single-product";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";

const SingleProductPage = () => {
  return (
    <>
      <SingleProduct />
    </>
  );
};

export default SingleProductPage;

export const getServerSideProps = (async ({ query, req, res }) => {
  const queryClient = new QueryClient();
  const userStr = getCookie(authUserCookieName, { req, res });

  await queryClient.prefetchQuery({
    ...getSingleProductQueryOptions(query.slug as string),
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

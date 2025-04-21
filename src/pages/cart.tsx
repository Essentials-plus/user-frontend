import { getCartRecommendationProductsQueryOptions } from "@/api-clients/user-api-client/queries";
import { authUserCookieName } from "@/constants";
import { parseJson } from "@/hooks/useUserSession";
import Cart from "@/views/cart";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;

export const getServerSideProps = (async ({ req, res }) => {
  const queryClient = new QueryClient();
  const userStr = getCookie(authUserCookieName, { req, res });

  await queryClient.prefetchQuery(
    getCartRecommendationProductsQueryOptions({
      axiosReqConfig: {
        params: { page: 1 },
      },
    }),
  );

  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      dehydratedState,
      session: {
        user: parseJson(userStr),
      },
    },
  };
}) satisfies GetServerSideProps;

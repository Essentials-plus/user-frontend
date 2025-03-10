import { getCartRecommendationProductsQueryOptions } from "@/api-clients/user-api-client/queries";
import Cart from "@/views/cart";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;

export const getServerSideProps = (async () => {
  const queryClient = new QueryClient();

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
    },
  };
}) satisfies GetServerSideProps;

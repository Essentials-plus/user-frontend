import { getProductsForProductsPageQueryOptions } from "@/api-clients/public-api-client/queries";
import { getCategoryQueryOptions } from "@/api-clients/user-api-client/queries";
import { authUserCookieName } from "@/constants";
import { parseJson } from "@/hooks/useUserSession";
import Products from "@/views/products";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";

const ProductsPage = () => {
  return <Products />;
};

export default ProductsPage;

export const getServerSideProps = (async ({ req, res, query }) => {
  const queryClient = new QueryClient();
  const userStr = getCookie(authUserCookieName, { req, res });

  await queryClient.prefetchQuery(getCategoryQueryOptions());

  await queryClient.prefetchQuery({
    ...getProductsForProductsPageQueryOptions({
      axiosReqConfig: {
        params: {
          page: 1,
          category: null,
          subCategories: [],
          terms: [],
          minMaxPrice: [],
          sort: "relevance",
          q: null,
          ...query,
        },
      },
    }),
  });

  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      dehydratedState: dehydratedState,
      session: {
        user: parseJson(userStr),
      },
    },
  };
}) satisfies GetServerSideProps;

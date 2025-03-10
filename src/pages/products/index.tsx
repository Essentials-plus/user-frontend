import { getProductsForProductsPageQueryOptions } from "@/api-clients/public-api-client/queries";
import { getCategoryQueryOptions } from "@/api-clients/user-api-client/queries";
import Products from "@/views/products";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

const ProductsPage = () => {
  return <Products />;
};

export default ProductsPage;

export const getServerSideProps = (async (ctx) => {
  const queryClient = new QueryClient();

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
          ...ctx.query,
        },
      },
    }),
  });

  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      dehydratedState: dehydratedState,
    },
  };
}) satisfies GetServerSideProps;

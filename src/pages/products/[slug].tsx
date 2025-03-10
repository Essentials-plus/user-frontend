import { getSingleProductQueryOptions } from "@/api-clients/public-api-client/queries";
import SingleProduct from "@/views/single-product";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

const SingleProductPage = () => {
  return (
    <>
      <SingleProduct />
    </>
  );
};

export default SingleProductPage;

export const getServerSideProps = (async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...getSingleProductQueryOptions(ctx.query.slug as string),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps;

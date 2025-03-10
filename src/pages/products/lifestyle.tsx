import {
  getBestSellerProductsQueryOptions,
  getCategoryQueryOptions,
  getRawDataByIdentifierQueryOptions,
} from "@/api-clients/user-api-client/queries";
import LifestyleProducts from "@/views/lifestyle-products";
import { lifestyleBannersSectionApiIdentifier } from "@/views/lifestyle-products/components/banners-section";
import { lifestyleHeroSectionApiIdentifier } from "@/views/lifestyle-products/components/hero-section";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

const LifestyleProductsPage = () => {
  return (
    <>
      <LifestyleProducts />
    </>
  );
};

export default LifestyleProductsPage;

export const getServerSideProps = (async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getCategoryQueryOptions());

  await queryClient.prefetchQuery(
    getRawDataByIdentifierQueryOptions({
      identifier: lifestyleHeroSectionApiIdentifier,
    }),
  );
  await queryClient.prefetchQuery(
    getRawDataByIdentifierQueryOptions({
      identifier: lifestyleBannersSectionApiIdentifier,
    }),
  );

  await queryClient.prefetchQuery(
    getBestSellerProductsQueryOptions({
      axiosReqConfig: {
        params: {
          page: 1,
        },
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

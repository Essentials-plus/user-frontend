import {
  getBestSellerProductsQueryOptions,
  getCategoryQueryOptions,
  getRawDataByIdentifierQueryOptions,
} from "@/api-clients/user-api-client/queries";
import { authUserCookieName } from "@/constants";
import { parseJson } from "@/hooks/useUserSession";
import LifestyleProducts from "@/views/lifestyle-products";
import { lifestyleBannersSectionApiIdentifier } from "@/views/lifestyle-products/components/banners-section";
import { lifestyleHeroSectionApiIdentifier } from "@/views/lifestyle-products/components/hero-section";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";

const LifestyleProductsPage = () => {
  return (
    <>
      <LifestyleProducts />
    </>
  );
};

export default LifestyleProductsPage;

export const getServerSideProps = (async ({ req, res }) => {
  const queryClient = new QueryClient();
  const userStr = getCookie(authUserCookieName, { req, res });

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
      session: {
        user: parseJson(userStr),
      },
    },
  };
}) satisfies GetServerSideProps;

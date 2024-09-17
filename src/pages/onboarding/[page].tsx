import { userApiClient } from "@/api-clients/user-api-client";
import OnboardingHeader from "@/common/components/onboarding-header";
import { StepKeyValue } from "@/hooks/useOnboardingSteps";
import { Payment_Method, User } from "@/types/api-responses/users";
import { NextPageWithLayout } from "@/types/app-props";
import Onboarding from "@/views/onboarding";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";

type Props = {
  user: User;
  page: StepKeyValue;
  paymentMethod: Payment_Method | undefined;
};

const OnboardingPage: NextPageWithLayout<Props> = ({
  user,
  page,
  paymentMethod,
}) => {
  return (
    <>
      <OnboardingHeader page={page} />
      <Onboarding page={page} user={user} paymentMethod={paymentMethod} />;
    </>
  );
};

OnboardingPage.getLayout = (page) => {
  return <>{page}</>;
};
export default OnboardingPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  try {
    const token =
      getCookie("temp_auth", { req, res }) || getCookie("auth", { req, res });

    if (!token) throw new Error();

    const { data } = await userApiClient.get("/user", {
      headers: {
        authorization: token,
      },
    });

    const user = data.data;

    const page = query.page;

    let paymentMethod = null;

    try {
      const { data } = await userApiClient.get("/plan/payment/method", {
        headers: {
          authorization: token,
        },
      });
      paymentMethod = data?.data?.pm;
    } catch (error) {
      console.log(error);
    }

    return {
      props: { user, page, paymentMethod: paymentMethod },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/log-in",
        permanent: false,
      },
    };
  }
};

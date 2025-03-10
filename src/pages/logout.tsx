import routes from "@/config/routes";
import { authTokenCookieName, authUserCookieName } from "@/constants";
import { deleteCookie } from "cookies-next";
import { GetServerSideProps } from "next";

function logout() {
  return <div></div>;
}

export default logout;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  deleteCookie(authTokenCookieName, { req, res });
  deleteCookie(authUserCookieName, { req, res });

  return {
    redirect: {
      destination: routes.home,
      permanent: false,
    },
    props: {},
  };
};

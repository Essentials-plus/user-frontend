import { deleteCookie } from "cookies-next";
import { GetServerSideProps } from "next";

function logout() {
  return <div></div>;
}

export default logout;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  deleteCookie("auth", { req, res });
  deleteCookie("user", { req, res });

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
    props: {},
  };
};

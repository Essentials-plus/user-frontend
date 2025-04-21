import { authUserCookieName } from "@/constants";
import { parseJson } from "@/hooks/useUserSession";
import WeeklyMenu from "@/views/weekly-menu";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";

const WeeklyMenuPage = () => {
  return (
    <>
      <WeeklyMenu />
    </>
  );
};

export default WeeklyMenuPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const userStr = getCookie(authUserCookieName, { req, res });

  return {
    props: {
      session: {
        user: parseJson(userStr),
      },
    },
  };
};

import WeeklyMenu from "@/views/weekly-menu";

const WeeklyMenuPage = () => {
  return (
    <>
      <WeeklyMenu />
    </>
  );
};

export default WeeklyMenuPage;

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   try {
//     const userStr = getCookie("user", {
//       req,
//       res,
//     });

//     const user: any = parseJson(userStr);

//     if (user && user.access == "product") {
//       throw new Error();
//     }

//     return {
//       props: {},
//     };
//   } catch (err) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
// };

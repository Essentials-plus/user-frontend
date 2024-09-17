import publicApiClient from "@/api-clients/public-api-client";
import Button from "@/common/components/ui/button";
import { setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

type Props = {
  token: string;
  isAlreadyVerified: boolean;
  data: any;
};

function VerifyToken({ token, isAlreadyVerified, data }: Props) {
  const router = useRouter();

  const handleMealOrderRoute = () => {
    setCookie("temp_auth", data.data);
    router.push("/onboarding/credentials");
  };

  return (
    <div className="flex items-center justify-center h-[400px]">
      <div className="flex flex-col items-center justify-center">
        <>
          {!isAlreadyVerified ? (
            <>
              <div className="text-center text-4xl font-bold">
                Gebruiker succesvol geverifieerd
              </div>
              <div className="pt-10"></div>
              <div className="flex items-center gap-5">
                <Button
                  intent={"outline-primary"}
                  onClick={() => router.push("/log-in")}
                >
                  Terug naar Inloggen
                </Button>
                {/* <Button onClick={handleMealOrderRoute}>
                  Maaltijd bestellen
                </Button> */}
              </div>
            </>
          ) : (
            <>
              <div className="text-center text-4xl font-bold">
                Gebruiker al geverifieerd of ongeldig token
              </div>
              <div className="pt-10"></div>

              <div>
                <Button
                  intent={"outline-primary"}
                  onClick={() => router.push("/log-in")}
                >
                  Terug naar Inloggen
                </Button>
              </div>
            </>
          )}
        </>

        <div className="pt-5"></div>
      </div>
    </div>
  );
}

export default VerifyToken;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const token = query.token;

    if (!token) throw new Error();

    let isAlreadyVerified = false;

    let data = null;

    try {
      const { data: cc } = await publicApiClient.post(
        "/auth/user/signup/verify",
        {
          token,
        },
      );
      data = cc;
    } catch (error) {
      isAlreadyVerified = true;
    }

    return {
      props: {
        token: token,
        isAlreadyVerified,
        data,
      },
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

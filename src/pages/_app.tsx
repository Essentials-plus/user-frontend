import GlobalDialogs from "@/common/components/GlobalDialogs";
import Layout from "@/common/components/layout";
import { Toaster } from "@/common/components/ui/sonner";
import Spinner from "@/common/components/ui/spinner";
import { CartDataProvider } from "@/hooks/useCartData";
import UserSessionProvider from "@/hooks/useUserSession";
import ProtectedRoutes from "@/lib/ProtectedRoutes";
import { getApiErrorMessage } from "@/lib/utils";
import "@/styles/globals.css";
import { AppPropsWithLayout } from "@/types/app-props";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Check, Info, OctagonAlert, TriangleAlert } from "lucide-react";
import "moment/locale/nl";
import { Montserrat, Open_Sans, Oswald, Roboto_Serif } from "next/font/google";
import ScrollToTop from "react-scroll-to-top";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError(error) {
        toast.error(getApiErrorMessage(error));
      },
    },
  },
});

const openSans = Open_Sans({ subsets: ["latin"], variable: "--open-sans" });
const oswald = Oswald({ subsets: ["latin"], variable: "--oswald" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--montserrat" });
const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--roboto-serif",
});

export default function App({
  Component,
  pageProps,
  token,
  user,
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <Layout>{page}</Layout>
      </>
    ));
  return (
    <QueryClientProvider client={queryClient}>
      <UserSessionProvider session={{ token, user }}>
        <CartDataProvider>
          <style jsx global>{`
            :root {
              --open-sans: ${openSans.style.fontFamily};
              --oswald: ${oswald.style.fontFamily};
              --montserrat: ${montserrat.style.fontFamily};
              --roboto-serif: ${robotoSerif.style.fontFamily};
            }
          `}</style>

          {getLayout(<Component {...pageProps} />)}
          <ScrollToTop smooth />

          <Toaster
            visibleToasts={5}
            toastOptions={{
              classNames: {
                description: "text-xs opacity-80",
                closeButton:
                  "static shrink-0 order-3 ml-auto translate-y-0 rounded-sm bg-muted hover:!bg-muted border-none hover:ring-1 ring-muted-foreground/50 duration-100",
              },
            }}
            closeButton
            icons={{
              error: <OctagonAlert className="size-4" />,
              info: <Info className="size-4" />,
              warning: <TriangleAlert className="size-4" />,
              success: <Check className="size-4" />,
              loading: <Spinner className="size-4" />,
            }}
          />
          <GlobalDialogs />
        </CartDataProvider>
      </UserSessionProvider>
    </QueryClientProvider>
  );
}

// Route protect
App.getInitialProps = ProtectedRoutes;

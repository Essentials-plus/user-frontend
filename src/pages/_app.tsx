import GlobalDialogs from "@/common/components/GlobalDialogs";
import Layout from "@/common/components/layout";
import { Toaster } from "@/common/components/ui/sonner";
import Spinner from "@/common/components/ui/spinner";
import UserSessionProvider from "@/hooks/useUserSession";
import { getApiErrorMessage } from "@/lib/utils";
import "@/styles/globals.css";
import { AppPropsWithLayout } from "@/types/app-props";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Check, Info, OctagonAlert, TriangleAlert } from "lucide-react";
import { Montserrat, Open_Sans, Oswald, Roboto_Serif } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import { toast } from "sonner";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--open-sans",
  weight: ["300", "400", "500", "700", "800"],
});
const oswald = Oswald({ subsets: ["latin"], variable: "--oswald" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--montserrat" });
const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--roboto-serif",
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
          mutations: {
            onError(error) {
              toast.error(getApiErrorMessage(error));
            },
          },
        },
      }),
  );

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <Layout>{page}</Layout>
      </>
    ));
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <HydrationBoundary state={pageProps?.dehydratedState}>
        <NuqsAdapter>
          <UserSessionProvider session={pageProps.session}>
            <style jsx global>{`
              :root {
                --open-sans: ${openSans.style.fontFamily};
                --oswald: ${oswald.style.fontFamily};
                --montserrat: ${montserrat.style.fontFamily};
                --roboto-serif: ${robotoSerif.style.fontFamily};
              }
            `}</style>
            {getLayout(<Component {...pageProps} />)}
            <ScrollToTop className="max-lg:!bottom-5 max-lg:!right-5" smooth />
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
          </UserSessionProvider>
        </NuqsAdapter>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

// Route protect

// App.getInitialProps = ProtectedRoutes;
//

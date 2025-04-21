import routes from "@/config/routes";
import { cx } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, ReactNode } from "react";
import useMeasure from "react-use-measure";

const SettingsPageLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const router = useRouter();
  const [heroRef, heroBounds] = useMeasure();
  return (
    <section className="my-8 lg:mb-20 lg:mt-14">
      <div className="container" ref={heroRef}></div>
      <div
        className="grid grid-cols-1 gap-x-[140px] lg:grid-cols-[250px,auto] lg:pl-[--paddingLeft]"
        style={{ "--paddingLeft": `${heroBounds.x + 24}px` } as CSSProperties}
      >
        <div className="lg:mt-11">
          <ul className="gap-x-1 overflow-x-auto max-lg:flex max-lg:whitespace-nowrap max-lg:px-5 lg:space-y-5">
            <li
              className={cx(
                "lg:text-xl font-bold",
                router.pathname === routes.mealBoxSettings &&
                  "text-app-darker-green max-lg:border-app-darker-green max-lg:border-b-2 border-transparent",
              )}
            >
              <Link
                className="max-lg:inline-block max-lg:px-4 max-lg:py-3"
                href={routes.mealBoxSettings}
              >
                Maaltijdbox instellingen
              </Link>
            </li>
            <li
              className={cx(
                "lg:text-xl font-bold",
                router.pathname === routes.accountInformation &&
                  "text-app-darker-green max-lg:border-app-darker-green max-lg:border-b-2 border-transparent",
              )}
            >
              <Link
                className="max-lg:inline-block max-lg:px-4 max-lg:py-3"
                href={routes.accountInformation}
              >
                Account informatie
              </Link>
            </li>
            <li
              className={cx(
                "lg:text-xl font-bold",
                router.pathname === routes.orderHistory &&
                  "text-app-darker-green max-lg:border-app-darker-green max-lg:border-b-2 border-transparent",
              )}
            >
              <Link
                className="max-lg:inline-block max-lg:px-4 max-lg:py-3"
                href={routes.orderHistory}
              >
                Bestelgeschiedenis
              </Link>
            </li>
          </ul>
        </div>

        <div className="max-lg:mt-5">
          <div className="max-lg:px-5">
            <h4 className="__h5 lg:__h4">Essentials+</h4>
            <h1 className="mt-1 font-semibold max-lg:text-xl lg:text-[65px]">
              {title}
            </h1>
          </div>

          <div className="mt-5 max-w-[932px] max-lg:px-5 lg:mt-16">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPageLayout;

import { cx } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
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
    <section className="mt-14 mb-20">
      <div className="container" ref={heroRef}></div>
      <div
        className="grid grid-cols-[250px,auto] gap-x-[140px]"
        style={{ paddingLeft: heroBounds.x + 24 }}
      >
        <div className="mt-11">
          <ul className="space-y-5">
            <li
              className={cx(
                "text-xl font-bold",
                router.pathname === "/meal-box-settings" &&
                  "text-app-darker-green"
              )}
            >
              <Link href={"/meal-box-settings"}>Maaltijdbox instellingen</Link>
            </li>
            <li
              className={cx(
                "text-xl font-bold",
                router.pathname === "/account-information" &&
                  "text-app-darker-green"
              )}
            >
              <Link href={"/account-information"}>Account informatie</Link>
            </li>
            <li
              className={cx(
                "text-xl font-bold",
                router.pathname === "/order-history" && "text-app-darker-green"
              )}
            >
              <Link href={"/order-history"}>Bestelgeschiedenis</Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="">
            <h4 className=" __h4">Essentials+</h4>
            <h1 className="text-[65px] font-semibold ">{title}</h1>
          </div>

          <div className="mt-16 max-w-[932px]">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPageLayout;

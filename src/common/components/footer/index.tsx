import Logo from "@/common/components/icons/logo";
import Button from "@/common/components/ui/button";
import { footer } from "@/constants/footer";
import useSubscribeToNewsletter from "@/hooks/useSubscribeToNewsletter";
import Link from "next/link";
import useMeasure from "react-use-measure";
import Spinner from "../ui/spinner";

const Footer = () => {
  const [ref, bounds] = useMeasure();

  const {
    email,
    handleEmailChange,
    handleFormSubmit,
    subscribeToNewsletterMutation,
    validationError,
  } = useSubscribeToNewsletter();

  return (
    <footer className="pb-8 sm:pb-10 lg:pb-[30px]">
      <div
        style={{
          marginLeft: bounds.left + 24,
        }}
        className="h-3 rounded-l-[50px] bg-app-darker-green lg:h-4"
      ></div>

      <div ref={ref} className="container">
        <div className="mt-11">
          <div className="flex flex-col items-center justify-between gap-y-6 sm:flex-row">
            <Logo className="max-w-[200px] sm:max-w-[280px] md:max-w-[320px]" />
            <div className="flex flex-wrap justify-center gap-4 sm:justify-end sm:gap-x-5">
              {footer.social.map(({ icon, url }, i) => (
                <a
                  href={url}
                  key={i}
                  className="__c_all aspect-square size-10 rounded-full bg-app-grey text-xl duration-200 hover:bg-app-grey/60 sm:size-[45px]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="my-8 border-b border-app-dark-grey/50 sm:my-10"></div>

        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[520px,auto] lg:gap-x-[80px] xl:gap-x-[140px]">
          <div>
            <h3 className="__h3 text-lg font-normal sm:text-xl">
              Blijf op de hoogte
            </h3>
            <p className="__body_16 mb-4 mt-3 text-sm sm:text-base">
              Schrijf je nu in voor onze wekelijkse nieuwsbrief en ontvang
              essentiële informatie!
            </p>
            <div className="flex flex-col items-start gap-y-2">
              <div className="flex w-full flex-col gap-y-3 sm:flex-row sm:items-center sm:gap-x-6">
                <input
                  type="text"
                  className="h-12 w-full rounded-full border border-[#6B6B6B] px-5 text-sm outline-none"
                  placeholder="Vul e-mailadres in"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Button
                  onClick={handleFormSubmit}
                  disabled={subscribeToNewsletterMutation.isPending}
                  className="w-full px-5 text-sm sm:w-[132px] sm:text-base"
                >
                  {subscribeToNewsletterMutation.isPending ? (
                    <Spinner className="size-4" />
                  ) : (
                    "Aanmelden"
                  )}
                </Button>
              </div>
              {validationError && (
                <p className="text-sm text-red-500">{validationError}</p>
              )}
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-y-4 sm:mt-[60px] sm:flex-row sm:items-center">
              <div className="flex items-center gap-x-2">
                <div className="h-2.5 w-12 rounded-full bg-app-yellow"></div>
                <p className="text-sm text-app-text">
                  © {new Date().getFullYear()} EssentialsPlus
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-x-4">
                {footer.paymentIcons.map(({ icon }, i) => (
                  <span key={i}>{icon}</span>
                ))}
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap justify-between gap-y-8">
            {footer.navigations.map(({ label, links }, i) => (
              <ul key={i} className="min-w-[130px] space-y-2.5">
                <li className="pb-2.5">
                  <h4 className="__h4 text-base font-semibold">{label}</h4>
                </li>
                {links.map(({ label, url }, i) => (
                  <li key={i}>
                    <Link
                      href={url}
                      className="__body_16 text-sm duration-200 hover:opacity-70"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

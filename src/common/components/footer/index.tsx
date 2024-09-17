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
    <footer className="pb-[30px]">
      <div
        style={{
          marginLeft: bounds.left + 24,
        }}
        className="h-4 rounded-l-[50px] bg-app-darker-green"
      ></div>
      <div ref={ref} className="container">
        <div className="mt-11">
          <div className="flex items-center justify-between">
            <Logo className="max-w-[320px]" />
            <div className="flex items-center gap-x-5">
              {footer.social.map(({ icon, url }, i) => (
                <a
                  href={url}
                  key={i}
                  className="text-xl h-[45px] aspect-square __c_all rounded-full bg-app-grey duration-200 hover:bg-app-grey/60"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 mb-10 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-b border-app-dark-grey"></div>

        <div className="grid grid-cols-[520px,auto] gap-x-[140px]">
          <div>
            <h3 className="__h3 font-normal">Blijf op de hoogte</h3>
            <p className="mt-3 mb-4 __body_16">
              Schrijf je nu in voor onze wekelijkse nieuwsbrief en ontvang
              essentiële informatie!
            </p>
            <div className="flex flex-col items-start gap-y-2">
              <div className="flex items-center gap-x-6 w-full">
                <input
                  type="text"
                  className="grow h-12 px-5 border border-[#6B6B6B] rounded-full outline-none"
                  placeholder="Vul e-mailadres in"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Button
                  onClick={handleFormSubmit}
                  disabled={subscribeToNewsletterMutation.isPending}
                  className="px-5 text-base w-[132px]"
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

            <div className="mt-[60px] flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <div className="h-2.5 rounded-full bg-app-yellow w-12"></div>
                <p className="text-sm text-app-text">© 2024 EssentialsPlus</p>
              </div>
              <div className="flex items-center gap-x-4">
                {footer.paymentIcons.map(({ icon }, i) => (
                  <span key={i}>{icon}</span>
                ))}
              </div>
            </div>
          </div>

          <nav className="flex justify-between">
            {footer.navigations.map(({ label, links }, i) => (
              <ul key={i} className="space-y-2.5">
                <li className="pb-2.5">
                  <h4 className="__h4 text-lg">{label}</h4>
                </li>
                {links.map(({ label, url }, i) => (
                  <li key={i}>
                    <Link
                      href={url}
                      className="__body_16 duration-200 hover:opacity-70"
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

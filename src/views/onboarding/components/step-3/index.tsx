import { userApiClient } from "@/api-clients/user-api-client";
import CheckIcon from "@/common/components/icons/check-icon";
import ClarnaIcon from "@/common/components/icons/clarna-icon";
import IDealIcon from "@/common/components/icons/i-deal-icon";
import MasterCardIcon from "@/common/components/icons/mastercard-icon";
import PayPalIcon from "@/common/components/icons/paypal-icon";
import Button from "@/common/components/ui/button";
import Spinner from "@/common/components/ui/spinner";
import useTotalCalorie from "@/hooks/useTotalCalorie";
import { useUserSession } from "@/hooks/useUserSession";
import { cn, getClientErrorMsg, getLockdownDate } from "@/lib/utils";
import { Payment_Method, User } from "@/types/api-responses/users";
import { deleteCookie, getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import PaymentSuccessModal from "./PaymentSuccessModal";
const Moment = dynamic(() => import("react-moment"), { ssr: false });

const cards = [
  {
    icon: <IDealIcon className="w-8" />,
    text: "Betaal met Ideal",
  },
  {
    icon: <PayPalIcon className="w-14" />,
    text: "Betaal Paypal",
  },
  {
    icon: <MasterCardIcon className="w-14" />,
    text: "Voeg een creditcard",
  },
  {
    icon: <ClarnaIcon className="w-14" />,
    text: "Betaal op factuur",
  },
];

type Props = {
  user: User;
  payment_method?: Payment_Method;
};

type PaymentMethodType = {
  type: "card" | "paypal" | "ideal" | "klarna";
  info: string; // currently for dummy
};

const currency_type = process.env.NEXT_PUBLIC_CURRENCY_TYPE || "eur";

const Step3 = ({ user, payment_method }: Props) => {
  const router = useRouter();
  const plan = user.plan;
  const totalRequiredCalorie = useTotalCalorie(user);
  const lockdownDay = new Date();
  lockdownDay.setDate(user.zipCode?.lockdownDay! + 2);

  const [paymentMethod, setPaymentMethod] = useState<
    PaymentMethodType | undefined
  >(
    payment_method
      ? {
          info: "Card Added",
          type:
            payment_method.type == "card"
              ? "card"
              : payment_method.type == "paypal"
              ? "paypal"
              : "ideal",
        }
      : undefined,
  );

  const { totalPrice } = useMemo(() => {
    const totalKcal = (totalRequiredCalorie || 0) * plan.numberOfDays;
    const totalPrice = Number(
      (
        totalKcal * Number(process.env.NEXT_PUBLIC_CALORIE_PRICE || 0.0055)
      ).toFixed(2),
    );
    return {
      totalKcal,
      totalPrice,
    };
  }, [totalRequiredCalorie, plan]);

  const { login } = useUserSession();

  const [termsAgree, setTermsAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const confirmOrder = async () => {
    if (loading) return;
    try {
      setLoading(true);

      const token = (getCookie("temp_auth") || getCookie("auth")) as string;

      await userApiClient.post("/plan/confirm");

      login(
        token,
        {
          id: user.id,
          name: user.name,
          email: user.email,
          profile: user.profile,
          access: "all",
        },
        true,
      );

      deleteCookie("temp_auth");

      setOrderSuccess(true);
      // await router.push("/weekly-menu");

      setLoading(false);
    } catch (err) {
      toast.error(getClientErrorMsg(err));
      setLoading(false);
    }
  };

  const handleSession = async (t = "card") => {
    try {
      const { data: cc } = await userApiClient.post(
        "/plan/payment/session?type=" + t,
        {},
        {
          headers: {
            authorization: getCookie("temp_auth"),
          },
        },
      );
      const url = cc.data.session.url;
      await router.push(url);
    } catch (error) {
      toast.error(getClientErrorMsg(error));
    }
  };
  const lockdownDate = getLockdownDate(user.zipCode?.lockdownDay!);

  return (
    <div>
      <div className="grid grid-cols-[auto,333px] gap-x-8">
        <div>
          <h3 className="__h3 font-bold">Uw betaalgegevens:</h3>
          <div className="mt-2 px-4 py-2 bg-[#41AA3F]/15">
            <p className="text-app-dark-green text-sm">
              Jouw betaalgegevens zijn nodig om jouw eerst maaltijdbox te
              reserveren en je flexibele, doorlopende lidmaatschap bij ons aan
              te gaan. Het bedrag zoals hieronder genoemd wordt 2 tot 4 dagen
              voor de bezorging van je maaltijdbox in rekening gebracht.
            </p>
          </div>

          <div className="my-5 grid grid-cols-2 gap-5">
            {currency_type == "eur" && (
              // <PaymentMethodModal
              //   onClose={() => {
              //     setPaymentMethod({
              //       type: "ideal",
              //       info: "Payment method added",
              //     });
              //   }}
              //   type="ideal"
              // >
              <button
                disabled={!!paymentMethod}
                className="relative"
                onClick={() => handleSession("ideal")}
              >
                <div
                  className={cn(
                    "border border-app-dark-grey cursor-pointer hover:bg-app-primary hover:bg-opacity-25 transition-all duration-200 h-[78px] w-full __c_all justify-start px-6 ",
                    paymentMethod && "pointer-events-none opacity-50",
                  )}
                >
                  <div className="flex items-center gap-x-3.5">
                    {cards[0].icon}

                    <p className="text-sm">{cards[0].text}</p>
                  </div>
                </div>
                {paymentMethod && paymentMethod.type == "ideal" && (
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <CheckIcon width={32} height={32} />
                  </div>
                )}
              </button>
              // </PaymentMethodModal>
            )}

            <button
              disabled={!!paymentMethod}
              className="relative"
              onClick={() => handleSession("paypal")}
            >
              <div
                className={cn(
                  "border cursor-pointer border-app-dark-grey hover:bg-app-primary hover:bg-opacity-25 transition-all duration-200 h-[78px] w-full __c_all justify-start px-6 ",
                  paymentMethod && "pointer-events-none opacity-50",
                )}
              >
                <div className="flex items-center gap-x-3.5">
                  {cards[1].icon}

                  <p className="text-sm">{cards[1].text}</p>
                </div>
              </div>
              {paymentMethod && paymentMethod.type == "paypal" && (
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  <CheckIcon width={32} height={32} />
                </div>
              )}
            </button>
            {/* <PaymentMethodModal
              onClose={() => {
                setPaymentMethod({
                  type: "card",
                  info: "Payment method added",
                });
              }}
              type="card"
            > */}
            <button
              disabled={!!paymentMethod}
              className="relative"
              onClick={() => handleSession("card")}
            >
              <div
                className={cn(
                  "border cursor-pointer border-app-dark-grey hover:bg-app-primary hover:bg-opacity-25 transition-all duration-200 h-[78px] w-full __c_all justify-start px-6 ",
                  paymentMethod && "pointer-events-none opacity-50",
                )}
              >
                <div className="flex items-center gap-x-3.5">
                  {cards[2].icon}

                  <p className="text-sm">{cards[2].text}</p>
                </div>
              </div>
              {paymentMethod && paymentMethod.type == "card" && (
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  <CheckIcon width={32} height={32} />
                </div>
              )}
            </button>
            {/* </PaymentMethodModal> */}

            {/* <div
              className={cn(
                "border border-app-dark-grey h-[78px] w-full __c_all justify-start px-6",
                paymentMethod &&
                  paymentMethod.type != "klarna" &&
                  "pointer-events-none opacity-50"
              )}
            >
              <div className="flex items-center gap-x-3.5">
                {cards[3].icon}

                <p className="text-sm">
                  {paymentMethod && paymentMethod.type == "klarna"
                    ? paymentMethod.info
                    : cards[3].text}
                </p>
              </div>
            </div> */}
          </div>

          <div className="mt-3 flex items-start gap-x-3">
            <input
              type="checkbox"
              className="w-6 h-6 accent-app-dark-green -translate-y-0.5"
              id="checkBox"
              checked={termsAgree}
              onChange={() => setTermsAgree((s) => !s)}
            />
            <label htmlFor="checkBox" className="text-sm">
              Ja, Essentials+ mag mij informeren over de bezorging, inhoud van
              mijn box én persoonlijke aanbiedingen. Lees hier onze
              Privacyvoorwaarden.
            </label>
          </div>

          <div className="mt-10 mb-2.5">
            <strong>Voorwaarden:</strong> Door op “Bestellen en betalen” te
            klikken, ga je akkoord met onze{" "}
            <Link
              target="_blank"
              href="/privacy-policy"
              className="text-app-dark-green underline"
            >
              Algemene voorwaarden
            </Link>{" "}
            en het{" "}
            <Link
              target="_blank"
              href="/cookie-terms"
              className="text-app-dark-green underline"
            >
              Privacy- en Cookiestatement
            </Link>
            , en geef je toestemming tot het activeren van een fexibel
            doorlopend lidmaatschap. Essentials+ wordt gemachtigd om wekelijks
            een bedrag in rekening te brengen. Opzeggen of pauzeren kan
            dagelijks voor de deadline van jouw online account.
          </div>

          <div className="flex items-center gap-x-5">
            {/* <Button
              intent={"yellow"}
              className="border border-black w-full h-[42px]"
            >
              Verder Winkelen
            </Button> */}
            <PaymentSuccessModal
              header="Uw bestelling is bevestigd"
              description={`Gefeliciteerd met het aangaan van een gezond levensstijl. <br/> Klik op de knop hieronder om toegang te krijgen tot uw maaltijdmenu’s`}
              onConfirm={orderSuccess}
              setOrderSuccess={setOrderSuccess}
              // loading={loading}
              // loading={true}
            />
            <Button
              disabled={loading || !termsAgree}
              loading={loading}
              type="button"
              className="border border-black w-full h-[42px]"
              onClick={confirmOrder}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner className="w-6 h-6" />
                  Bestellen en betalen...
                </div>
              ) : (
                "Bestellen en betalen"
              )}
            </Button>
          </div>
        </div>

        <div>
          <div className="border border-black rounded-3xl overflow-hidden p-5">
            <h4 className="text-base font-bold">Bestel overzicht:</h4>
            <div className="flex items-center gap-x-5 mt-2.5">
              <Image
                src={"/imgs/afbeelding.png"}
                alt="afbeelding"
                width={288}
                height={192}
                className="max-w-[96px]"
              />
              <p>
                {plan?.numberOfDays} dagen met {plan?.mealsPerDay} maaltijden
                per dag.
              </p>
            </div>
            <p className="py-1 border-b border-app-dark-grey">
              {plan.numberOfDays} dagen - {plan.numberOfDays * plan.mealsPerDay}{" "}
              maaltijden
            </p>
            <div className="flex items-center justify-between mt-1">
              <p>Prijs per week:</p>
              <p>
                {currency_type == "eur" ? "€" : "$"}
                {totalPrice}
              </p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p>Bezorgkosten:</p>
              <p>{currency_type == "eur" ? "€" : "$"}5.99</p>
            </div>
            {/* <a
              href="#"
              className="inline-block my-2 text-app-dark-green underline"
            >
              Heb je een kortingscode?
            </a> */}
            <div className="mt-4"></div>
            <div className="bg-[#f3f3f3] py-1 flex items-center justify-between text-lg">
              <p> Totaal eerst box:</p>{" "}
              <p>
                {currency_type == "eur" ? "€" : "$"}
                {(totalPrice + 5.99).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="border border-black rounded-3xl overflow-hidden p-5 mt-6">
            <div className="space-y-2.5">
              <h4 className="text-base font-bold">Bezorging</h4>
              <p>Eerste bezorging in uw regio:</p>
              <p>
                <Moment
                  className="capitalize"
                  format="dddd, DD/MM/YYYY"
                  add={{ days: 2 }}
                  locale="nl"
                >
                  {lockdownDate}
                </Moment>
              </p>
              {/* <p>
                <Moment
                  format="ll"
                  date={getDateByDayOfTheWeekNumber(user.lockdownDay + 2)}
                />{" "}
                13:00 - 17:00
              </p> */}
              <p className="px-2 py-1 bg-[#f3f3f3]">
                Essentials+ biedt een flexibel doorlopend lidmaatschap. Jouw
                bestelling wordt elke week automatisch verlengd, tenzij je de
                lidmaatschap eenvoudig opzegt of pauzeert via jouw account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;

// export function getDateByDayOfTheWeekNumber(dayOfWeek: number) {
//   const now = new Date();
//   const currentDay = now.getDay();
//   const dayOffset = dayOfWeek - currentDay;
//   const targetDate = new Date(now.setDate(now.getDate() + dayOffset));

//   return targetDate;
// }

import { userApiClient } from '@/api-clients/user-api-client';
import CheckIcon from '@/common/components/icons/check-icon';
import ClarnaIcon from '@/common/components/icons/clarna-icon';
import IDealIcon from '@/common/components/icons/i-deal-icon';
import MasterCardIcon from '@/common/components/icons/mastercard-icon';
import PayPalIcon from '@/common/components/icons/paypal-icon';
import Button from '@/common/components/ui/button';
import Spinner from '@/common/components/ui/spinner';
import routes from '@/config/routes';
import { authTokenCookieName, tempAuthTokenCookieName } from '@/constants';
import useActiveCurrency from '@/hooks/useActiveCurrency';
import useFirstRender from '@/hooks/useFirstRender';
import useTotalCalorie from '@/hooks/useTotalCalorie';
import { useUserSession } from '@/hooks/useUserSession';
import {
  cn,
  getClientErrorMsg,
  getDateFromIsoWeekAndDay,
  getNextDeliveryDate,
} from '@/lib/utils';
import { Payment_Method, User } from '@/types/api-responses/users';
import { deleteCookie, getCookie } from 'cookies-next';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import PaymentSuccessModal from './PaymentSuccessModal';

const cards = [
  {
    icon: <IDealIcon className="w-8" />,
    text: 'Betaal met Ideal',
  },
  {
    icon: <PayPalIcon className="w-14" />,
    text: 'Betaal Paypal',
  },
  {
    icon: <MasterCardIcon className="w-14" />,
    text: 'Voeg een creditcard',
  },
  {
    icon: <ClarnaIcon className="w-14" />,
    text: 'Betaal op factuur',
  },
];

type Props = {
  user: User;
  payment_method?: Payment_Method;
};

type PaymentMethodType = {
  type: 'card' | 'paypal' | 'ideal' | 'klarna';
  info: string; // currently for dummy
};

const Step3 = ({ user, payment_method }: Props) => {
  const isFirstRedner = useFirstRender(100);
  const { currency_symbol, currency_type } = useActiveCurrency();

  const router = useRouter();
  const plan = user.plan;
  const totalRequiredCalorie = useTotalCalorie(user);

  const [paymentMethod] = useState<PaymentMethodType | undefined>(
    payment_method
      ? {
          info: 'Card Added',
          type:
            payment_method.type == 'card'
              ? 'card'
              : payment_method.type == 'paypal'
                ? 'paypal'
                : 'ideal',
        }
      : undefined,
  );

  const { totalPrice } = useMemo(() => {
    const totalKcal = (totalRequiredCalorie || 0) * plan?.numberOfDays;
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

      const token = (getCookie(tempAuthTokenCookieName) ||
        getCookie(authTokenCookieName)) as string;

      await userApiClient.post('/plan/confirm');

      login(
        token,
        {
          id: user.id,
          name: user.name,
          email: user.email,
          profile: user.profile,
          access: 'all',
        },
        true,
      );

      deleteCookie(tempAuthTokenCookieName);

      setOrderSuccess(true);
      // await router.push(routes.weeklyMenu);

      setLoading(false);
    } catch (err) {
      toast.error(getClientErrorMsg(err));
      setLoading(false);
    }
  };

  const handleSession = async (t = 'card') => {
    try {
      const { data: cc } = await userApiClient.post(
        '/plan/payment/session?type=' + t,
        {},
        {
          headers: {
            authorization: getCookie(tempAuthTokenCookieName),
          },
        },
      );
      const url = cc.data.session.url;
      await router.push(url);
    } catch (error) {
      toast.error(getClientErrorMsg(error));
    }
  };

  const lockdownDate = useMemo(
    () =>
      getDateFromIsoWeekAndDay(
        user.plan?.confirmOrderWeek,
        user.zipCode?.lockdownDay!,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user.zipCode?.lockdownDay, isFirstRedner],
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 gap-x-8 lg:grid-cols-[auto,333px]">
        <div>
          <h3 className="__h3 font-bold max-lg:text-lg">Uw betaalgegevens:</h3>
          <div className="mt-2 bg-[#41AA3F]/15 px-4 py-2">
            <p className="text-sm text-app-dark-green">
              Jouw betaalgegevens zijn nodig om jouw eerst maaltijdbox te
              reserveren en je flexibele, doorlopende lidmaatschap bij ons aan
              te gaan. Het bedrag zoals hieronder genoemd wordt 2 tot 4 dagen
              voor de bezorging van je maaltijdbox in rekening gebracht.
            </p>
          </div>

          <div className="my-5 grid grid-cols-1 gap-5 gap-y-3 lg:grid-cols-2">
            {currency_type == 'eur' && (
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
                onClick={() => handleSession('ideal')}
              >
                <div
                  className={cn(
                    'border border-app-dark-grey cursor-pointer hover:bg-app-primary hover:bg-opacity-25 transition-all duration-200 h-[55px] max-lg:px-4 lg:h-[78px] w-full __c_all justify-start px-6 ',
                    paymentMethod && 'pointer-events-none opacity-50',
                  )}
                >
                  <div className="flex items-center gap-x-3.5">
                    {cards[0].icon}

                    <p className="text-sm">{cards[0].text}</p>
                  </div>
                </div>
                {paymentMethod && paymentMethod.type == 'ideal' && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <CheckIcon width={32} height={32} />
                  </div>
                )}
              </button>
              // </PaymentMethodModal>
            )}

            <button
              disabled={!!paymentMethod}
              className="relative"
              onClick={() => handleSession('paypal')}
            >
              <div
                className={cn(
                  'border cursor-pointer border-app-dark-grey hover:bg-app-primary hover:bg-opacity-25 transition-all duration-200 h-[55px] max-lg:px-4 lg:h-[78px] w-full __c_all justify-start px-6 ',
                  paymentMethod && 'pointer-events-none opacity-50',
                )}
              >
                <div className="flex items-center gap-x-3.5">
                  {cards[1].icon}

                  <p className="text-sm">{cards[1].text}</p>
                </div>
              </div>
              {paymentMethod && paymentMethod.type == 'paypal' && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
              onClick={() => handleSession('card')}
            >
              <div
                className={cn(
                  'border cursor-pointer border-app-dark-grey hover:bg-app-primary hover:bg-opacity-25 transition-all duration-200 h-[55px] max-lg:px-4 lg:h-[78px] w-full __c_all justify-start px-6 ',
                  paymentMethod && 'pointer-events-none opacity-50',
                )}
              >
                <div className="flex items-center gap-x-3.5">
                  {cards[2].icon}

                  <p className="text-sm">{cards[2].text}</p>
                </div>
              </div>
              {paymentMethod && paymentMethod.type == 'card' && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <CheckIcon width={32} height={32} />
                </div>
              )}
            </button>
            {/* </PaymentMethodModal> */}

            {/* <div
              className={cn(
                "border border-app-dark-grey h-[55px] max-lg:px-4 lg:h-[78px] w-full __c_all justify-start px-6",
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
              className="size-6 -translate-y-0.5 accent-app-dark-green"
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

          <div className="mb-4 mt-5 max-lg:text-sm lg:mb-3 lg:mt-10">
            <strong>Voorwaarden:</strong> Door op “Bestellen en betalen” te
            klikken, ga je akkoord met onze{' '}
            <Link
              target="_blank"
              href={routes.privacyPolicy}
              className="text-app-dark-green underline"
            >
              Algemene voorwaarden
            </Link>{' '}
            en het{' '}
            <Link
              target="_blank"
              href={routes.cookieTerms}
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
              className="h-[42px] w-full border border-black"
              onClick={confirmOrder}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner className="size-4 lg:size-6" />
                  Bestellen en betalen...
                </div>
              ) : (
                'Bestellen en betalen'
              )}
            </Button>
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-xl border border-black p-5 lg:rounded-3xl">
            <h4 className="text-base font-bold">Bestel overzicht:</h4>
            <div className="mt-2.5 flex items-center gap-x-5">
              <Image
                src={'/imgs/afbeelding.png'}
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
            <p className="border-b border-app-dark-grey py-1">
              {plan?.numberOfDays} dagen -{' '}
              {plan?.numberOfDays * plan?.mealsPerDay} maaltijden
            </p>
            <div className="mt-1 flex items-center justify-between">
              <p>Prijs per week:</p>
              <p>
                {currency_symbol}
                {totalPrice}
              </p>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <p>Bezorgkosten:</p>
              <p>{currency_symbol}5.99</p>
            </div>
            {/* <a
              href="#"
              className="inline-block my-2 text-app-dark-green underline"
            >
              Heb je een kortingscode?
            </a> */}
            <div className="mt-4"></div>
            <div className="flex items-center justify-between bg-[#f3f3f3] py-1 text-lg">
              <p> Totaal eerst box:</p>{' '}
              <p>
                {currency_symbol}
                {(totalPrice + 5.99).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-black p-5 lg:rounded-3xl">
            <div className="space-y-2.5">
              <h4 className="text-base font-bold">Bezorging</h4>
              <p>Eerste bezorging in uw regio:</p>
              <p className={cn(isFirstRedner && 'opacity-0')}>
                {format(getNextDeliveryDate(lockdownDate), 'EEEE, dd/MM/yyyy', {
                  locale: nl,
                })}
              </p>
              {/* <p>
                <Moment
                  format="ll"
                  date={getDateByDayOfTheWeekNumber(user.lockdownDay + 2)}
                />{" "}
                13:00 - 17:00
              </p> */}
              <p className="bg-[#f3f3f3] px-2 py-1">
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

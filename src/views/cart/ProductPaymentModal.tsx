import { userApiClient } from "@/api-clients/user-api-client";
import Button from "@/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import { getApiErrorMessage, getClientErrorMsg } from "@/lib/utils";
import { PMDTYPE } from "@/types/api-responses";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

// type FormProps = {
//   clientSecret?: string;
//   onClose: () => any;
// };

type Props = {
  children: ReactNode;
  price: number;
  couponId?: string;
  // eslint-disable-next-line no-unused-vars
  onClose: (type: "A" | "B") => any;
};

export function ProductPaymentModal({ children, onClose, couponId }: Props) {
  const router = useRouter();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState(true);

  const { data, isLoading } = useQuery({
    queryKey: ["client_secret", couponId],
    queryFn: async () => {
      const { data: cc } = await userApiClient.post("/order/payment", {
        couponId,
      });

      const cs = cc?.data;
      return cs;
    },
  });

  const handleConfirmPayment = async () => {
    try {
      setIsOpenDialog(false);
      await onClose("A");
    } catch (error) {
      toast.error(getClientErrorMsg(error));
    }
  };

  const handleSessionPayment = async () => {
    try {
      const { data: cc } = await userApiClient.post("/order/payment/session", {
        couponId,
      });

      const url = cc.data.session.url;
      await router.push(url);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  if (!data?.paymentMethod)
    return (
      <div
        onClick={() => {
          onClose("B");
          handleSessionPayment();
        }}
      >
        {children}
      </div>
    );

  if (isLoading) return <></>;

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[650px] overflow-y-auto">
        <DialogHeader>
          <div className="text-xl font-semibold">Betalingsmiddel</div>
        </DialogHeader>

        {data?.paymentMethod && paymentMethod ? (
          <div>
            <NewCardDetails data={data.paymentMethod} />
            <div className="pt-[20px]"></div>
            <Button
              className="w-full"
              onClick={handleConfirmPayment}
              intent="primary"
              type="button"
            >
              Bevestig betaling
            </Button>
            <div className="pt-[10px]"></div>

            <div
              onClick={handleSessionPayment}
              className="cursor-pointer text-center text-sm font-bold hover:underline"
            >
              Gebruik een andere betaalmethode
            </div>
          </div>
        ) : (
          <div>
            {/* <PaymentMethodForm
              onClose={async () => {
                setIsOpenDialog(false);
                await onClose();
              }}
              clientSecret={data?.client_secret}
            /> */}

            {data?.paymentMethod ? (
              <div
                onClick={() => setPaymentMethod(true)}
                className="cursor-pointer text-center text-sm font-bold hover:underline"
              >
                Gebruik de vorige betaalmethode
              </div>
            ) : (
              <div
                onClick={handleSessionPayment}
                className="cursor-pointer text-center text-sm font-bold hover:underline"
              >
                Gebruik een andere betaalmethode
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export const NewCardDetails = ({ data }: { data: PMDTYPE }) => {
  const isCard = data.type == "card";

  if (data.type == "card") {
    return (
      <div className="">
        <div className="flex gap-[30px] pt-3  sm:gap-[50px]">
          <div>
            <div className="text-sm font-medium text-[#676767]">
              Kaartnummer
            </div>
            <div className="font-semibold text-black">
              xxxx - xxxx - xxxxx -{" "}
              {isCard ? data.card.last4 : data.sepa_debit?.last4}
            </div>
            <div className="pt-[30px]"></div>
            <div className="text-sm font-medium text-[#676767]">
              Rekening Email
            </div>
            <div className="font-semibold  text-black">
              <div className="flex items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/imgs/mail.svg" alt="Mail icon" />
                <span className="max-w-[200px] truncate sm:max-w-full">
                  {data.billing_details.email || "Not found"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-[#676767]">Exp</div>
            <div className="font-semibold text-black">
              {data.card.exp_month}/{data.card.exp_year}
            </div>
            <div className="pt-[30px]"></div>

            <div className="text-sm font-medium text-[#676767]">Merk</div>
            <div className="font-semibold uppercase text-black">
              {data.card.brand}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="flex gap-[30px] pt-3  sm:gap-[50px]">
          <div>
            <div className="text-sm font-medium text-[#676767]">Bankcode</div>
            <div className="font-semibold text-black">
              {data.sepa_debit?.bank_code}
            </div>
            <div className="pt-[30px]"></div>
            <div className="text-sm font-medium text-[#676767]">
              Rekening Email
            </div>
            <div className="font-semibold  text-black">
              <div className="flex items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/imgs/mail.svg" alt="Mail icon" />
                <span className="max-w-[200px] truncate sm:max-w-full">
                  {data.billing_details.email || "Not found"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-[#676767]">Country</div>
            <div className="font-semibold text-black">
              {data.sepa_debit?.country}
            </div>
            <div className="pt-[30px]"></div>

            <div className="text-sm font-medium text-[#676767]">
              Last 4 digit
            </div>
            <div className="font-semibold uppercase text-black">
              {data.sepa_debit?.last4}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
// );

// function PaymentMethodForm({ clientSecret, onClose }: FormProps) {
//   const options: StripeElementsOptions = {
//     clientSecret: clientSecret,
//     appearance: {
//       theme: "stripe",
//       variables: {
//         borderRadius: "6px",
//         colorText: "#252C48",
//         colorTextPlaceholder: "#A0A4AB",
//         focusBoxShadow: "none",
//         focusOutline: "#7266FC",
//         colorPrimary: "#7266FC",
//         spacingGridRow: "20px",
//         spacingUnit: "5px",
//         fontSmooth: "always",
//         colorDanger: "#FF000D",
//         colorDangerText: "#FF000D",
//       },
//     },
//   };

//   return (
//     <>
//       {clientSecret ? (
//         <Elements stripe={stripePromise} options={options}>
//           <PaymentForm onClose={onClose} />
//         </Elements>
//       ) : (
//         <div className="mb-5 flex items-center gap-4">
//           <div className="size-6">
//             <Spinner />
//           </div>
//           <div className="text-lg">Bezig met laden...</div>
//         </div>
//       )}
//     </>
//   );
// }

// type PaymentFormProps = {
//   onClose: () => any;
// };

// function PaymentForm({ onClose }: PaymentFormProps) {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [isReady, setReady] = useState(false);

//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: any) => {
//     if (loading) return;
//     e.preventDefault();
//     try {
//       setLoading(true);
//       if (!stripe || !elements)
//         throw new Error("Streep of elementen niet gevonden");

//       const { error } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: `${window.location.origin}/account/billing`,
//         },

//         redirect: "if_required",
//       });

//       if (error) throw new Error(error.message);

//       await onClose();

//       // setLoading(false);
//     } catch (err: any) {
//       setLoading(false);
//       setErrorMsg(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement onReady={() => setReady(true)} />

//       <div className="pt-2 xl:pt-3"></div>
//       {errorMsg && <div className="text-sm text-red-500">{errorMsg}</div>}
//       <div className="pt-4"></div>
//       {isReady && (
//         <Button
//           className="w-full"
//           intent="primary"
//           type="submit"
//           disabled={loading}
//           loading={loading}
//         >
//           Bevestig betaling
//         </Button>
//       )}
//       <div className="pt-4"></div>
//     </form>
//   );
// }

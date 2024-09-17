import { userApiClient } from "@/api-clients/user-api-client";
import Button from "@/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import Spinner from "@/common/components/ui/spinner";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

type FormProps = {
  clientSecret?: string;
  onClose: () => any;
};

type Props = {
  children: ReactNode;
  type: "card" | "ideal";
  onClose: () => any;
};

export function PaymentMethodModal({ children, onClose, type }: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { data: clientSecret } = useQuery({
    queryKey: ["client_secret", type],
    queryFn: async () => {
      const { data: cc } = await userApiClient.post(
        "/plan/payment/intent?type=" + type,
        {},
        {
          headers: {
            authorization: getCookie("temp_auth"),
          },
        },
      );
      const cs = cc?.data.client_secret;
      return cs;
    },
  });

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=" overflow-y-auto max-w-[600px]">
        <DialogHeader>
          <div className="text-xl font-semibold">Payment Method</div>
        </DialogHeader>
        <PaymentMethodForm
          onClose={() => {
            setIsOpenDialog(false);
            onClose();
          }}
          clientSecret={clientSecret}
        />
      </DialogContent>
    </Dialog>
  );
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

function PaymentMethodForm({ clientSecret, onClose }: FormProps) {
  const options: StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        borderRadius: "6px",
        colorText: "#252C48",
        colorTextPlaceholder: "#A0A4AB",
        focusBoxShadow: "none",
        focusOutline: "#7266FC",
        colorPrimary: "#7266FC",
        spacingGridRow: "20px",
        spacingUnit: "5px",
        fontSmooth: "always",
        colorDanger: "#FF000D",
        colorDangerText: "#FF000D",
      },
    },
  };

  return (
    <>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm onClose={onClose} />
        </Elements>
      ) : (
        <div className="flex mb-5 items-center gap-4">
          <Spinner />
          <div className="text-lg">Bezig met laden...</div>
        </div>
      )}
    </>
  );
}

type PaymentFormProps = {
  onClose: () => any;
};

function PaymentForm({ onClose }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isReady, setReady] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    if (loading) return;
    e.preventDefault();
    try {
      setLoading(true);
      if (!stripe || !elements)
        throw new Error("Streep of elementen niet gevonden");

      const { error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/onboarding/payment`,
        },

        redirect: "if_required",
      });

      if (error) throw new Error(error.message);

      toast.success("Betaalmethode toegevoegd");

      onClose();

      // setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement onReady={() => setReady(true)} />

      <div className="pt-2 xl:pt-3"></div>
      {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}
      <div className="pt-4"></div>
      {isReady && (
        <Button
          className="w-full"
          intent="primary"
          type="submit"
          disabled={loading}
          loading={loading}
        >
          Bevestig de betalingsmethode
        </Button>
      )}
      <div className="pt-4"></div>
    </form>
  );
}

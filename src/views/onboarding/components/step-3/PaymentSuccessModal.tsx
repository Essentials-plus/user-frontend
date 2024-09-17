import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  header: string;
  description: string;
  loading?: boolean;
  onConfirm?: boolean;
  setOrderSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const btnStyle = "rounded-[6px] font-semibold font-primary";

function PaymentSuccessModal({
  children,
  header,
  description,
  onConfirm,
  setOrderSuccess,
}: Props) {
  const router = useRouter();

  return (
    <Dialog open={onConfirm} onOpenChange={setOrderSuccess}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="overflow-y-auto max-w-[480px]">
        <DialogHeader>
          <div className="text-xl font-semibold">{header}</div>
          <p
            dangerouslySetInnerHTML={{ __html: description }}
            className="font-medium leading-[19px] mt-[20px] mb-[20px] font-primary text-[#000000] text-[14px]"
          ></p>
          <div className="mb-[30px] flex justify-end gap-[20px] !mt-6">
            <button
              type="button"
              className={cn(
                "text-primary border border-primary p-[7px_40.23px]",
                btnStyle,
              )}
              onClick={() => {
                setOrderSuccess(false);
                router.push("/");
              }}
            >
              Annuleren
            </button>

            <button
              type="button"
              onClick={() => {
                setOrderSuccess(false);
                router.push("/weekly-menu");
              }}
              className={cn(
                "bg-app-darker-green p-[8px_16px] min-w-[120px]  text-white",
                btnStyle,
              )}
            >
              Bevestigen
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentSuccessModal;

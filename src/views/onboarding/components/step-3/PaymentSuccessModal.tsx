import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import routes from "@/config/routes";
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
      <DialogContent className="max-w-[480px] overflow-y-auto">
        <DialogHeader>
          <div className="text-xl font-semibold">{header}</div>
          <p
            dangerouslySetInnerHTML={{ __html: description }}
            className="my-[20px] text-[14px] font-medium leading-[19px] text-[#000000]"
          ></p>
          <div className="!mt-6 mb-[30px] flex justify-end gap-[20px]">
            <button
              type="button"
              className={cn(
                "text-primary max-sm:w-full border border-primary py-[7px] sm:px-10",
                btnStyle,
              )}
              onClick={() => {
                setOrderSuccess(false);
                router.push(routes.home);
              }}
            >
              Annuleren
            </button>

            <button
              type="button"
              onClick={() => {
                setOrderSuccess(false);
                router.push(routes.weeklyMenu);
              }}
              className={cn(
                "bg-app-darker-green max-sm:w-full py-[7px] sm:px-[26px] lg:min-w-[120px]  text-white",
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

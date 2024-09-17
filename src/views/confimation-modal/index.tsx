import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import Spinner from "@/common/components/ui/spinner";
import { cn } from "@/lib/utils";

import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  header: string;
  description: string;
  loading?: boolean;
  onConfirm?: (onClose: () => any) => any;
};

const btnStyle = "rounded-[6px] font-semibold font-primary";

function ConfirmationModal({
  children,
  header,
  description,
  onConfirm,
  loading,
}: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=" overflow-y-auto max-w-[480px]">
        <DialogHeader>
          <div className="text-xl font-semibold">{header}</div>
          <p className="font-medium leading-[19px] mt-[20px] mb-[33px] font-primary text-[#000000]">
            {description}
          </p>
          <div className="mb-[30px] flex justify-end gap-[20px] !mt-6">
            <button
              type="button"
              className={cn(
                "text-primary border border-primary p-[7px_40.23px]",
                btnStyle,
              )}
              onClick={() => {
                setIsOpenDialog(false);
              }}
            >
              Annuleren
            </button>

            <button
              type="button"
              onClick={() => onConfirm?.(() => setIsOpenDialog(false))}
              className={cn(
                "bg-app-darker-green p-[8px_16px] min-w-[120px]  text-white",
                btnStyle,
              )}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner className="w-6 h-6" />
                  Bezig met laden...
                </div>
              ) : (
                "Bevestigen"
              )}
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationModal;

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
  // eslint-disable-next-line no-unused-vars
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
      <DialogContent className=" max-w-[480px] overflow-y-auto">
        <DialogHeader>
          <div className="text-xl font-semibold">{header}</div>
          <p className="mb-[33px] mt-[20px] font-medium leading-[19px] text-[#000000]">
            {description}
          </p>
          <div className="!mt-6 mb-[30px] flex justify-end gap-[20px]">
            <button
              type="button"
              className={cn(
                "text-primary border border-primary max-sm:w-full py-2 sm:px-10",
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
                "bg-app-darker-green py-2 px-4 max-sm:w-full sm:min-w-[120px]  text-white",
                btnStyle,
              )}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner className="size-6" />
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

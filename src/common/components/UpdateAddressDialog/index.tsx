import { getUserQueryOptions } from "@/api-clients/user-api-client/queries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import useOpenUpdateAddressDialog from "@/hooks/useOpenUpdateAddressDialog";
import ProfileUpdate from "@/views/account-information/ProfileUpdate";
import { useQuery } from "@tanstack/react-query";

const UpdateAddressDialog = () => {
  const { data } = useQuery(getUserQueryOptions());

  const { openUpdateAddressDialog, setOpenUpdateAddressDialog } =
    useOpenUpdateAddressDialog();
  return (
    <Dialog
      open={openUpdateAddressDialog}
      onOpenChange={setOpenUpdateAddressDialog}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Profiel bijwerken</DialogTitle>
        </DialogHeader>
        <ProfileUpdate
          data={data?.data}
          onClose={() => setOpenUpdateAddressDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAddressDialog;

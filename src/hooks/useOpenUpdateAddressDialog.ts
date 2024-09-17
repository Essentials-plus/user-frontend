import { atom, useAtom } from "jotai";

const openUpdateAddressDialogAtom = atom(false);

const useOpenUpdateAddressDialog = () => {
  const [openUpdateAddressDialog, setOpenUpdateAddressDialog] = useAtom(
    openUpdateAddressDialogAtom,
  );

  return { openUpdateAddressDialog, setOpenUpdateAddressDialog };
};

export default useOpenUpdateAddressDialog;

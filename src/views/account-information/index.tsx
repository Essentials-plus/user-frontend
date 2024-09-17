import SettingsPageLayout from "@/common/components/settings-page-layout";
import { useState } from "react";

import { getUserQueryOptions } from "@/api-clients/user-api-client/queries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import Spinner from "@/common/components/ui/spinner";
import useOpenUpdateAddressDialog from "@/hooks/useOpenUpdateAddressDialog";
import ChangePassword from "@/views/account-information/ChangePassword";
import { useQuery } from "@tanstack/react-query";

const AccountInformation = () => {
  const { data, isLoading } = useQuery(getUserQueryOptions());

  const [openUpdatePasswordModal, setIsOpenUpdatePasswordModal] =
    useState<boolean>(false);
  const { setOpenUpdateAddressDialog } = useOpenUpdateAddressDialog();
  return (
    <>
      <SettingsPageLayout title="Account informatie">
        {isLoading || !data ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="h-6 w-6">
              <Spinner />
            </div>
            Bezig met laden...
          </div>
        ) : (
          <>
            <div className="rounded-3xl border-2 border-app-dark-grey px-10 py-8 bg-app-grey">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-semibold text-app-black">
                  Persoonlijke gegevens
                </h2>

                <button
                  onClick={() => setOpenUpdateAddressDialog(true)}
                  className="text-app-dark-green underline"
                >
                  Profiel bijwerken
                </button>
              </div>
              <div className="mt-6 max-w-[618px] flex justify-between">
                <div>
                  <div>
                    <h4 className="text-xl font-bold">{data.data.name}</h4>
                    <p>E-mail: {data.data.email}</p>
                  </div>
                  <div className="mt-7">
                    <h4 className="text-xl font-bold">Adresgegevens</h4>
                    <p>Adres: {data.data.address || "- - -"}</p>
                    <p>Postcode: {data.data.zipCode?.zipCode || "- - -"}</p>
                    <p>Stad: {data.data.city || "- - -"}</p>
                    <p>Huisnummer: {data.data.nr || "- - -"}</p>
                    <p>Toevoeging: {data.data.addition || "- - -"}</p>
                  </div>
                </div>

                {/* <div>
                  <h4 className="text-xl font-bold">Avatar</h4>
                  <div className="mt-5 rounded-full overflow-hidden border border-black">
                    <Image
                      src={
                        data.data.profile ||
                        "https://modernize-angular-main.netlify.app/assets/images/profile/user-1.jpg"
                      }
                      alt="avatar"
                      width={266}
                      height={266}
                      className="w-[133px] h-[133px]"
                    />
                  </div>
                </div> */}
              </div>
            </div>

            <div className="mt-16 rounded-3xl border-2 border-app-dark-grey px-10 py-8 bg-app-grey">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-semibold text-app-black">
                  Wachtwoord
                </h2>

                <button
                  onClick={() => setIsOpenUpdatePasswordModal(true)}
                  className="text-app-dark-green underline"
                >
                  Wachtwoord verandering
                </button>
              </div>

              <div className="mt-5">
                <h4 className="text-xl font-bold">Huidige wachtwoord</h4>
                <p>**********</p>
              </div>
            </div>
          </>
        )}
      </SettingsPageLayout>
      <Dialog
        open={openUpdatePasswordModal}
        onOpenChange={() => setIsOpenUpdatePasswordModal(false)}
      >
        <DialogContent className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Verander wachtwoord</DialogTitle>
          </DialogHeader>
          <ChangePassword onClose={() => setIsOpenUpdatePasswordModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountInformation;

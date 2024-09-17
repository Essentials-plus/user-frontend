import Button from "@/common/components/ui/button";
import { Dialog, DialogContent } from "@/common/components/ui/dialog";
import Input from "@/common/components/ui/input";
import useSubscribeToNewsletter from "@/hooks/useSubscribeToNewsletter";
import Image from "next/image";
import { ComponentProps } from "react";

const RegionNotAvailableDialog = (props: ComponentProps<typeof Dialog>) => {
  const {
    email,
    handleEmailChange,
    handleFormSubmit,
    subscribeToNewsletterMutation,
    validationError,
  } = useSubscribeToNewsletter({
    mutationOptions: {
      onSuccess() {
        props.onOpenChange && props.onOpenChange(false);
      },
    },
  });

  return (
    <Dialog {...props}>
      <DialogContent className="max-md:max-w-[95vw] max-w-[750px] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[45%,auto]">
          <div>
            <Image
              src={"/meals/breakfast/01002.jpg"}
              alt="Dialog Image"
              width={1400}
              height={570}
              className="h-[250px] md:h-full object-cover"
            />
          </div>

          <div className="p-5 md:px-7 md:py-8">
            <div className="text-slate-700">
              <h3 className="font-bold text-2xl md:text-3xl text-slate-900">
                Het spijt ons!
              </h3>
              <div className="space-y-2 mt-4">
                <p>
                  Momenteel breiden wij onze regio&apos;s uit, zodat wij u ook
                  van dienst kunnen zijn.
                </p>
                <p>
                  Vanaf vandaag is de door u gekozen regio niet beschikbaar voor
                  bezorging.
                </p>
                <p>
                  Houd zeker onze socials en website in de gaten voor eventuele
                  updates.
                </p>
              </div>

              <div className="mt-8">
                <p>
                  Schrijf u in op onze nieuwsbrief om op de hoogte te blijven
                  van de laatste updates.
                </p>

                <div>
                  <form className="mt-5 space-y-3" onSubmit={handleFormSubmit}>
                    <div>
                      <Input
                        value={email}
                        onChange={handleEmailChange}
                        bordered
                        placeholder="E-mail"
                      />
                      {validationError && (
                        <p className="text-sm text-red-500 mt-1.5">
                          {validationError}
                        </p>
                      )}
                    </div>

                    <Button loading={subscribeToNewsletterMutation.isPending}>
                      Abonneren
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegionNotAvailableDialog;

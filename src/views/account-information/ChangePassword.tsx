import { userApiClient } from "@/api-clients/user-api-client";
import PasswordStrengthBar from "@/common/components/password-strength-bar";
import Button from "@/common/components/ui/button";
import PasswordInput from "@/common/components/ui/password-input";
import { strongPasswordSchema } from "@/constants/zod";
import { getClientErrorMsg } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Wachtwoord moet minstens 8 tekens lang zijn"),
    newPassword: strongPasswordSchema,
    confirmPassword: z
      .string()
      .min(8, "Wachtwoord moet minstens 8 tekens lang zijn"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Wachtwoorden komen niet overeen",
    path: ["confirmPassword"],
  });

type PasswordFormType = z.infer<typeof passwordSchema>;

type Props = {
  onClose: () => any;
};

const ChangePassword = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PasswordFormType>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit: SubmitHandler<PasswordFormType> = async (d) => {
    if (isSubmitting) return;

    try {
      await userApiClient.patch("/user/password", d);

      toast.success("Password changed successfully");

      onClose();
    } catch (error) {
      toast.error(getClientErrorMsg(error));
    }
  };

  const newPasswordValue = watch("newPassword");
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div>
          <PasswordInput
            label="Huidig ​​wachtwoord:"
            bordered
            {...register("currentPassword")}
            error={errors.currentPassword?.message?.toString()}
          />
        </div>
        <div>
          <PasswordInput
            label="Nieuw wachtwoord:"
            bordered
            {...register("newPassword")}
            error={errors.newPassword?.message?.toString()}
          />
          {!!newPasswordValue && (
            <div className="mt-2.5">
              <PasswordStrengthBar password={newPasswordValue} />
            </div>
          )}
        </div>
        <div>
          <PasswordInput
            label="Bevestigen ​​wachtwoord:"
            bordered
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message?.toString()}
          />
        </div>

        <div className="w-full !mt-6">
          <Button
            className="w-full"
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Vernieuw wachtwoord
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;

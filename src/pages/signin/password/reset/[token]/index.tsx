import publicApiClient from "@/api-clients/public-api-client";
import PasswordStrengthBar from "@/common/components/password-strength-bar";
import Button from "@/common/components/ui/button";
import PasswordInput from "@/common/components/ui/password-input";
import { strongPasswordSchema } from "@/constants/zod";
import { getClientErrorMsg } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const passwordSchema = z
  .object({
    password: strongPasswordSchema,
    confirmPassword: z.string().min(8, "Password must be 8 char"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormType = z.infer<typeof passwordSchema>;

const ChangePassword = ({ token }: { token: string }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormType>({
    resolver: zodResolver(passwordSchema),
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<PasswordFormType> = async (d) => {
    if (isSubmitting) return;

    try {
      await publicApiClient.post("/auth/user/password/reset", {
        token,
        ...d,
      });

      toast.success("Password reset successfully");

      await router.push("/log-in");
    } catch (error) {
      toast.error(getClientErrorMsg(error));
    }
  };

  return (
    <div className="h-[500px] flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[380px]">
        <div>
          <PasswordInput
            label="Nieuw ​​wachtwoord:"
            bordered
            {...register("password")}
            error={errors.password?.message?.toString()}
          />
          {!!password && (
            <div className="mt-2.5">
              <PasswordStrengthBar password={password} />
            </div>
          )}
        </div>
        <div className="mt-4"></div>
        <PasswordInput
          label="Bevestigen ​​wachtwoord:"
          bordered
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message?.toString()}
        />

        <div className="w-full mt-6">
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
    </div>
  );
};

export default ChangePassword;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const token = query.token;

    if (!token) throw new Error();

    return {
      props: {
        token: token,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/log-in",
        permanent: false,
      },
    };
  }
};

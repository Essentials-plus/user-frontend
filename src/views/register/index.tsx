import publicApiClient from "@/api-clients/public-api-client";
import FormWrapper from "@/common/components/form-wrapper";
import PasswordStrengthBar from "@/common/components/password-strength-bar";
import Button from "@/common/components/ui/button";
import Input from "@/common/components/ui/input";
import routes from "@/config/routes";
import { redirectUriQueryKey } from "@/constants";
import { strongPasswordSchema } from "@/constants/zod";
import { getClientErrorMsg } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "Voer uw voornaam in"),
  surname: z.string().min(1, "Voer uw achternaam in"),
  email: z
    .string({
      message: "Voer uw e-mailadres in",
    })
    .email("Ongeldig e-mailadres"),
  password: strongPasswordSchema,
});

export type SignupFormType = z.infer<typeof signupSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  const redirectUriValue = router.query[redirectUriQueryKey] as string;

  const onSubmit: SubmitHandler<SignupFormType> = async (d) => {
    if (isSubmitting) return;
    try {
      await publicApiClient.post("/auth/user/signup", {
        ...d,
        redirect: redirectUriValue,
      });

      toast.success("Bevestig alstublieft uw e-mail!");

      await router.push(routes.logIn);
    } catch (err: any) {
      toast.error(getClientErrorMsg(err));
    }
  };

  const password = watch("password");
  return (
    <section className="mb-[100px] mt-20">
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="__h1 font-medium">Registreren</h1>
          <div className="mt-8 grid grid-cols-[auto,250px] gap-x-5">
            <div className="grid grid-cols-2 gap-x-5 gap-y-6">
              <Input
                label="Voornaam:"
                bordered
                {...register("name")}
                error={errors.name?.message?.toString()}
              />
              <Input
                label="Achternaam:"
                bordered
                {...register("surname")}
                error={errors.surname?.message?.toString()}
              />

              <Input
                label="Email:"
                bordered
                {...register("email")}
                error={errors.email?.message?.toString()}
              />
              <div>
                <Input
                  type="password"
                  label="Wachtwoord:"
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
            </div>
            <div className="flex items-end">
              <Button loading={isSubmitting} type="submit" className="w-full">
                Registreren
              </Button>
            </div>
          </div>
        </form>
      </FormWrapper>
    </section>
  );
};

export default Register;

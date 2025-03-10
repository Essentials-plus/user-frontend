import publicApiClient from "@/api-clients/public-api-client";
import Button from "@/common/components/ui/button";
import Input from "@/common/components/ui/input";
import routes from "@/config/routes";
import { getClientErrorMsg } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email vereist").email(),
});

type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

const LostPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<ForgotPasswordType> = async (d) => {
    if (isSubmitting) return;
    try {
      await publicApiClient.post("/auth/user/password/forgot", d);
      toast.success("Verzoek om wachtwoord opnieuw in te stellen verzonden");
      await router.push(routes.logIn);
    } catch (err) {
      toast.error(getClientErrorMsg(err));
    }
  };

  return (
    <section className="mb-[167px] mt-[99px]">
      <div className="container">
        <div className="grid grid-cols-[500px,auto] items-center gap-x-[120px]">
          <div className="rounded-r-[80px] bg-app-yellow px-20 py-[56px]">
            <h2 className="__h2 text-center">Wachtwoord vergeten?</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              <div className="space-y-5">
                <Input
                  placeholder="E-mail"
                  {...register("email")}
                  error={errors.email?.message?.toString()}
                />

                <Button loading={isSubmitting} className="w-full">
                  Stuur
                </Button>
                <div className="flex items-center gap-x-3">
                  <div className="h-px w-full bg-black"></div>
                  <Link href={routes.logIn}>
                    <span>Terug</span>
                  </Link>
                  <div className="h-px w-full bg-black"></div>
                </div>
              </div>
            </form>
          </div>

          <Image
            src={"/imgs/lost-password/lost-password-image.png"}
            alt="lost-password-image"
            width={1680}
            height={886}
            className="size-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default LostPassword;

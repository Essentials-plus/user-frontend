import publicApiClient from "@/api-clients/public-api-client";
import Button from "@/common/components/ui/button";
import Input from "@/common/components/ui/input";
import PasswordInput from "@/common/components/ui/password-input";
import { useUserSession } from "@/hooks/useUserSession";
import { getClientErrorMsg } from "@/lib/utils";
import { User } from "@/types/api-responses/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaApple, FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(1, "Email required"),
  password: z.string().min(8, "Wachtwoord moet 8 tekens zijn"),
});

type LoginFormType = z.infer<typeof formSchema>;

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const { login } = useUserSession();

  const [remember, setRemember] = useState(false);

  const onSubmit: SubmitHandler<LoginFormType> = async (d) => {
    if (isSubmitting) return;

    try {
      const { data } = await publicApiClient.post("/auth/user/login", d);

      const token: string = data.data;

      const user: User = data.user;

      const status = user.status;

      if (status != "active") {
        toast.error("Je bent geblokkeerd door autoriteit");
        return;
      }

      // if (
      //   !user.age ||
      //   !user.gender ||
      //   !user.zipCode ||
      //   !user.goal ||
      //   !user.height
      // ) {
      //   setCookie("temp_auth", token);
      //   toast.error("U heeft de gebruiker nog niet bijgewerkt");
      //   await router.push("/onboarding/credentials");
      //   return;
      // }

      // if (!user.plan) {
      //   setCookie("temp_auth", token);
      //   toast.error("Je hebt het menu nog niet geselecteerd");
      //   await router.push("/onboarding/menu");
      //   return;
      // }

      // if (user.plan && user.plan.status == "pending") {
      //   setCookie("temp_auth", token);
      //   toast.error("U heeft de betaling nog niet bevestigd");
      //   await router.push(`/onboarding/payment`);
      //   return;
      // }

      deleteCookie("temp_auth");

      login(
        token,
        {
          id: user.id,
          name: user.name,
          email: user.email,
          profile: user.profile,
          access: user.access,
        },
        remember
      );

      await router.push("/");
    } catch (error) {
      toast.error(getClientErrorMsg(error));
    }
  };

  return (
    <section className="mt-[99px] mb-[168px]">
      <div className="container">
        <div className="grid grid-cols-[520px,auto] gap-x-[120px]">
          <div className="py-[56px] px-20 rounded-r-[80px] bg-app-yellow">
            <h2 className="__h2 text-center">Inloggen</h2>
            <div className="mt-6">
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  placeholder="E-mail"
                  {...register("email")}
                  error={errors.email?.message?.toString()}
                />
                <PasswordInput
                  {...register("password")}
                  error={errors.password?.message?.toString()}
                />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-x-4">
                      <input
                        type="checkbox"
                        id="__forgotPass"
                        className="w-4 h-4 accent-app-dark-green"
                        checked={remember}
                        onChange={() => {
                          setRemember((s) => !s);
                        }}
                      />
                      <label htmlFor="__forgotPass">Ingelogd blijven</label>
                    </div>
                  </div>
                  <Link
                    href="/lost-password"
                    className="text-sm text-app-dark-green"
                  >
                    Wachtwoord vergeten?
                  </Link>
                </div>

                <Button
                  loading={isSubmitting}
                  type="submit"
                  className="text-base w-full"
                >
                  Inloggen
                </Button>
                <div className="flex items-center gap-x-3">
                  <div className="h-px w-full bg-black"></div>
                  <span>of</span>
                  <div className="h-px w-full bg-black"></div>
                </div>
              </form>
              <div className="mt-6">
                <div className="space-y-5">
                  <button className="h-11 w-full bg-[#1A73E8] rounded-lg text-center __c_all relative">
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 h-[80%] aspect-square rounded-l-md __c_all bg-white text-xl">
                      <FcGoogle />
                    </div>
                    <p className="text-white">Inloggen met Google</p>
                  </button>
                  <button className="h-11 w-full bg-black rounded-lg text-center __c_all relative">
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 h-[80%] aspect-square rounded-l-md __c_all bg-white text-xl">
                      <FaApple />
                    </div>
                    <p className="text-white">Inloggen met Apple</p>
                  </button>
                  <button className="h-11 w-full bg-[#1A73E8] rounded-lg text-center __c_all relative">
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 h-[80%] aspect-square rounded-l-md __c_all bg-white text-xl">
                      <FaFacebookF />
                    </div>
                    <p className="text-white">Inloggen met Facebook</p>
                  </button>
                  <div className="flex items-center justify-between">
                    <p>Nog niet geregistreerd?</p>
                    <Link
                      href="/register"
                      className="text-sm text-app-dark-green"
                    >
                      Registreren
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Image
            src={"/imgs/log-in-page-img.png"}
            alt="log-in-page-img"
            width={1022}
            height={1265}
          />
        </div>
      </div>
    </section>
  );
};

export default LogIn;

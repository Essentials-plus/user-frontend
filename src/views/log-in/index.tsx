import { updateGuestEmailMutationOptions } from "@/api-clients/guest-api-client/mutations";
import publicApiClient from "@/api-clients/public-api-client";
import Button from "@/common/components/ui/button";
import Input from "@/common/components/ui/input";
import PasswordInput from "@/common/components/ui/password-input";
import routes from "@/config/routes";
import {
  guestLoginQueryKey,
  redirectUriQueryKey,
  tempAuthTokenCookieName,
} from "@/constants";
import useCartData from "@/hooks/useCartData";
import { useUserSession } from "@/hooks/useUserSession";
import { cn, getClientErrorMsg } from "@/lib/utils";
import { User } from "@/types/api-responses/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegUserCircle } from "react-icons/fa";
import { FaApple, FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(1, "E-mail is vereist"),
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
    // values: {
    //   email: "say111mon@gmail.com",
    //   password: "Say111mon@gmail.com",
    // },
  });

  const router = useRouter();

  const { login, guestUserId, deleteGuestUserId } = useUserSession();

  const hasGuestLogin =
    router.query[guestLoginQueryKey] === "true" ||
    z.string().email().safeParse(guestUserId).success;

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
      //   setCookie(tempAuthTokenCookieName, token);
      //   toast.error("U heeft de gebruiker nog niet bijgewerkt");
      //   await router.push(routes.onboarding("credentials"));
      //   return;
      // }

      // if (!user.plan) {
      //   setCookie(tempAuthTokenCookieName, token);
      //   toast.error("Je hebt het menu nog niet geselecteerd");
      //   await router.push(routes.onboarding("menu"));
      //   return;
      // }

      // if (user.plan && user.plan.status == "pending") {
      //   setCookie(tempAuthTokenCookieName, token);
      //   toast.error("U heeft de betaling nog niet bevestigd");
      //   await router.push(routes.onboarding(`payment`));
      //   return;
      // }

      deleteCookie(tempAuthTokenCookieName);
      deleteGuestUserId();

      login(
        token,
        {
          id: user.id,
          name: user.name,
          email: user.email,
          profile: user.profile,
          access: user.access,
        },
        remember,
      );

      const redirectUriValue = router.query[redirectUriQueryKey] as string;

      if (redirectUriValue) {
        const url = new URL(window.location.href);
        url.searchParams.delete(redirectUriQueryKey);
        url.pathname = redirectUriValue;
        router.push(url);
        return;
      } else if (router.query[guestLoginQueryKey] === "true") {
        await router.push(routes.checkout);
        return;
      } else {
        await router.push(routes.home);
        return;
      }
    } catch (error) {
      toast.error(getClientErrorMsg(error));
    }
  };

  return (
    <section className="my-8 lg:mb-[168px] lg:mt-[99px]">
      <div className="container">
        {hasGuestLogin && (
          <h1 className="mb-5 flex items-center gap-2 text-2xl font-extrabold uppercase lg:text-[34px]/[48px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="none"
              className="w-7 shrink-0 lg:w-8"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.225 3C12.4496 3 9.4 6.04957 9.4 9.825V14.05H7.125C6.23037 14.05 5.5 14.7804 5.5 15.675V27.375C5.5 28.2696 6.23037 29 7.125 29H25.325C26.2196 29 26.95 28.2696 26.95 27.375V15.675C26.95 14.7804 26.2196 14.05 25.325 14.05H23.05V9.825C23.05 6.04957 20.0004 3 16.225 3ZM16.225 3.65C19.6516 3.65 22.4 6.39843 22.4 9.825V14.05H10.05V9.825C10.05 6.39843 12.7984 3.65 16.225 3.65ZM26.3 15.675C26.3 15.1292 25.8708 14.7 25.325 14.7H7.125C6.57923 14.7 6.15 15.1292 6.15 15.675V27.375C6.15 27.9208 6.57923 28.35 7.125 28.35H25.325C25.8708 28.35 26.3 27.9208 26.3 27.375V15.675Z"
                fill="black"
              />
              <path
                d="M9.4 14.05V14.45H9.8V14.05H9.4ZM23.05 14.05H22.65V14.45H23.05V14.05ZM22.4 14.05V14.45H22.8V14.05H22.4ZM10.05 14.05H9.65V14.45H10.05V14.05ZM9.8 9.825C9.8 6.27049 12.6705 3.4 16.225 3.4V2.6C12.2287 2.6 9 5.82866 9 9.825H9.8ZM9.8 14.05V9.825H9V14.05H9.8ZM7.125 14.45H9.4V13.65H7.125V14.45ZM5.9 15.675C5.9 15.0013 6.45129 14.45 7.125 14.45V13.65C6.00946 13.65 5.1 14.5595 5.1 15.675H5.9ZM5.9 27.375V15.675H5.1V27.375H5.9ZM7.125 28.6C6.45129 28.6 5.9 28.0487 5.9 27.375H5.1C5.1 28.4906 6.00946 29.4 7.125 29.4V28.6ZM25.325 28.6H7.125V29.4H25.325V28.6ZM26.55 27.375C26.55 28.0487 25.9987 28.6 25.325 28.6V29.4C26.4405 29.4 27.35 28.4906 27.35 27.375H26.55ZM26.55 15.675V27.375H27.35V15.675H26.55ZM25.325 14.45C25.9987 14.45 26.55 15.0013 26.55 15.675H27.35C27.35 14.5595 26.4405 13.65 25.325 13.65V14.45ZM23.05 14.45H25.325V13.65H23.05V14.45ZM22.65 9.825V14.05H23.45V9.825H22.65ZM16.225 3.4C19.7795 3.4 22.65 6.27049 22.65 9.825H23.45C23.45 5.82866 20.2213 2.6 16.225 2.6V3.4ZM22.8 9.825C22.8 6.17751 19.8725 3.25 16.225 3.25V4.05C19.4307 4.05 22 6.61934 22 9.825H22.8ZM22.8 14.05V9.825H22V14.05H22.8ZM10.05 14.45H22.4V13.65H10.05V14.45ZM9.65 9.825V14.05H10.45V9.825H9.65ZM16.225 3.25C12.5775 3.25 9.65 6.17751 9.65 9.825H10.45C10.45 6.61934 13.0193 4.05 16.225 4.05V3.25ZM25.325 15.1C25.6499 15.1 25.9 15.3502 25.9 15.675H26.7C26.7 14.9083 26.0917 14.3 25.325 14.3V15.1ZM7.125 15.1H25.325V14.3H7.125V15.1ZM6.55 15.675C6.55 15.3502 6.80014 15.1 7.125 15.1V14.3C6.35831 14.3 5.75 14.9083 5.75 15.675H6.55ZM6.55 27.375V15.675H5.75V27.375H6.55ZM7.125 27.95C6.80014 27.95 6.55 27.6999 6.55 27.375H5.75C5.75 28.1417 6.35831 28.75 7.125 28.75V27.95ZM25.325 27.95H7.125V28.75H25.325V27.95ZM25.9 27.375C25.9 27.6999 25.6499 27.95 25.325 27.95V28.75C26.0917 28.75 26.7 28.1417 26.7 27.375H25.9ZM25.9 15.675V27.375H26.7V15.675H25.9Z"
                fill="black"
              />
              <circle
                cx={16}
                cy="21.5"
                r="2.5"
                stroke="black"
                strokeWidth="1.5"
              />
            </svg>
            Veilig afrekenen
          </h1>
        )}
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-[520px,auto] gap-x-[120px] gap-8",
            hasGuestLogin && "lg:grid-cols-2 gap-x-16",
          )}
        >
          <div>
            <div
              className={cn(
                "lg:py-[56px] p-6 rounded-3xl lg:px-20 lg:rounded-r-[80px] bg-app-yellow",
                hasGuestLogin &&
                  "!rounded bg-white border border-[#d8d8d8] lg:px-10 lg:py-7",
              )}
            >
              <h2
                className={cn(
                  hasGuestLogin && "text-xl lg:text-3xl",
                  "text-left uppercase text-xl lg:text-2xl font-extrabold",
                )}
              >
                Inloggen
              </h2>
              <div className="mt-5 lg:mt-6">
                <form
                  className="space-y-4 lg:space-y-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    label="E-mailadres"
                    className="bg-[#F1F1F1]"
                    {...register("email")}
                    error={errors.email?.message?.toString()}
                  />
                  <div>
                    <PasswordInput
                      {...register("password")}
                      error={errors.password?.message?.toString()}
                      label="Wachtwoord"
                      className="bg-[#F1F1F1]"
                    />
                  </div>

                  <div className="flex gap-x-5 gap-y-3 max-md:!mt-1.5 max-md:flex-col-reverse md:items-center md:justify-between">
                    <div>
                      <div className="flex w-fit select-none items-center gap-x-1.5">
                        <input
                          type="checkbox"
                          id="__forgotPass"
                          className="size-4 cursor-pointer accent-app-dark-green"
                          checked={remember}
                          onChange={() => {
                            setRemember((s) => !s);
                          }}
                        />
                        <label
                          htmlFor="__forgotPass"
                          className="cursor-pointer"
                        >
                          Ingelogd blijven
                        </label>
                      </div>
                    </div>
                    <div className="max-md:flex max-md:justify-end">
                      <Link
                        href={routes.lostPassword}
                        className="text-sm text-app-dark-green"
                      >
                        Wachtwoord vergeten?
                      </Link>
                    </div>
                  </div>

                  <Button
                    loading={isSubmitting}
                    type="submit"
                    className="w-full text-base"
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
                  <div className="space-y-3 lg:space-y-5">
                    <button className="__c_all relative h-11 w-full rounded-lg bg-[#1A73E8] text-center">
                      <div className="__c_all absolute left-1 top-1/2 aspect-square h-4/5 -translate-y-1/2 rounded-l-md bg-white text-xl">
                        <FcGoogle />
                      </div>
                      <p className="text-white">Inloggen met Google</p>
                    </button>
                    <button className="__c_all relative h-11 w-full rounded-lg bg-black text-center">
                      <div className="__c_all absolute left-1 top-1/2 aspect-square h-4/5 -translate-y-1/2 rounded-l-md bg-white text-xl">
                        <FaApple />
                      </div>
                      <p className="text-white">Inloggen met Apple</p>
                    </button>
                    <button className="__c_all relative h-11 w-full rounded-lg bg-[#1A73E8] text-center">
                      <div className="__c_all absolute left-1 top-1/2 aspect-square h-4/5 -translate-y-1/2 rounded-l-md bg-white text-xl">
                        <FaFacebookF />
                      </div>
                      <p className="text-white">Inloggen met Facebook</p>
                    </button>
                    <div className="flex items-center justify-between max-lg:!mt-5">
                      <p>Nog niet geregistreerd?</p>
                      <Link
                        href={routes.register}
                        className="text-sm text-app-dark-green"
                      >
                        Registreren
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {hasGuestLogin ? (
            <GuestCheckoutLoginForm hasGuestLogin={hasGuestLogin} />
          ) : (
            <Image
              src={"/imgs/log-in-page-img.png"}
              alt="log-in-page-img"
              width={1022}
              className="max-lg:hidden"
              height={1265}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default LogIn;

const guestCheckoutFormSchema = z.object({
  email: z.string().min(1, "E-mail is vereist"),
});
type GuestCheckoutFormType = z.infer<typeof guestCheckoutFormSchema>;

const GuestCheckoutLoginForm = ({
  hasGuestLogin,
}: {
  hasGuestLogin?: boolean;
}) => {
  const { productCart, refetch } = useCartData();

  const router = useRouter();
  const { guestUserId, deleteGuestUserId, refetchGuestUserId } =
    useUserSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestCheckoutFormType>({
    resolver: zodResolver(guestCheckoutFormSchema),
    values: {
      email: "",
    },
  });

  const updateGuestEmailMutation = useMutation({
    ...updateGuestEmailMutationOptions(),
    onSuccess() {
      router.push(routes.checkout).then(() => {
        setTimeout(() => {
          refetchGuestUserId();
        }, 500);
      });
    },
  });

  const onSubmit: SubmitHandler<GuestCheckoutFormType> = async (d) => {
    if (guestUserId) {
      updateGuestEmailMutation.mutate({
        email: d.email,
        guestId: guestUserId,
      });
    } else {
      router.push({
        pathname: routes.logIn,
        query: {
          [guestLoginQueryKey]: true,
        },
      });
    }
  };

  const isGuestUserIdEmail = z.string().email().safeParse(guestUserId).success;

  return (
    <div>
      <div
        className={cn(
          "py-[56px] px-20 rounded-r-[80px] bg-app-yellow",
          hasGuestLogin &&
            "rounded bg-white border border-[#d8d8d8] p-6 lg:px-10 lg:py-7",
        )}
      >
        <h2
          className={cn(
            hasGuestLogin && "text-xl lg:text-3xl",
            "text-left uppercase text-xl lg:text-2xl font-extrabold",
          )}
        >
          {isGuestUserIdEmail
            ? "U bent momenteel ingelogd als gastgebruiker"
            : "Nieuw bij EssentialsPlus?"}
        </h2>
        <div className="mt-6">
          {isGuestUserIdEmail ? (
            <div className="sm:flex grid grid-cols-[16px,auto] max-sm:gap-x-2 items-center gap-3 rounded-lg border border-app-black/15 bg-app-black/5 p-3">
              <FaRegUserCircle className="size-4 lg:size-6 shrink-0" />
              <div className="text-app-black">{guestUserId}</div>

              <button
                onClick={() => {
                  if (productCart.length > 0) {
                    if (
                      confirm(
                        "U bent momenteel ingelogd als gastgebruiker en hebt producten in uw winkelwagen. Als u uitlogt, worden uw winkelwagenproducten ook verwijderd. Weet u zeker dat u wilt doorgaan?",
                      )
                    ) {
                      deleteGuestUserId();
                      refetchGuestUserId();
                      refetch();
                    }
                  } else {
                    deleteGuestUserId();
                    refetchGuestUserId();
                    refetch();
                  }
                }}
                className="sm:ml-auto max-sm:col-span-2 rounded-md bg-app-danger px-3 py-1.5 text-sm font-semibold text-white duration-200 hover:opacity-80"
              >
                Uitloggen
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="E-mailadres"
                className="bg-[#F1F1F1]"
                {...register("email")}
                error={errors.email?.message?.toString()}
              />

              <Button
                loading={updateGuestEmailMutation.isPending}
                type="submit"
                className="w-full text-base"
              >
                Afrekenen als gast
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

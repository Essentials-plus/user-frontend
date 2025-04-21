import { getAddressByZipcodeQueryOptions } from "@/api-clients/public-api-client/queries";
import { getCreateProductPaymentSessionLinkMutationOptions } from "@/api-clients/user-api-client/mutations";
import { getUserQueryOptions } from "@/api-clients/user-api-client/queries";
import Button from "@/common/components/ui/button";
import { Checkbox } from "@/common/components/ui/checkbox";
import Input from "@/common/components/ui/input";
import Select from "@/common/components/ui/select";
import Spinner from "@/common/components/ui/spinner";
import routes from "@/config/routes";
import { guestLoginQueryKey } from "@/constants";
import useActiveCurrency from "@/hooks/useActiveCurrency";
import useCartData from "@/hooks/useCartData";
import { useUserSession } from "@/hooks/useUserSession";
import { getApiErrorMessage } from "@/lib/utils";
import { CartOverViewCard } from "@/views/cart/components/cart-items-section";
import ProductCartItem from "@/views/cart/components/cart-items-section/product-cart-item";
import useAppliedCoupon from "@/views/cart/hooks/useAppliedCoupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedValue } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CheckoutPage = () => {
  const { cartOverview, productCart, isLoading } = useCartData();
  const router = useRouter();
  const { currency_symbol } = useActiveCurrency();

  useEffect(() => {
    if (productCart.length <= 0 && !isLoading) {
      router.push(routes.products);
    }
  }, [isLoading, productCart.length, router]);

  return (
    <section className="my-12">
      <div className="container">
        <h1 className="mb-5 flex items-center gap-2 text-lg font-extrabold uppercase lg:text-[34px]/[48px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
            className="w-6 shrink-0 lg:w-8"
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
        <div className="grid grid-cols-1 gap-12 gap-y-6 lg:grid-cols-[55%,auto]">
          <div>
            <div className="rounded border border-[#d8d8d8] p-5 lg:px-10 lg:py-7">
              <h2 className="border-b border-app-text/40 pb-4 text-base font-extrabold text-app-black">
                Stap 1 van 1
                <span className="mt-0.5 block font-normal text-app-text">
                  Afleveradres
                </span>
              </h2>

              <div className="mt-7 space-y-6">
                <Select varient="secondary" className="font-medium">
                  <option value="Nederland">Nederland</option>
                </Select>

                <div className="flex w-fit items-center gap-5 border-b-[3px] border-app-black px-4 py-2.5 max-lg:pr-7 lg:px-16 lg:py-3.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 lg:w-[30px]"
                    viewBox="0 0 30 21"
                    fill="none"
                  >
                    <path
                      d="M3.88477 4.94308V1.83814C3.90518 1.36915 4.29157 0.999557 4.761 1H18.3237C18.8092 1 19.2042 1.39077 19.2094 1.87624V15.9723C19.2094 16.4615 18.8129 16.858 18.3237 16.858H12.3709"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.11352 16.8581H4.761C4.27553 16.8529 3.88477 16.4579 3.88477 15.9724V14.4294"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M26.8209 16.858H28.3067C28.7921 16.8527 29.1829 16.4577 29.1829 15.9722V8.067C29.1764 7.7002 29.0135 7.35365 28.7353 7.11457L25.5446 4.25726C25.3949 4.12408 25.2021 4.04965 25.0017 4.04773H20.0872C19.6017 4.05295 19.2109 4.44799 19.2109 4.93349V15.9817C19.2109 16.4672 19.6017 16.8623 20.0872 16.8675H21.5063"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24.1825 7.37181H22.3729C22.2131 7.36076 22.0737 7.47907 22.0586 7.63849V10.9053C22.0784 11.0609 22.2165 11.1739 22.3729 11.1625H25.3826C25.5426 11.1793 25.6865 11.065 25.7064 10.9053V8.56235C25.7012 8.44669 25.6411 8.34048 25.5445 8.27662L24.373 7.43848C24.3179 7.39711 24.2514 7.37382 24.1825 7.37181Z"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M24.2579 19.7343C25.6834 19.7343 26.8389 18.5787 26.8389 17.1532C26.8389 15.7277 25.6834 14.5721 24.2579 14.5721C22.8324 14.5721 21.6768 15.7277 21.6768 17.1532C21.6768 18.5787 22.8324 19.7343 24.2579 19.7343Z"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9.68559 19.7343C11.1111 19.7343 12.2667 18.5787 12.2667 17.1532C12.2667 15.7277 11.1111 14.5721 9.68559 14.5721C8.26009 14.5721 7.10449 15.7277 7.10449 17.1532C7.10449 18.5787 8.26009 19.7343 9.68559 19.7343Z"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9.80136 7.1051H2.96289"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8.67734 9.67664H1.83887"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7.83847 12.2577H1"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div>
                    <p className="font-bold uppercase max-lg:text-sm">
                      BEZORGEN
                    </p>
                    <p className="mt-0 font-medium max-lg:text-xs">
                      {cartOverview.shippingAmount <= 0
                        ? "GRATIS"
                        : `${currency_symbol}${cartOverview.shippingAmount}`}
                    </p>
                  </div>
                </div>
                <EnterAddressForm />
              </div>
            </div>
          </div>
          <div>
            <div className="rounded border border-[#d8d8d8] p-5 lg:px-10 lg:py-7">
              <h2 className="text-lg font-extrabold uppercase lg:text-2xl">
                Besteloverzicht
              </h2>
              {productCart.map((d) => (
                <ProductCartItem key={d.id} d={d} checkOutLayout />
              ))}

              <div className="mt-5">
                <CartOverViewCard checkOutLayout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;

const invalidZipCodeFormatMessage = "Ongeldig postcodeformaat (bijv. 5038EA)";
const zipCodeRequiredMessage = "Voer een postcode in";
// const validationSchema = userFormSchema.pick({
//   name: true,
//   surname: true,
//   zipCode: true,
//   nr: true,
//   addition: true,
//   city: true,
//   mobile: true,
//   address: true,
// });
const shippingAddressValidationSchema = z.object({
  name: z.string().min(1, "Voer je voornaam in"),
  surname: z.string().min(1, "Voer je achternaam in"),
  zipCode: z
    .string()
    .min(1, zipCodeRequiredMessage)
    .regex(/^\d{4}[A-Z]{2}$/, invalidZipCodeFormatMessage),
  nr: z.string().min(1, "Vul je huisnummer in"),
  city: z.string().min(1, "Voer uw stad in"),
  mobile: z.string().min(1, "Voer uw mobiele nummer in"),
  address: z.string().min(1, "Straatnaam ongeldig"),
  addition: z.string().optional(),
});

export type ShippingAddressValidationSchema = z.infer<
  typeof shippingAddressValidationSchema
>;

const EnterAddressForm = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading } = useQuery(getUserQueryOptions());
  const { user, guestUserId } = useUserSession();
  const [saveAddressForLater, setSaveAddressForLater] = useState(false);
  const { coupon, removeCoupon } = useAppliedCoupon();

  const createProductPaymentSessionLinkMutationOptions = useMutation({
    ...getCreateProductPaymentSessionLinkMutationOptions(),
    onError(error) {
      const errorMsg = getApiErrorMessage(error);
      toast.error(errorMsg);
    },
    onSuccess(data) {
      removeCoupon();
      router.push(data?.data?.data?.session?.url);
    },
  });

  const [userDefaultAddress, setUserDefaultAddress] = useState({
    ...data?.data,
    zipCode: data?.data.productDeliveryZipCode,
  });

  useEffect(() => {
    setUserDefaultAddress({
      ...data?.data,
      zipCode: data?.data.productDeliveryZipCode,
    });
  }, [data?.data]);

  const validateAddress = useMemo(() => {
    return shippingAddressValidationSchema.safeParse(userDefaultAddress);
  }, [userDefaultAddress]);

  useEffect(() => {
    if (isLoading) return;
    if (validateAddress.success === false) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [validateAddress.success, isLoading]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (!user && !z.string().email().safeParse(guestUserId).success) {
        router.push({
          pathname: routes.logIn,
          query: {
            [guestLoginQueryKey]: true,
          },
        });
      }
    }, 500);

    return clearTimeout(timeOutId);
  }, [guestUserId, router, user]);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    getValues,
  } = useForm<ShippingAddressValidationSchema>({
    resolver: zodResolver(shippingAddressValidationSchema),
    values: validateAddress.success
      ? validateAddress.data
      : {
          name: userDefaultAddress.name || "",
          surname: userDefaultAddress.surname || "",
          zipCode: userDefaultAddress.zipCode || "",
          nr: userDefaultAddress.nr || "",
          addition: userDefaultAddress.addition || "",
          city: userDefaultAddress.city || "",
          mobile: userDefaultAddress.mobile || "",
          address: userDefaultAddress.address || "",
        },
  });

  const values = watch();

  const [debouncedZipCode] = useDebouncedValue(values.zipCode, 1000);
  const [debouncedNr] = useDebouncedValue(values.nr, 1000);

  const validateZipCode = useMemo(
    () =>
      shippingAddressValidationSchema
        .pick({
          zipCode: true,
        })
        .safeParse({
          zipCode: values.zipCode,
        }),
    [values.zipCode],
  );

  const addressByZipcodeQuery = useQuery({
    ...getAddressByZipcodeQueryOptions({
      zipCode: debouncedZipCode,
      houseNumber: debouncedNr,
      skipDbCheck: true,
      isValid: validateZipCode.success,
    }),
    retry: false,
  });

  useEffect(() => {
    if (addressByZipcodeQuery.isError) {
      setError("zipCode", {
        message: getApiErrorMessage(addressByZipcodeQuery.error) as string,
      });
      setValue("city", "");
      setValue("address", "");
    } else {
      clearErrors("zipCode");
      clearErrors("city");
      clearErrors("address");
    }
    const city = addressByZipcodeQuery.data?.data.city;
    const street = addressByZipcodeQuery.data?.data.street;
    if (city && street) {
      setValue("city", city);
      setValue("address", street);
    }
  }, [
    addressByZipcodeQuery.data?.data.city,
    addressByZipcodeQuery.data?.data.street,
    addressByZipcodeQuery.error,
    addressByZipcodeQuery.isError,
    clearErrors,
    setError,
    setValue,
  ]);

  const createPaymentLinkHandler = useCallback(
    ({
      shippingAddress,
    }: {
      shippingAddress?: ShippingAddressValidationSchema;
    } = {}) => {
      createProductPaymentSessionLinkMutationOptions.mutate({
        saveAddressForLater: !user ? true : saveAddressForLater,
        couponCode: coupon?.code,
        shippingAddress: shippingAddress || getValues(),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [coupon?.code, getValues, saveAddressForLater, user],
  );

  const onSubmit: SubmitHandler<ShippingAddressValidationSchema> = useCallback(
    async (values) => {
      if (user) {
        setShowForm(false);
        setUserDefaultAddress(values);
      } else {
        createPaymentLinkHandler({
          shippingAddress: values,
        });
      }
    },
    [createPaymentLinkHandler, user],
  );

  const error = Array.isArray(errors.zipCode?.message)
    ? errors.zipCode?.message[0]
    : "Error";
  useEffect(() => {
    const validateZipCode = shippingAddressValidationSchema
      .pick({
        zipCode: true,
      })
      .safeParse({
        zipCode: values.zipCode,
      });
    if (!!values.zipCode && !validateZipCode.success) {
      setError("zipCode", {
        message: validateZipCode.error.flatten().fieldErrors.zipCode as never,
      });
    } else {
      if (
        error === zipCodeRequiredMessage ||
        error === invalidZipCodeFormatMessage
      ) {
        clearErrors("zipCode");
      }
    }
  }, [values.zipCode, error, setError, clearErrors]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-5">
        <Spinner className="size-5" />
      </div>
    );
  return (
    <div>
      {validateAddress.success && !showForm && (
        <div>
          <div className="flex items-center justify-between">
            <p className="font-bold">Adres</p>
            <button
              className="font-bold text-app-primary hover:underline"
              onClick={() => setShowForm(true)}
            >
              Bewerken
            </button>
          </div>
          <div className="mt-2 space-y-0.5 bg-app-text/10 px-4 py-3.5 font-medium text-app-text">
            <p className="!mb-1 text-lg font-bold text-app-black">
              {watch("name")} {watch("surname")}
            </p>
            <p>Adres: {watch("address") || "- - -"}</p>
            <p>Postcode: {watch("zipCode") || "- - -"}</p>
            <p>Stad: {watch("city") || "- - -"}</p>
            <p>Huisnummer: {watch("nr") || "- - -"}</p>
            <p>Mobiel: {watch("mobile")}</p>
            <p>Toevoeging: {watch("addition") || "- - -"}</p>
          </div>

          <Button
            type="submit"
            className="mt-5 w-full uppercase"
            disabled={createProductPaymentSessionLinkMutationOptions.isPending}
            loading={createProductPaymentSessionLinkMutationOptions.isPending}
            onClick={() => createPaymentLinkHandler()}
          >
            GA VERDER NAAR Betaling
          </Button>
        </div>
      )}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="flex items-center justify-between">
            
            <UpdateProfile name="profile" control={control} />
          </div> */}
          <div className="grid grid-cols-1 gap-5 gap-y-4 md:grid-cols-2">
            <Input
              className="border-none bg-[#F1F1F1]"
              label="Voornaam:"
              bordered
              {...register("name")}
              error={errors.name?.message?.toString()}
            />
            <Input
              className="border-none bg-[#F1F1F1]"
              label="Achternaam:"
              bordered
              {...register("surname")}
              error={errors.surname?.message?.toString()}
            />
            <Input
              className="border-none bg-[#F1F1F1]"
              label={
                <span className="flex items-center gap-2">
                  Postcode:{" "}
                  {addressByZipcodeQuery.isLoading && (
                    <Spinner className="size-3" />
                  )}
                </span>
              }
              bordered
              {...register("zipCode")}
              error={errors.zipCode?.message?.toString()}
            />
            <Input
              className="border-none bg-[#F1F1F1]"
              label="Huisnummer:"
              bordered
              {...register("nr")}
              error={errors.nr?.message?.toString()}
            />
            <Input
              className="border-none bg-[#F1F1F1]"
              label="Toevoeging"
              bordered
              {...register("addition")}
            />

            {/* <FormSelect
              {...register("gender")}
              label="Geslacht:"
              error={errors.gender?.message?.toString()}
            >
              <option value="male">Mannelijk</option>
              <option value="female">Vrouwelijk</option>
              <option value="others">Anderen</option>
            </FormSelect> */}
            <Input
              className="border-none bg-[#F1F1F1]"
              label="Straatnaam:"
              bordered
              disabled
              {...register("address")}
              error={errors.address?.message?.toString()}
            />
            <Input
              className="border-none bg-[#F1F1F1]"
              label="Stad:"
              bordered
              disabled
              {...register("city")}
              error={errors.city?.message?.toString()}
            />
            <Input
              className="border-none bg-[#F1F1F1]"
              label="Telefoonnummer:"
              bordered
              {...register("mobile")}
              error={errors.mobile?.message?.toString()}
            />
          </div>

          {user && (
            <label className="mt-3 inline-flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={saveAddressForLater}
                onCheckedChange={(value) => setSaveAddressForLater(!!value)}
              />{" "}
              Bewaren voor later
            </label>
          )}

          <div className="!mt-6 lg:!mt-8">
            {user ? (
              <Button type="submit" className="w-full uppercase">
                Wijzigingen opslaan
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full uppercase"
                disabled={
                  createProductPaymentSessionLinkMutationOptions.isPending
                }
                loading={
                  createProductPaymentSessionLinkMutationOptions.isPending
                }
              >
                GA VERDER NAAR Betaling
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

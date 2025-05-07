import publicApiClient from "@/api-clients/public-api-client";
import { userApiClient } from "@/api-clients/user-api-client";
import RegionNotAvailableDialog from "@/common/components/RegionNotAvailableDialog";
import Button from "@/common/components/ui/button";
import FormSelect from "@/common/components/ui/form-select";
import Input from "@/common/components/ui/input";
import routes from "@/config/routes";
import { tempAuthTokenCookieName } from "@/constants";
import { activityLevels, goals } from "@/constants/form-select-data";
import useTotalCalorie from "@/hooks/useTotalCalorie";
import { getClientErrorMsg } from "@/lib/utils";
import {
  Payment_Method,
  User,
  UserGenderEnum,
  UserStatusEnum,
} from "@/types/api-responses/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedValue } from "@mantine/hooks";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const invalidZipCodeFormatMessage = "Ongeldig postcodeformaat (bijv. 5038EA)";
const zipCodeRequiredMessage = "Voer een postcode in";

const userFormSchema = z.object({
  name: z.string().min(1, "Minimaal 1 teken"),
  profile: z.string().optional().nullable(),
  surname: z.string().min(1, "Minimaal 1 teken"),
  age: z.number({ message: "Verwacht aantal, nul ontvangen" }).positive(),
  gender: z.nativeEnum(UserGenderEnum, {
    message: "Verwacht 'mannetje' | 'vrouwelijk' | 'anderen', nul ontvangen",
  }),
  weight: z.number({ message: "Verwacht aantal, nul ontvangen" }).positive(),
  height: z.number({ message: "Verwacht aantal, nul ontvangen" }).positive(),
  address: z
    .string({ message: "Verwachte tekenreeks, nul ontvangen" })
    .optional(),
  city: z.string({ message: "Verwachte tekenreeks, nul ontvangen" }).optional(),
  mobile: z
    .string({ message: "Verwachte tekenreeks, nul ontvangen" })
    .optional(),
  email: z.string().optional(),
  nr: z.string({ message: "Verwachte tekenreeks, nul ontvangen" }).optional(),
  addition: z.string().optional(),
  zipCode: z
    .string()
    .min(1, zipCodeRequiredMessage)
    .regex(/^\d{4}[A-Za-z]{2}$/, invalidZipCodeFormatMessage),
  activityLevel: z.enum(["1.2", "1.375", "1.55", "1.75", "1.9"], {
    message:
      "Verwacht '1,2' | '1.375' | '1,55' | '1,75' | '1.9', nul ontvangen",
  }),
  goal: z.enum(["-500", "0", "500"], {
    message: "Verwacht '-500' | '0' | '500', nul ontvangen",
  }),
  status: z.nativeEnum(UserStatusEnum).optional(),
});

type Props = {
  user: User;
  payment_method?: Payment_Method;
};

const Step1 = ({ user }: Props) => {
  // eslint-disable-next-line no-unused-vars
  const { id, createdAt, updatedAt, zipCode, email, customer, ...userData } =
    user;

  const {
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    setValue,
    watch,
    handleSubmit,
  } = useForm<User>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      ...userData,
      zipCode: zipCode?.zipCode as unknown as any,
      profile: userData.profile || "",
    },
  });

  const [isOpenRegionNotAvailableDialog, setIsOpenRegionNotAvailableDialog] =
    useState(false);
  const [disabledAddress, setDisabledAddress] = useState(true);

  const router = useRouter();

  const onSubmit: SubmitHandler<User> = async (d) => {
    if (isSubmitting) return;
    try {
      const token = getCookie(tempAuthTokenCookieName);
      await userApiClient.put(
        "/user",
        { ...d },
        { headers: { authorization: token } },
      );
      toast.success("Gebruiker bijgewerkt");
      await router.push(routes.onboarding("menu"));
    } catch (err) {
      toast.error(getClientErrorMsg(err));
    }
  };
  const values = watch();

  const [debouncedZipCode] = useDebouncedValue(
    values?.zipCode as unknown as string,
    500,
  );
  const [debouncedHouseNumber] = useDebouncedValue(values.nr, 500);

  useEffect(() => {
    async function checkZipCode(str: string, houseNumber: string) {
      try {
        clearErrors("zipCode");
        setDisabledAddress(true);
        const { data: ddd } = await publicApiClient.get(
          "/zipcode/" + str + "/" + houseNumber,
        );

        const data = ddd.data;

        setValue("city", data.city);
        setValue("address", data.street);
      } catch (error) {
        setValue("city", "");
        setValue("address", "");

        setIsOpenRegionNotAvailableDialog(true);
        const msg = getClientErrorMsg(error);
        if (msg == "Resource not found") {
          setDisabledAddress(false);
        }

        setError("zipCode", {
          message: getClientErrorMsg(error),
        });
      }
    }

    if (debouncedZipCode && debouncedHouseNumber) {
      if (
        userFormSchema
          .pick({ zipCode: true })
          .safeParse({ zipCode: debouncedZipCode }).success
      ) {
        checkZipCode(debouncedZipCode, debouncedHouseNumber);
      } else {
        setError("zipCode", {
          message: invalidZipCodeFormatMessage,
        });
      }
    }
  }, [debouncedZipCode, debouncedHouseNumber, setValue, setError, clearErrors]);

  const totalRequiredCalorie = useTotalCalorie(values);

  return (
    <div>
      <h3 className="__h3 font-bold max-lg:text-lg">Uw gegevens: </h3>
      <p className="mt-1.5 text-base font-medium text-black lg:mt-2.5 lg:font-bold lg:text-app-text">
        Zodra u bent aangemeld, heeft u de mogelijkheid om uw gezin toe te
        voegen
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 grid grid-cols-1 gap-x-5 gap-y-6 xl:grid-cols-[auto,280px]"
      >
        <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-6">
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
            label="Telefoonnummer:"
            bordered
            {...register("mobile")}
            error={errors.mobile?.message?.toString()}
          />
          <Input
            label="Leeftijd:"
            bordered
            type="number"
            {...register("age", { valueAsNumber: true })}
            error={errors.age?.message?.toString()}
          />
          <Input
            label="Gewicht (kg):"
            bordered
            type="number"
            {...register("weight", { valueAsNumber: true })}
            error={errors.weight?.message?.toString()}
          />

          <Input
            label="Lengte: (cm)"
            bordered
            type="number"
            {...register("height", { valueAsNumber: true })}
            error={errors.height?.message?.toString()}
          />
          <FormSelect
            {...register("gender")}
            label="Geslacht:"
            error={errors.gender?.message?.toString()}
          >
            <option value="male">Mannelijk</option>
            <option value="female">Vrouwelijk</option>
          </FormSelect>

          <FormSelect
            {...register("activityLevel")}
            label="Activiteitenniveau:"
            error={errors.activityLevel?.message?.toString()}
          >
            {activityLevels.map((level, i) => (
              <option value={level.value} key={i}>
                {level.label}
              </option>
            ))}
          </FormSelect>
          <FormSelect
            {...register("goal")}
            label="Doel:"
            error={errors.goal?.message?.toString()}
          >
            {goals.map((level, i) => (
              <option value={level.value} key={i}>
                {level.label}
              </option>
            ))}
          </FormSelect>
          <Input
            label="Postcode:"
            bordered
            {...register("zipCode")}
            onChange={(e) => {
              const value = e.target.value;
              const removeSpace = value.replace(/\s+/g, "");
              e.target.value = removeSpace;
              register("zipCode").onChange(e);
            }}
            error={errors.zipCode?.message?.toString()}
          />
          <Input
            label="Huisnummer:"
            bordered
            {...register("nr")}
            error={errors.nr?.message?.toString()}
          />
          <Input label="Toevoeging" bordered {...register("addition")} />
          <Input
            label="Straatnaam:"
            bordered
            {...register("address")}
            disabled={disabledAddress}
            error={errors.address?.message?.toString()}
          />

          <Input
            label="Stad:"
            bordered
            {...register("city")}
            disabled={disabledAddress}
            error={errors.city?.message?.toString()}
          />
        </div>

        <div className="lg:flex lg:items-end">
          <div>
            <div className="rounded-xl border border-black px-6 py-5 lg:rounded-3xl">
              <p className="text-base font-bold">
                Je dagelijkse caloriebehoefte
              </p>

              <div className="mt-2">
                <p className="text-2xl font-bold text-app-darker-green">
                  {totalRequiredCalorie ? (
                    <span className="underline">{totalRequiredCalorie}</span>
                  ) : (
                    "_____"
                  )}{" "}
                  kcal
                </p>
              </div>
            </div>
            <div className="mt-5">
              <Button loading={isSubmitting} type="submit" className="w-full">
                Stel het menu samen
              </Button>
            </div>
          </div>
        </div>
      </form>

      <RegionNotAvailableDialog
        open={isOpenRegionNotAvailableDialog}
        onOpenChange={setIsOpenRegionNotAvailableDialog}
      />
    </div>
  );
};

export default Step1;

import { userApiClient } from "@/api-clients/user-api-client";
import Button from "@/common/components/ui/button";
import Input from "@/common/components/ui/input";
import useClientRefetch from "@/hooks/useClientRefetch";
import { useUserSession } from "@/hooks/useUserSession";
import { userFormSchema } from "@/lib/schemas";
import { getClientErrorMsg } from "@/lib/utils";
import { ApiResponseSuccessBase } from "@/types/api-responses";
import { FileUploadApiResponse } from "@/types/api-responses/file-upload";
import { User } from "@/types/api-responses/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  data?: User;
  onClose: () => any;
};

const validationSchema = userFormSchema.pick({
  name: true,
  surname: true,
  zipCode: true,
  nr: true,
  addition: true,
  city: true,
  mobile: true,
  address: true,
});

type ValidationSchema = z.infer<typeof validationSchema>;

const ProfileUpdate = ({ data, onClose }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
    control,
    getValues,
    watch,
    handleSubmit,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      ...data,
      zipCode: data?.zipCode?.zipCode as unknown as any,
    },
  });
  console.log(errors);
  const clientRefetch = useClientRefetch();

  const { update } = useUserSession();

  const onSubmit: SubmitHandler<ValidationSchema> = async (d) => {
    if (isSubmitting) return;
    try {
      // d = await filesUploader(d);

      const res = await userApiClient.put("/user/profile", {
        name: d.name,
        surname: d.surname,
        city: d.city,
        zipCode: d.zipCode,
        mobile: d.mobile,
        nr: d.nr,
        addition: d.addition,
        address: d.address,

        // age: d.age,
        // gender: d.gender,
        // weight: d.weight,
        // height: d.height,
        // address: d.address,
        // activityLevel: d.activityLevel,
        // goal: d.goal,
      });

      await clientRefetch(["get-user"]);

      update({
        name: d.name,
        // email: d.email,
        // profile: d.profile,
      });

      toast.success(res.data?.message || "User info updated");
      onClose();
    } catch (error) {
      toast.error(getClientErrorMsg(error));
    }
  };
  return (
    <>
      <div className="flex items-center justify-between"></div>
      <div className=" w-full ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid grid-cols-auto gap-x-5"
        >
          {/* <div className="flex items-center justify-between">
            
            <UpdateProfile name="profile" control={control} />
          </div> */}
          <div className="grid grid-cols-4 gap-x-5 gap-y-6 mt-4">
            <Input
              label="Voornaam:"
              bordered
              {...register("name")}
              error={errors.name?.message?.toString()}
              className="w-full"
            />
            <Input
              label="Achternaam:"
              bordered
              {...register("surname")}
              error={errors.surname?.message?.toString()}
            />
            {/* <Input
              label="Leeftijd:"
              bordered
              type="number"
              {...register("age", { valueAsNumber: true })}
              error={errors.age?.message?.toString()}
            /> */}
            {/* <Input
              label="Straatnaam:"
              bordered
              {...register("address")}
              error={errors.address?.message?.toString()}
            /> */}
            <Input
              label="Postcode:"
              bordered
              {...register("zipCode")}
              error={errors.zipCode?.message?.toString()}
            />
            <Input
              label="Huisnummer:"
              bordered
              {...register("nr")}
              error={errors.nr?.message?.toString()}
            />
            <Input label="Toevoeging" bordered {...register("addition")} />

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
              label="Straatnaam:"
              bordered
              {...register("address")}
              error={errors.address?.message?.toString()}
            />
            <Input
              label="Stad:"
              bordered
              {...register("city")}
              error={errors.city?.message?.toString()}
            />

            {/* <Input
              label="Gewicht (kg):"
              bordered
              type="number"
              {...register("weight", { valueAsNumber: true })}
              error={errors.weight?.message?.toString()}
            /> */}
            <Input
              label="Telefoonnummer:"
              bordered
              {...register("mobile")}
              error={errors.mobile?.message?.toString()}
            />

            {/* <Input
              label="Lengte:"
              bordered
              type="number"
              {...register("height", { valueAsNumber: true })}
              error={errors.height?.message?.toString()}
            /> */}

            {/* <FormSelect
              {...register("goal")}
              label="Doel:"
              error={errors.goal?.message?.toString()}
            >
              {goals.map((level, i) => (
                <option value={level.value} key={i}>
                  {level.label}
                </option>
              ))}
            </FormSelect> */}
            {/* <FormSelect
              {...register("activityLevel")}
              label="Activiteitenniveau:"
              error={errors.activityLevel?.message?.toString()}
            >
              {activityLevels.map((level, i) => (
                <option value={level.value} key={i}>
                  {level.label}
                </option>
              ))}
            </FormSelect> */}
          </div>

          <div className="flex justify-end mt-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Gebruiker bijwerken
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

async function filesUploader(obj: any) {
  let object: any = obj || {};
  for (let [key, value] of Object.entries(object)) {
    if (typeof value === "object") {
      object[key] = await filesUploader(value);
    }

    if (value instanceof File) {
      const fileObj: File = value;
      const form = new FormData();
      form.append("file", fileObj);
      const { data } = await userApiClient.post<
        ApiResponseSuccessBase<FileUploadApiResponse>
      >("/upload", form);
      object[key] = data.data.location;
    }
  }
  return object;
}

export default ProfileUpdate;

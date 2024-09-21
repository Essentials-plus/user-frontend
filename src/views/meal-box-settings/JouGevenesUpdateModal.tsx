import { userApiClient } from "@/api-clients/user-api-client";
import NumberOfMealDays from "@/common/components/NumberOfMealDays";
import NumberOfMealsPerDay from "@/common/components/NumberOfMealsPerDay";
import Button from "@/common/components/ui/button";
import FormSelect from "@/common/components/ui/form-select";
import Input from "@/common/components/ui/input";
import { activityLevels, goals } from "@/constants/form-select-data";
import useClientRefetch from "@/hooks/useClientRefetch";
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

const validationSchema = userFormSchema
  .pick({
    age: true,
    gender: true,
    weight: true,
    height: true,
    goal: true,
    activityLevel: true,
  })
  .extend({
    numberOfDays: z.number().min(1).max(7),
    mealsPerDay: z.number().min(4).max(6),
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const JouGevenesUpdateModal = ({ data, onClose }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    watch,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      age: data?.age,
      gender: data?.gender,
      weight: data?.weight,
      height: data?.height,
      goal: data?.goal as any,
      activityLevel: data?.activityLevel as any,
      numberOfDays: data?.plan?.numberOfDays || 1,
      mealsPerDay: data?.plan?.mealsPerDay || 4,
    },
  });

  const clientRefetch = useClientRefetch();

  const onSubmit: SubmitHandler<ValidationSchema> = async (d) => {
    if (isSubmitting) return;
    try {
      // d = await filesUploader(d);

      const res = await userApiClient.put("/user/profile", d);

      await clientRefetch(["get-user"]);

      // update({
      //   name: d.name,
      //   email: d.email,
      //   profile: d.profile,
      // });
      toast.success(res.data?.message || "Meal plan info updated");
      onClose();
    } catch (error) {
      toast.error(getClientErrorMsg(error));
    }
  };
  return (
    <>
      <div className=" w-full ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid grid-cols-auto gap-x-5"
        >
          <div className="grid grid-cols-4 gap-x-5 gap-y-6 mt-4">
            <Input
              label="Leeftijd:"
              bordered
              type="number"
              {...register("age", { valueAsNumber: true })}
              error={errors.age?.message?.toString()}
            />

            <FormSelect
              {...register("gender")}
              label="Geslacht:"
              error={errors.gender?.message?.toString()}
            >
              <option value="male">Mannelijk</option>
              <option value="female">Vrouwelijk</option>
              <option value="others">Anderen</option>
            </FormSelect>

            <Input
              label="Gewicht (kg):"
              bordered
              type="number"
              {...register("weight", { valueAsNumber: true })}
              error={errors.weight?.message?.toString()}
            />

            <Input
              label="Lengte:"
              bordered
              type="number"
              {...register("height", { valueAsNumber: true })}
              error={errors.height?.message?.toString()}
            />

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
          </div>

          <div className="h-px bg-app-grey w-full my-6"></div>
          <div className="space-y-5">
            <NumberOfMealDays
              value={watch("numberOfDays")}
              onValueChange={(value) => {
                setValue("numberOfDays", value);
              }}
            />
            <NumberOfMealsPerDay
              value={watch("mealsPerDay")}
              onValueChange={(value) => {
                setValue("mealsPerDay", value);
              }}
            />
          </div>

          <div className="flex justify-end mt-8">
            <Button disabled={isSubmitting} loading={isSubmitting}>
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

export default JouGevenesUpdateModal;

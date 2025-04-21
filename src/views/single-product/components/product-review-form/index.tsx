import { getCreateProductReviewMutationOptions } from "@/api-clients/user-api-client/mutations";
import Button from "@/common/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactRatingComponent from "react-rating";
import { z } from "zod";

const ReactRating = ReactRatingComponent as unknown as any;
// const ReactRating = ReactRatingComponent;

const reviewFormSchema = z.object({
  comment: z
    .string({ message: "Please enter your review" })
    .min(1, { message: "Please enter your review" })
    .max(500),
  rating: z
    .number({ message: "Please select your rating" })
    .gt(0, { message: "Please select your rating" })
    .lte(5, { message: "Please select your rating" }),
});

export type ReviewFormSchema = z.infer<typeof reviewFormSchema>;

const ProductReviewForm = ({
  productId,
  onSuccess,
}: {
  productId: string;
  onSuccess?: () => void;
}) => {
  const [temporaryRatingValue, setTemporaryRatingValue] = useState<
    null | number
  >(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ReviewFormSchema>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const ratingValue = watch("rating");

  const setRatingValue = (value: number) => {
    setValue("rating", value);
  };

  const createProductReviewMutation = useMutation({
    ...getCreateProductReviewMutationOptions(),
    onSuccess: onSuccess,
  });

  const onSubmit: SubmitHandler<ReviewFormSchema> = async (values) => {
    createProductReviewMutation.mutate({
      body: values,
      productId,
    });
  };

  return (
    <div className="mt-5 rounded-md border border-app-text/20 bg-white p-4 lg:mt-8 lg:p-6 lg:pt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-5 text-lg font-bold lg:mb-6 lg:text-xl">
          Schrijf je review hier
        </h2>
        <div>
          <label
            className="mb-1.5 inline-block font-semibold max-lg:text-sm"
            htmlFor="review"
          >
            Bekijk beschrijving
          </label>
          <textarea
            autoFocus
            id="review"
            rows={6}
            placeholder="Laat ons weten wat je van dit product vindt"
            className="block w-full resize-none border-b-[3px] border-transparent bg-app-black/5 p-4 outline-none focus:border-app-black max-lg:text-sm"
            {...register("comment")}
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-app-danger">
              {errors.comment.message}
            </p>
          )}
        </div>

        <div className="mt-5 flex items-center gap-5">
          <p className="inline-block font-semibold">Jouw rating</p>

          <div className="translate-y-1">
            <ReactRating
              // fullSymbol="fa fa-star-o fa-2x"
              emptySymbol={<Star className="size-5 lg:size-8" stroke="#888" />}
              fullSymbol={
                <Star
                  className="size-5 lg:size-8"
                  fill="black"
                  stroke="black"
                />
              }
              fractions={1}
              initialRating={ratingValue}
              onClick={(v: any) => {
                setRatingValue(v);
                clearErrors("rating");
              }}
              onHover={setTemporaryRatingValue}
            />
          </div>

          {!!(temporaryRatingValue || ratingValue) && (
            <p className="font-medium">
              {(temporaryRatingValue || ratingValue).toFixed(2)}
            </p>
          )}
        </div>
        {errors.rating && (
          <p className="mt-1 text-sm text-app-danger">
            {errors.rating.message}
          </p>
        )}

        <div className="mt-9 flex justify-center">
          <Button
            type="submit"
            intent={"outline-primary"}
            className="font-semibold uppercase"
            loading={createProductReviewMutation.isPending}
          >
            STUUR REVIEW IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductReviewForm;

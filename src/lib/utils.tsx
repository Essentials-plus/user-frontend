import { mealTypeOptions } from "@/constants/meal";
import { FilterFormSchema } from "@/lib/schemas";
import { ProductTaxPercentType } from "@/types/api-responses/tax";
import clsx, { ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));
export const cx = clsx;

export const getApiErrorMessage = (
  error: any,
  fallbackErrorMessage?: string,
) => {
  const defaultErrorMessage =
    fallbackErrorMessage || "Something went wrong. Please try again.";

  if (error instanceof ZodError) {
    try {
      const errors = normalizeZodError(error);
      return (
        <>
          <ul className="space-y-2 pl-3">
            <li className="text-base font-medium text-red-500">
              Validation Error:
            </li>
            {errors.map((error) => (
              <li className="list-item list-disc" key={error.field}>
                <span className="font-medium">
                  {error.field} {"->"}
                </span>{" "}
                <span className="opacity-80">{error.message}</span>
              </li>
            ))}
          </ul>
        </>
      );
    } catch (error) {
      return defaultErrorMessage;
    }
  }

  let errorMessage = defaultErrorMessage;

  try {
    errorMessage = error.response?.data.message;
  } catch (error) {}

  return errorMessage;
};

export const getClientErrorMsg = (err: any) => {
  return err.response ? err.response.data.message : err.message;
};

export const normalizeZodError = (errors: ZodError) => {
  return errors.errors.map((error) => ({
    field: error.path.join("."),
    message: `${error.message}`,
  }));
};

export function getWeekNumber(date?: Date) {
  const currentDate = date || new Date();
  const januaryFirst = new Date(currentDate.getFullYear(), 0, 1);
  const daysToNextMonday =
    januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7;
  const nextMonday = new Date(
    currentDate.getFullYear(),
    0,
    januaryFirst.getDate() + daysToNextMonday,
  );
  return currentDate < nextMonday
    ? 52
    : currentDate > nextMonday
    ? Math.ceil(
        (currentDate.getTime() - nextMonday.getTime()) / (24 * 3600 * 1000) / 7,
      )
    : 1;
}

export const rootWeekNumber = getWeekNumber();

export function getDateFromDayAndWeek(day: number, week?: number) {
  if (day < 1 || day > 7) {
    throw new Error("Day must be between 1 (Monday) and 7 (Sunday)");
  }

  // Determine the current week number if the week parameter is not provided
  const currentWeek = week ?? moment().isoWeek();

  // Start from the first day of the year
  const startOfYear = moment().startOf("year");

  // Calculate the date of the first day of the specified or current week
  const startOfWeek = startOfYear.add(currentWeek - 1, "weeks");

  // Calculate the final date by adding the day offset (day - 1)
  const resultDate = startOfWeek.add(day - 1, "days");

  return resultDate.toDate();
}

export const getLockdownDate = (dayOfWeek: number) => {
  // Ensure the input is between 1 and 7
  if (dayOfWeek < 1 || dayOfWeek > 7) {
    throw new Error("dayOfWeek must be between 1 and 7");
  }

  // Get the current week's starting date (Sunday)
  const startOfWeek = moment().startOf("week");

  // Add the days to the start of the week to get the required date
  const date = startOfWeek.add(dayOfWeek === 0 ? 7 : dayOfWeek, "days");

  return date.toDate();
};

// export const getLockdownDate = (dayOfWeek: number, week: number = 0): Date => {
//   // Ensure the input is between 1 and 7
//   if (dayOfWeek < 1 || dayOfWeek > 7) {
//     throw new Error("dayOfWeek must be between 1 and 7");
//   }

//   // Get the start of the current week (Sunday)
//   const startOfWeek = moment().startOf("week");

//   // Add the number of weeks and days to get the required date
//   const date = startOfWeek.add(week - 1, "weeks").add(dayOfWeek - 1, "days");

//   return date.toDate();
// };

export function getWeekDate(weekNumber?: number) {
  weekNumber = weekNumber || getWeekNumber();
  const year = new Date().getFullYear();
  const januaryFirst = new Date(year, 0, 1);
  const daysToNextMonday =
    januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7;
  const nextMonday = new Date(
    year,
    0,
    januaryFirst.getDate() + daysToNextMonday,
  );
  const startDate = new Date(
    nextMonday.getTime() + (weekNumber - 1) * 7 * 24 * 3600 * 1000,
  );
  const endDate = new Date(startDate.getTime() + 6 * 24 * 3600 * 1000);
  return { start: startDate, end: endDate };
}

export const getProductPrice = (product: any, variationId: string | null) => {
  if (variationId) {
    const variation = product.variations.find(
      (variation: any) => variation.id === variationId,
    );
    return typeof variation?.salePrice === "number"
      ? variation?.salePrice
      : variation?.regularPrice;
  } else {
    return typeof product.salePrice === "number"
      ? product.salePrice
      : product.regularPrice;
  }
};

export const getShippingAmount = (amount: number) => {
  const minimumOrderValueForFreeShipping = Number(
    process.env.NEXT_PUBLIC_MINIMUM_ORDER_VALUE_FOR_FREE_SHIPPING,
  );
  const shippingCharge = Number(process.env.NEXT_PUBLIC_SHIPPING_CHARGE);

  if (
    typeof amount === "number" &&
    amount > 0 &&
    amount < minimumOrderValueForFreeShipping
  ) {
    return shippingCharge;
  }
  return 0;
};

export function sortMealsByMealType<T>(meals: T[]): T[] {
  const order = mealTypeOptions.map((option) => option.value);

  return meals.sort((a: any, b: any) => {
    return order.indexOf(a.meal) - order.indexOf(b.meal);
  });
}

export const getProductTaxAmount = ({
  productPrice,
  taxPercent,
}: {
  productPrice: number;
  taxPercent: ProductTaxPercentType;
}) => {
  const taxAmount = Number(taxPercent.split("TAX")[1]);

  if (typeof taxAmount !== "number") return 0;

  if (typeof productPrice !== "number") return 0;

  return (productPrice / 100) * taxAmount;
};

export const calculateUserCalorie = (user: FilterFormSchema) => {
  const { weight, height, age, gender, activityLevel, goal } = user;
  if (weight && height && age && gender && activityLevel && goal) {
    const s = gender === "male" ? 5 : -161;
    const bmr = 10 * weight + 6.25 * height - 5 * age + s;
    const factor = bmr * Number(activityLevel);
    return factor + Number(goal);
  } else {
    return null;
  }
};

import { mealTypeOptions } from "@/constants/meal";
import type { FilterFormSchema } from "@/lib/schemas";
import type { ProductTaxPercentType } from "@/types/api-responses/tax";
import clsx, { type ClassValue } from "clsx";
import {
  addDays,
  endOfISOWeek,
  format,
  getISODay,
  getISOWeek,
  startOfISOWeek,
  startOfISOWeekYear,
} from "date-fns";
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
    const data = error.response?.data;
    errorMessage = typeof data === "string" ? data : data?.message;
  } catch (error) {}

  return errorMessage || defaultErrorMessage;
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

export function getWeekNumber() {
  return getISOWeek(new Date());
}

export const rootWeekNumber = getWeekNumber();

export function getNextLockdownDate(lockDownDay: number) {
  const today = new Date(); // Current date
  const todayDay = getISODay(today); // ISO: Monday = 1, Sunday = 7
  console.log({ todayDay, lockDownDay });

  // Calculate days until the next lockdown day
  const daysUntilLockdown =
    lockDownDay > todayDay
      ? lockDownDay - todayDay
      : 7 - (todayDay - lockDownDay);

  const nextLockdownDate = addDays(today, daysUntilLockdown);

  return nextLockdownDate; // ISO Netherlands format
}
export const getDateFromIsoWeekAndDay = (
  week: number,
  day: number,
  year: number = new Date().getFullYear(),
) => {
  if (week < 1 || week > 53)
    throw new Error("Invalid week number. It should be between 1 and 53.");
  if (day < 1 || day > 7)
    throw new Error(
      "Invalid day number. It should be between 1 (Monday) and 7 (Sunday).",
    );

  const firstDayOfYear = startOfISOWeekYear(new Date(year, 0, 4)); // ✅ safer
  const date = addDays(firstDayOfYear, (week - 1) * 7 + (day - 1));

  return date;
};

export const getNextDeliveryDate = (date: Date) => {
  return addDays(date, 2);
};

export function getWeekDate(weekNumber?: number) {
  const currentDate = new Date();
  const currentWeekNumber = getISOWeek(currentDate);
  weekNumber = weekNumber || currentWeekNumber;

  const year = currentDate.getFullYear();

  const startDate = startOfISOWeek(new Date(year, 0, 1));
  const start = addDays(startDate, (weekNumber - 1) * 7);

  const endDate = endOfISOWeek(new Date(year, 0, 1));
  const end = addDays(endDate, (weekNumber - 1) * 7);

  return {
    start: start,
    end: end,
  };
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

export function calculateDiscount(
  regularPrice: number | undefined | null,
  salePrice: number | undefined | null,
): number {
  if (!regularPrice || !salePrice) return 0;
  if (regularPrice <= 0) {
    throw new Error("Regular price must be greater than 0.");
  }
  return ((regularPrice - salePrice) / regularPrice) * 100;
}

export const appDefaultDateFormatter = (date: Date) => {
  return format(date, "EEEE, dd-MM-yyyy 'at' hh:mm a");
};

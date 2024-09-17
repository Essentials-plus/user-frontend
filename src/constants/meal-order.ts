/* eslint-disable no-unused-vars */
export enum UserStatusEnum {
  active = "active",
  blocked = "blocked",
}

export enum UserGenderEnum {
  male = "male",
  female = "female",
  others = "others",
}

export type User = {
  zipCode?: {
    zipCode: string;
    id: string;
    lockdownDay: number;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  status: UserStatusEnum;
  profile: string | null;
  surname: string | null;
  age: number | null;
  gender: UserGenderEnum | null;
  weight: number | null;
  height: number | null;
  activityLevel: string | null;
  goal: string | null;
  address: string | null;
  nr: string | null;
  city: string | null;
  mobile: string | null;
  customer: string | null;
  verified: boolean;
};

export enum PlanOrderStatusEnum {
  confirmed = "confirmed",
  delivered = "delivered",
}

export type MealOrder = {
  plan: {
    user: User;
  } | null;
  mealsForTheWeek: {
    day: number;
    meals: {
      id: string;
      ingredients: {
        id: string;
        totalNeed: number;
        name?: string;
        quantity?: number;
        unit?: "gr" | "ml" | "por" | "pc";
        kcal?: number;
        proteins?: number;
        carbohydrates?: number;
        fats?: number;
        fiber?: number;
      }[];
      kCalNeed: number;
      totalNeedOfKCal: number;
      totalNeedOfProteins: number;
      totalNeedOfCarbohydrates: number;
      totalNeedOfFats: number;
      totalNeedOfFiber: number;
      meal?:
        | "breakfast"
        | "dinner"
        | "lunch"
        | "snacks1"
        | "snacks2"
        | "snacks3";
      mealNumber?: string;
      mealName?: string;
      preparationMethod?:
        | {
            label: string;
          }[]
        | undefined;
      cookingTime?: string;
      tips?:
        | {
            label: string;
          }[]
        | undefined;
      image?: string;
    }[];
    id?: string;
  }[];
  id: string;
  week: number;
  createdAt: Date;
  updatedAt: Date;
  planId: string | null;
  status: PlanOrderStatusEnum;
};

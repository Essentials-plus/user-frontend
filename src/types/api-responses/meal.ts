/* eslint-disable no-unused-vars */
export enum MealTypeEnum {
  breakfast = "breakfast",
  dinner = "dinner",
  lunch = "lunch",
  snacks1 = "snacks1",
  snacks2 = "snacks2",
  snacks3 = "snacks3",
}

export type MealType = keyof typeof MealTypeEnum;

export const mealTypeArray = [
  "breakfast",
  "dinner",
  "lunch",
  "snacks1",
  "snacks2",
  "snacks3",
] as const;

export type Meal = {
  preparationMethod: PreparationMethod[];
  tips: Tip[];
  ingredients: Ingredient[];
  id: string;
  meal: MealTypeEnum;
  mealNumber: string;
  mealName: string;
  cookingTime: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  shortDescription: string | null;
  label: string | null;
  subLabel: string | null;
};

export interface ExtendMeal {
  id: string;
  meal: string;
  mealNumber: string;
  mealName: string;
  cookingTime: string;
  image: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  ingredients: Ingredient[];
  preparationMethod: PreparationMethod[];
  tips: Tip[];
  kCalNeed: number;
  totalNeedOfKCal: number;
  totalNeedOfProteins: number;
  totalNeedOfCarbohydrates: number;
  totalNeedOfFats: number;
  totalNeedOfFiber: number;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  kcal: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
  fiber: number;
  createdAt: string;
  updatedAt: string;
  totalNeed: number;
}

export interface PreparationMethod {
  id: string;
  label: string;
  mealId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tip {
  id: string;
  label: string;
  mealId: string;
  createdAt: string;
  updatedAt: string;
}

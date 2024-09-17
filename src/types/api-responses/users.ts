/* eslint-disable no-unused-vars */
export enum UserGenderEnum {
  male = "male",
  female = "female",
  others = "others",
}
export enum UserStatusEnum {
  active = "active",
  blocked = "blocked",
}

export type UserGender = keyof typeof UserGenderEnum;

export type UserStatus = keyof typeof UserStatusEnum;

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
  profile: string | undefined;
  surname: string | undefined;
  age: number | undefined;
  gender: UserGenderEnum | undefined;
  weight: number | undefined;
  height: number | undefined;
  activityLevel: string | undefined;
  goal: string | undefined;
  address: string | undefined;
  nr: string | undefined;
  addition: string | undefined;
  city: string | undefined;
  mobile: string | undefined;
  customer: string | undefined;
  verified: boolean;
  plan: Plan;
  access: string;
};

export type Plan = {
  confirmOrderWeek: number;
  createdAt: string;
  id: string;
  mealsPerDay: number;
  numberOfDays: number;
  status: string;

  updatedAt: string;
  userId: string;
};

export type Payment_Method = {
  id: string;
  type: string;
};

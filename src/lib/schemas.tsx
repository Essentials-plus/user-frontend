import { UserGenderEnum, UserStatusEnum } from "@/types/api-responses/users";
import { z } from "zod";

// user login schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const userFormSchema = z.object({
  name: z.string().min(1, "Minimaal 1 teken"),
  profile: z.any().optional().nullable(),
  surname: z.string().min(1, "Minimaal 1 teken"),
  age: z.number().positive(),
  gender: z.nativeEnum(UserGenderEnum),
  weight: z.number().positive(),
  height: z.number().positive(),
  address: z.string().optional(),
  city: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),
  nr: z.string().optional(),
  addition: z.string().optional(),
  zipCode: z.string(),
  activityLevel: z.enum(["1.2", "1.375", "1.55", "1.75", "1.9"]),
  goal: z.enum(["-500", "0", "500"]),
  status: z.nativeEnum(UserStatusEnum).optional(),
});
export type UserFormSchema = z.infer<typeof userFormSchema>;

// Filter schema
export const filterFormSchema = z.object({
  age: z.number().positive(),
  gender: z.nativeEnum(UserGenderEnum),
  weight: z.number().positive(),
  height: z.number().positive(),
  activityLevel: z.enum(["1.2", "1.375", "1.55", "1.75", "1.9"]),
  goal: z.enum(["-500", "0", "500"]),
});

export type FilterFormSchema = z.infer<typeof filterFormSchema>;

import { z } from "zod";

export const strongPasswordSchema = z
  .string()
  .min(8, "Wachtwoord moet minstens 8 tekens lang zijn")
  .regex(/[A-Z]/, "Wachtwoord moet minstens één hoofdletter bevatten")
  .regex(/[a-z]/, "Wachtwoord moet minstens één kleine letter bevatten")
  .regex(/[0-9]/, "Wachtwoord moet minstens één cijfer bevatten")
  .regex(
    /[^A-Za-z0-9]/,
    "Wachtwoord moet minstens één speciaal teken bevatten",
  );

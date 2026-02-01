import { z } from "zod";

export const currencySchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  symbol: z.string().optional(),
  useRate: z
    .number()
    .positive("Rate must be greater than 0"),
  decimals: z
    .number()
    .int("Decimals must be an integer")
    .min(0, "Decimals cannot be negative"),
  isActive: z.boolean(),
});

export const currencyIdSchema = z.object({
  id: z.string().uuid(),
});

export type CurrencySchema = z.infer<typeof currencySchema>;
export type CurrencyIdSchema = z.infer<typeof currencyIdSchema>;
export const updateCurrencySchema = currencySchema.partial();
export type UpdateCurrencyIdSchema = z.infer<typeof updateCurrencySchema>;
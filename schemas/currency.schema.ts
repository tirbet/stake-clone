import { z } from "zod";

export const currencySchema = z.object({
    name: z.string(),
    symbol: z.string().nullable().optional(),
    code: z.string(),
    useRate: z.coerce.number(),
    decimals: z.number(),
    isActive: z.boolean().default(false),
});

export const currencyIdSchema = z.object({
    id: z.uuid(),
});

// If you need TS types from them:
export type CurrencySchema = z.infer<typeof currencySchema>;
export type CurrencyIdSchema = z.infer<typeof currencyIdSchema>;
export const updateCurrencySchema = currencySchema.partial();

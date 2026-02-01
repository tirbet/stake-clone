import { z } from "zod";

export const kycConfigSchema = z.object({
    isActive: z.boolean(),
});

export const kycConfigIdSchema = z.object({
    id: z.uuid()
});

export type KycConfigSchema = z.infer<typeof kycConfigSchema>;
export type KycConfigIdSchema = z.infer<typeof kycConfigIdSchema>;